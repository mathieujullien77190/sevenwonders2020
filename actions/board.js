import { updateObject } from '../both/mongoHelpers'
import { Boards } from '../both/collections'
import { calcAgeCards, splitChoiceCards, switchCardsChoice } from './card'
import { MIN_PLAYERS, MAX_PLAYERS, ROUND_TO_DISCARD_CARDS } from './constants'
import { getPointsPlayer, getLastCardPlay, getLastStepPlay, canAddCard, canBuildStep, getIndexPlayer, getPlayer, getStepCanBuild, rightPlayer, leftPlayer, getMoneyEffect } from './player'
import { Player } from '../model/Player'

export const nextAge = (board) => {
    if (board.players.length >= MIN_PLAYERS) {
        board.age = board.age < 4 ? board.age + 1 : 0

        if (canPlay(board)) {

            board.round = 1

            board.ageCards = calcAgeCards(board.age, board.players.length, board.allCards)

            const split = splitChoiceCards(board.players.length, board.ageCards)

            setChoiceCards(board, split)
            setBuyInfoOnCards(board)
            setBuyInfoOnSteps(board)
        } else {
            resetChoiceCards(board)
        }
    }

}

export const nextRound = (board) => {
    if (canPlay(board)) {

        board.round = board.round + 1

        const split = switchCardsChoice(board.players.map(player => player.choiceCards), board.age === 2 ? 'right' : 'left')

        setChoiceCards(board, split)
        setBuyInfoOnCards(board)
        setBuyInfoOnSteps(board)
    }
}

const canPlay = (board) => {
    return board.age >= 1 && board.age <= 3
}

const setBuyInfoOnCards = (board) => {
    board.players = board.players.map(player => {
        return {
            ...player, choiceCards: player.choiceCards.map(card => {
                return { ...card, buyInfo: canAddCard(board, player.id, card) }
            })
        }
    })
    updateObject(board, Boards)
}

const setBuyInfoOnSteps = (board) => {
    board.players = board.players.map(player => {
        return {
            ...player,
            wonder: {
                ...player.wonder, steps: player.wonder.steps.map(step => {
                    return { ...step, buyInfo: canBuildStep(board, player.id, step) }
                })
            }
        }
    })
    updateObject(board, Boards)
}

const setChoiceCards = (board, splitCards) => {
    board.players = board.players.map((player, index) => {
        return { ...player, choiceCards: splitCards[index] }
    })
    updateObject(board, Boards)
}

const resetChoiceCards = (board) => {
    board.players = board.players.map((player, index) => {
        return { ...player, choiceCards: [] }
    })
    updateObject(board, Boards)
}

export const addPlayer = (board, player) => {
    if (board.age === 0 && !getPlayer(board, player.id) && board.players.length <= MAX_PLAYERS) {
        board.players = [...board.players, new Player(player)]
        updateObject(board, Boards)
    }
}

export const selectCard = (board, uniqIdCard, idPlayer, nameAction) => {
    console.time('selectCardPlayer')
    const player = getPlayer(board, idPlayer)
    const index = getIndexPlayer(idPlayer, board.players)
    if (player) {
        let selectCards = player.choiceCards.filter(card => card.uniqId === uniqIdCard)

        if (selectCards.length === 1) {

            player.choiceCards = player.choiceCards.filter(card => card.uniqId !== uniqIdCard)
            player.selectionCard = selectCards[0]
            player.selectionCard.action = nameAction
            player.selectionCard.last = true

            board.players[index] = player
            updateObject(board, Boards)
        }
    }
    console.timeEnd('selectCardPlayer')
}

export const cancelCard = (board, idPlayer) => {
    const player = getPlayer(board, idPlayer)
    const index = getIndexPlayer(idPlayer, board.players)

    if (player) {
        let selectCards = { ...player.selectionCard }

        if (selectCards) {

            player.selectionCard = null
            player.choiceCards = [...player.choiceCards, selectCards]

            board.players[index] = player
            updateObject(board, Boards)
        }
    }
}


export const canValidateSelectCards = (board) => {
    return board.players.filter(player => player.selectionCard).length === board.players.length
}

export const validateSelectCards = (board) => {
    console.time('validateCardPlayers')
    const discardCards = board.players.filter(player => player.selectionCard.action === 'discard').map(player => player.selectionCard)

    board.players = board.players.map(player => {
        const selectCard = { ...player.selectionCard }

        if (selectCard.action === 'play') {
            return {
                ...player,
                selectionCard: null,
                boardCards: [...player.boardCards.map(card => ({ ...card, last: false })), selectCard],
                wonder: {
                    ...player.wonder, steps: player.wonder.steps.map(step => ({ ...step, card: step.card ? { ...step.card, last: false } : null }))
                }
            }
        } else if (selectCard.action === 'wonder') {
            const nextStep = getStepCanBuild(player)
            return {
                ...player,
                selectionCard: null,
                boardCards: player.boardCards.map(card => ({ ...card, last: false })),
                wonder: {
                    ...player.wonder, steps: player.wonder.steps.map(step => {
                        return nextStep.id === step.id ? { ...step, card: selectCard } : { ...step, card: step.card ? { ...step.card, last: false } : null }
                    })
                }
            }
        } else if (selectCard.action === 'discard') {
            return {
                ...player,
                selectionCard: null,
                boardCards: player.boardCards.map(card => ({ ...card, last: false })),
                coins: player.coins + 3,
                wonder: {
                    ...player.wonder, steps: player.wonder.steps.map(step => ({ ...step, card: step.card ? { ...step.card, last: false } : null }))
                }
            }
        }
    })

    board.players = calculForPlayers(board)

    board.discardCards = [...board.discardCards, ...discardCards]

    updateObject(board, Boards)
    console.timeEnd('validateCardPlayers')

}

export const calculForPlayers = (board) => {
    return board.players.map(player => {
        const right = rightPlayer(player.id, board.players)
        const left = leftPlayer(player.id, board.players)
        const lastCardPlay = getLastCardPlay(player)
        const lastStepPlay = getLastStepPlay(player)
        let coins = 0

        if (lastCardPlay) {
            coins = lastCardPlay.effects.reduce((acc, curr) => {
                return acc + getMoneyEffect(player, right, left, curr)
            }, 0)
        } else if (lastStepPlay) {
            coins = lastStepPlay.effects.reduce((acc, curr) => {
                return acc + getMoneyEffect(player, right, left, curr)
            }, 0)
        }

        return { ...player, coins: player.coins + coins, points: getPointsPlayer(player, board) }

    })
}

export const canDiscardCards = (board) => {
    return board.round === ROUND_TO_DISCARD_CARDS
}


export const discardCards = (board) => {
    const discardCards = board.players.map(player => {
        return player.choiceCards
    }).flat(1)

    board.players = board.players.map(player => ({ ...player, choiceCards: [] }))

    board.discardCards = [...board.discardCards, ...discardCards]

    updateObject(board, Boards)
}


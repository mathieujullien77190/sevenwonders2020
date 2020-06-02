import { Boards } from '../collections'
import { calcAgeCards, splitChoiceCards, switchCardsChoice } from './card'
import { MIN_PLAYERS, MAX_PLAYERS, ROUND_TO_DISCARD_CARDS } from '../constants'
import { updatePlayers, getPointsPlayer, getLastCardPlay, getLastStepPlay, canAddCard, canBuildStep, getPlayer, getStepCanBuild, rightPlayer, leftPlayer, getMoneyEffect } from './player'


export const updateBoard = (board) => {
    Boards.update({ _id: board._id }, board);
}

export const nextAge = (board, players) => {
    let _players = players

    if (_players.length >= MIN_PLAYERS) {
        board.age = board.age < 4 ? board.age + 1 : 0

        if (canPlay(board)) {

            board.round = 1
            board.ageCards = calcAgeCards(board.age, _players.length, board.allCards)

            const split = splitChoiceCards(_players.length, board.ageCards)

            _players = setChoiceCards(_players, split)
            _players = setBuyInfoOnCards(_players)
            _players = setBuyInfoOnSteps(_players)
        } else {
            _players = resetChoiceCards(_players)
        }

        updateBoard(board)
        updatePlayers(_players)
    }



}

export const nextRound = (board, players) => {
    if (canPlay(board)) {

        board.round = board.round + 1

        const split = switchCardsChoice(players.map(player => player.choiceCards), board.age === 2 ? 'right' : 'left')

        setChoiceCards(players, split)
        setBuyInfoOnCards(players)
        setBuyInfoOnSteps(players)
    }
}

const canPlay = (board) => {
    return board.age >= 1 && board.age <= 3
}

const setBuyInfoOnCards = (players) => {
    return players.map(player => {
        return {
            ...player, choiceCards: player.choiceCards.map(card => {
                return { ...card, buyInfo: canAddCard(players, player.id, card) }
            })
        }
    })
}

const setBuyInfoOnSteps = (players) => {
    return players.map(player => {
        return {
            ...player,
            wonder: {
                ...player.wonder, steps: player.wonder.steps.map(step => {
                    return { ...step, buyInfo: canBuildStep(players, player.id, step) }
                })
            }
        }
    })
}

const setChoiceCards = (players, splitCards) => {

    return players.map((player, index) => {
        return { ...player, choiceCards: splitCards[index] }
    })
}

const resetChoiceCards = (players) => {
    return players.map((player) => {
        return { ...player, choiceCards: [] }
    })
}


export const selectCard = (uniqIdCard, idPlayer, nameAction) => {
    const player = getPlayer(idPlayer)
    if (player) {
        let selectCards = player.choiceCards.filter(card => card.uniqId === uniqIdCard)

        if (selectCards.length === 1) {

            player.choiceCards = player.choiceCards.filter(card => card.uniqId !== uniqIdCard)
            player.selectionCard = selectCards[0]
            player.selectionCard.action = nameAction
            player.selectionCard.last = true

            updatePlayers([player])
        }
    }
}

export const cancelCard = (idPlayer) => {
    const player = getPlayer(idPlayer)

    if (player) {
        let selectCards = { ...player.selectionCard }

        if (selectCards) {

            player.selectionCard = null
            player.choiceCards = [...player.choiceCards, selectCards]

            updatePlayers([player])
        }
    }
}


export const canValidateSelectCards = (players) => {
    return players.filter(player => player.selectionCard).length === players.length
}

export const validateSelectCards = (board, players) => {

    const discardCards = players.filter(player => player.selectionCard.action === 'discard').map(player => player.selectionCard)

    let _players = players.map(player => {
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

    _players = calculForPlayers(players)

    board.discardCards = [...board.discardCards, ...discardCards]

    updatePlayers(_players)
    updateBoard(board)

}

export const calculForPlayers = (players) => {
    return players.map(player => {
        const right = rightPlayer(player.id, players)
        const left = leftPlayer(player.id, players)
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

        return { ...player, coins: player.coins + coins, points: getPointsPlayer(player, players) }

    })
}

export const canDiscardCards = (board) => {
    return board.round === ROUND_TO_DISCARD_CARDS
}

export const discardCards = (board, players) => {
    const discardCards = players.map(player => {
        return player.choiceCards
    }).flat(1)

    let _players = players.map(player => ({ ...player, choiceCards: [] }))

    board.discardCards = [...board.discardCards, ...discardCards]

    updateBoard(board)
    updatePlayers(players)

}


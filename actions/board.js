import { updateObject } from '../both/mongoHelpers'
import { Boards } from '../both/collections'
import { calcAgeCards, splitChoiceCards, switchCardsChoice } from './card'
import { MIN_PLAYERS, MAX_PLAYERS, ROUND_TO_DISCARD_CARDS } from './constants'
import { canAddCard, canBuildStep, getIndexPlayer, getPlayer, getStepCanBuild } from './player'
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
    const player = getPlayer(board, idPlayer)
    const index = getIndexPlayer(idPlayer, board.players)
    if (player) {
        let selectCards = player.choiceCards.filter(card => card.uniqId === uniqIdCard)

        if (selectCards.length === 1) {

            player.choiceCards = player.choiceCards.filter(card => card.uniqId !== uniqIdCard)
            player.selectionCard = selectCards[0]
            player.selectionCard.action = nameAction

            board.players[index] = player
            updateObject(board, Boards)
        }
    }
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

    const discardCards = board.players.filter(player => player.selectionCard.action === 'discard').map(player => player.selectionCard)

    board.players = board.players.map(player => {
        const selectCard = player.selectionCard

        if (selectCard.action === 'play') {
            return { ...player, selectionCard: null, boardCards: [...player.boardCards, player.selectionCard] }
        } else if (selectCard.action === 'wonder') {
            const nextStep = getStepCanBuild(player)

            return {
                ...player,
                selectionCard: null,
                wonderCards: [...player.wonderCards, player.selectionCard],
                wonder: {
                    ...player.wonder, steps: player.wonder.steps.map(step => {
                        return nextStep.id === step.id ? { ...step, hasCardAge: player.selectionCard.age } : step
                    })
                }
            }
        } else if (selectCard.action === 'discard') {
            return { ...player, selectionCard: null }
        }
    })

    board.discardCards = [...board.discardCards, ...discardCards]

    updateObject(board, Boards)

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
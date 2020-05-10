import { updateObject } from '../both/mongoHelpers'
import { Boards } from '../both/collections'
import { calcAgeCards, splitChoiceCards, switchCardsChoice } from './card'
import { MIN_PLAYERS, MAX_PLAYERS } from './constants'
import { canAddCard, canBuildStep, getIndexPlayer, getPlayer } from './player'

export const nextAge = (board) => {
    board.age = board.age < 4 ? board.age + 1 : 0

    board.ageCards = calcAgeCards(board.age, board.players.length, board.allCards)

    if (canPlay(board)) {
        const split = splitChoiceCards(board.players.length, board.ageCards)

        setChoiceCards(board, split)
        setBuyInfoOnCards(board)
        setBuyInfoOnSteps(board)
    } else {
        resetChoiceCards(board)
    }

}

export const nextRound = (board) => {
    if (canPlay(board)) {
        const split = switchCardsChoice(board.players.map(player => player.choiceCards), board.age === 2 ? 'right' : 'left')

        setChoiceCards(board, split)
        setBuyInfoOnCards(board)
        setBuyInfoOnSteps(board)
    }
}

const canPlay = (board) => {
    return board.age >= 1 && board.age <= 3 && board.players.length >= MIN_PLAYERS
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

export const playCardOnBoard = (board, uniqIdCard, idPlayer) => {
    const player = getPlayer(board, idPlayer)
    const index = getIndexPlayer(idPlayer, board.players)
    if (player) {
        let selectCards = player.choiceCards.filter(card => card.uniqId === uniqIdCard)

        if (selectCards.length === 1) {
            selectCards[0].last = true

            player.choiceCards = player.choiceCards.filter(card => card.uniqId !== uniqIdCard)
            player.boardCards = [...player.boardCards, selectCards[0]]

            board.players[index] = player
            updateObject(board, Boards)
        }
    }
}

export const cancelCardOnBoard = (board, uniqIdCard, idPlayer) => {
    const player = getPlayer(board, idPlayer)
    const index = getIndexPlayer(idPlayer, board.players)

    if (player) {
        let selectCards = player.boardCards.filter(card => card.uniqId === uniqIdCard && card.last === true)

        if (selectCards.length === 1) {

            selectCards[0].last = false
            player.boardCards = player.boardCards.filter(card => card.uniqId !== uniqIdCard)
            player.choiceCards = [...player.choiceCards, selectCards[0]]

            board.players[index] = player
            updateObject(board, Boards)
        }
    }
}


import { Boards } from '../both/collections';
import { Meteor } from 'meteor/meteor'
import { TIME_TO_PLAY } from '../actions/constants'
import { validateSelectCards, canValidateSelectCards, nextRound, canDiscardCards, discardCards } from '../actions/board'

//let timerValidateCards = null

export const initObserver = (idBoard) => {
    Boards.find({ id: idBoard }).observe({
        changed: function (board) {
            //Meteor.clearTimeout(timerValidateCards)
            //timerValidateCards = Meteor.setTimeout(() => {
            //let newBoard = Boards.findOne({ id: idBoard })
            if (canValidateSelectCards(board)) {
                validateSelectCards(board)

                if (canDiscardCards(board)) {
                    discardCards(board)
                } else {
                    nextRound(board)
                }
            }
            //}, TIME_TO_PLAY)
        }
    })
}



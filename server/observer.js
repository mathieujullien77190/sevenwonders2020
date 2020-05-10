import { Boards } from '../both/collections';
import { Meteor } from 'meteor/meteor'
import { validateSelectCards, canValidateSelectCards, nextRound, canDiscardCards, discardCards, nextAge } from '../actions/board'



export const initObserver = (idBoard) => {
    Boards.find({ id: idBoard }).observe({
        changed: function (board) {
            if (canValidateSelectCards(board)) {
                validateSelectCards(board)
                if (canDiscardCards(board)) {
                    discardCards(board)
                    nextAge(board)
                } else {
                    nextRound(board)
                }
            }
        }
    })
}



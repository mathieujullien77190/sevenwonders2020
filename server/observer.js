import { Boards } from '../both/collections';
import { Meteor } from 'meteor/meteor'
import { validateSelectCards, canValidateSelectCards, nextRound, canDiscardCards, discardCards, nextAge } from '../actions/board'
import { removePlayers } from './actions/removePlayers'


export const initObserver = () => {
    /*Boards.find({ id: idBoard }).observe({
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
    })*/

    Meteor.setInterval(() => {
        removePlayers()
    }, 5000);

}



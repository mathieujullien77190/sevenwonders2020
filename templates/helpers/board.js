import { getWonder } from '../../data/wonders'
import { nextAge, nextRound, addPlayer } from '../../actions/board'

Template.board_template.events({
    'click .logout'() {
        Meteor.logout()
    },
    'click .nextAge'() {
        nextAge(this.board)
    },
    'click .switchCard'() {
        nextRound(this.board)
    },
    'click .addPlayer'() {
        const allPlayers = [
            { id: 1, pseudo: 'Matou', wonder: getWonder(15) },
            { id: 2, pseudo: 'Gregou', wonder: getWonder(2) },
            { id: 3, pseudo: 'flouflou', wonder: getWonder(4) },
            { id: 4, pseudo: 'Manou', wonder: getWonder(6) },
            { id: 5, pseudo: 'Morgou', wonder: getWonder(8) },
            { id: 6, pseudo: 'Mandou', wonder: getWonder(10) },
            { id: 7, pseudo: 'Lorou', wonder: getWonder(12) },
        ]

        const nbs = this.board.players.length
        if (nbs < 7) {
            addPlayer(this.board, allPlayers[nbs])
        }
    }
});

import { getWonder } from '../../data/wonders'

Template.board_template.events({
    'click .logout'() {
        Meteor.logout()
    },
    'click .nextAge'() {
        window.boardObj.nextAge()
    },
    'click .switchCard'() {
        window.boardObj.nextRound()
    },
    'click .addPlayer'() {
        const allPlayers = [
            { id: 1, pseudo: 'Matou', wonder: getWonder(1) },
            { id: 2, pseudo: 'Gregou', wonder: getWonder(2) },
            { id: 3, pseudo: 'flouflou', wonder: getWonder(4) },
            { id: 4, pseudo: 'Manou', wonder: getWonder(6) },
            { id: 5, pseudo: 'Morgou', wonder: getWonder(8) },
            { id: 6, pseudo: 'Mandou', wonder: getWonder(10) },
            { id: 7, pseudo: 'Lorou', wonder: getWonder(12) },
        ]

        const nbs = window.boardObj.players.length
        if (nbs < 7) {
            window.boardObj.addPlayer(allPlayers[nbs])
        }
    },

});

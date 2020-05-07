

const allPlayers = [
    { id: 1, pseudo: 'Matou' },
    { id: 2, pseudo: 'Gregou' },
    { id: 3, pseudo: 'flouflou' },
    { id: 4, pseudo: 'Manou' },
    { id: 5, pseudo: 'Morgou' },
    { id: 6, pseudo: 'Mandou' },
    { id: 7, pseudo: 'Lorou' },
]


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
        const nbPlayer = window.boardObj.players.length
        window.boardObj.addPlayer(allPlayers[nbPlayer % allPlayers.length])
    },
    'click .delPlayer'() {
        const indexLastPlayer = window.boardObj.players.length - 1
        if (indexLastPlayer >= 0) {
            window.boardObj.delPlayer(indexLastPlayer)
        }
    }
});

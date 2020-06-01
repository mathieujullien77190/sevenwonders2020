Template.accueil_template.onCreated(function () {
    this.subscribe('board.current')
    this.subscribe('players.list')
    this.autorun(() => {
        this.subscribe('player.me', Session.get('player') ? Session.get('player').id : '')
    })
})

Template.accueil_template.helpers({
    data() {
        return { board: Boards.find().fetch()[0], players: Players.find().fetch() }
    },
    playerSup3(players) {
        return players && players.length >= 3
    }
})
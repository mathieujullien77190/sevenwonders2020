Template.accueil_template.helpers({

})

Template.accueil_template.onCreated(function () {
    this.subscribe('board.current')
    this.subscribe('players.list')
});

Template.accueil_template.helpers({
    data() {
        return { board: Boards.find().fetch()[0], players: Players.find().fetch() }
    },
    playerSup3(players) {
        return players && players.length >= 3
    },
});
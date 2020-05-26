import 'bootstrap'
import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

import { Boards } from '../both/collections'
import { login, saveUserActivity } from '../templates/helpers/helpers'

import '../templates/html/'
import '../templates/helpers/'
import './main.html'

if (Meteor.isDevelopment) {
    window.Boards = Boards
}

Meteor.startup(() => {
    saveUserActivity()

    player = localStorage.getItem('playerSeven')
    if (player) {
        login(JSON.parse(player))
    }
});

Template.accueil_template.onCreated(function () {
    this.subscribe('board.current')
});

Template.accueil_template.helpers({
    board() {
        return Boards.find().fetch()[0]
    }
});
import 'bootstrap'
import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

import { Boards, Players } from '../both/collections'
import { login, saveUserActivity } from '../templates/helpers/helpers'


import '../templates/html/'
import '../templates/helpers/'
import './main.html'



if (Meteor.isDevelopment) {
    window.Boards = Boards
    window.Players = Players
}

Meteor.startup(() => {
    saveUserActivity()
});

Template.accueil_template.onCreated(function () {
    this.subscribe('board.current');
});

Template.preparation_template.onCreated(function () {
    this.subscribe('players');
});


Template.accueil_template.helpers({
    board() {
        return Boards.find().fetch()[0]
    }
});

Template.preparation_template.helpers({
    players() {
        return Players.find().fetch()
    }
});
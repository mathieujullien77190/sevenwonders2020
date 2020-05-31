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

    player = localStorage.getItem('playerSeven')
    if (player) {
        login(JSON.parse(player))
    }
});


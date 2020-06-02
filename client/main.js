import 'bootstrap'
import { Meteor } from 'meteor/meteor'

import { Boards, Players } from '../both/collections'
import { login, saveUserActivity } from '../templates/helpers/helpers'
import * as debugBoard from '../both/game/board'
import * as debugPlayer from '../both/game/player'
import * as debugCard from '../both/game/card'

import '../templates/html/'
import '../templates/helpers/'
import './main.html'



if (Meteor.isDevelopment) {
    window.Boards = Boards
    window.Players = Players
    window.debugBoard = debugBoard
    window.debugPlayer = debugPlayer
    window.debugCard = debugCard
}

Meteor.startup(() => {
    saveUserActivity()

    player = localStorage.getItem('playerSeven')
    if (player) {
        login(JSON.parse(player))
    }
});


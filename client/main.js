import 'bootstrap'
import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

import { Card } from '../model/Card'
import { allCards } from '../data/cards'
import { Wonder } from '../model/Wonder'
import { getListWonders } from '../data/wonders'


import { getBoardObj, getBoardMongo, getBoardsMongo } from '../both/board'

import { getRessourcesToBuy } from '../model/helpers/actions'

import '../templates/html/accueil.html'
import '../templates/html/player.html'
import '../templates/html/card.html'

import '../templates/html/step.html'
import '../templates/html/ressource.html'
import '../templates/html/scientific.html'

import '../templates/html/link.html'
import '../templates/html/atoms.html'
import './main.html'

import '../templates/html/panelCards.html'
import '../templates/helpers/panelCards.js'

import '../templates/html/panelWonders.html'
import '../templates/helpers/panelWonders.js'

import '../templates/html/board.html'
import '../templates/helpers/board.js'

import '../templates/html/wonder.html'
import '../templates/helpers/wonder.js'

import '../templates/html/effect.html'
import '../templates/helpers/effect.js'

let READY = new ReactiveVar(false)

window.getRessourcesToBuy = getRessourcesToBuy
window.cards = allCards.map(card => new Card(card))
window.wonders = getListWonders().map(wonder => new Wonder(wonder))

const allPlayers = [
    { id: 1, pseudo: 'Matou' },
    { id: 2, pseudo: 'Gregou' },
    { id: 3, pseudo: 'flouflou' },
    { id: 4, pseudo: 'Manou' },
    { id: 5, pseudo: 'Morgou' },
    { id: 6, pseudo: 'Mandou' },
    { id: 7, pseudo: 'Lorou' },
]

Meteor.startup(() => {
    window.setTimeout(() => {
        //debug
        window.boardsMongo = getBoardsMongo()
        window.boardObj = getBoardObj()
        boardObj.init()

        READY.set(true);

    }, 1000)
});

Template.accueil_template.helpers({
    wonders() {
        return window.wonders
    },
    board() {
        return READY.get() ? getBoardMongo() : {}
    }
});

Template.board_template.events({
    'click .nextAge'() {
        window.boardObj.nextAge()
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







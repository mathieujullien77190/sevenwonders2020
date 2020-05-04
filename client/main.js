import 'bootstrap'
import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

import { Card } from '../model/Card'
import { allCards } from '../data/cards'
import { Wonder } from '../model/Wonder'
import { getListWonders } from '../data/wonders'
import { Player } from '../model/Player'


import { getBoardObj, getBoardMongo, getBoardsMongo } from '../both/board'


import '../templates/player.html'
import '../templates/card.html'
import '../templates/wonder.html'
import '../templates/board.html'
import '../templates/step.html'
import '../templates/ressource.html'
import '../templates/scientific.html'
import '../templates/effect.html'
import '../templates/link.html'
import '../templates/atoms.html'
import './main.html'

let READY = new ReactiveVar(false)


window.cards = allCards.map(card => new Card(card))
window.wonders = getListWonders().map(wonder => new Wonder(wonder))

const allPlayers = [
    new Player({ id: 1, pseudo: 'Matou' }),
    new Player({ id: 2, pseudo: 'Gregou' }),
    new Player({ id: 3, pseudo: 'flouflou' }),
    new Player({ id: 4, pseudo: 'Manou' }),
    new Player({ id: 5, pseudo: 'Morgou' }),
    new Player({ id: 6, pseudo: 'Mandou' }),
    new Player({ id: 7, pseudo: 'Lorou' }),
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

Template.body.helpers({
    cards() {
        return window.cards
    },
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
            window.boardObj.delPlayer(window.boardObj.players[indexLastPlayer])
        }
    }
});


Template.wonder_template.helpers({
    getAdvantageColor() {
        return this.wonder.hasAdvantageCoins() ? 'yellow' : this.wonder.advantageRessource.color
    }
})

Template.effect_template.helpers({
    getTemplate() {
        const name = this.effect.type.charAt(0).toUpperCase() + this.effect.type.slice(1)
        return `effect${name}_template`
    },

    getData(size) {
        return { ...this, size: size ? size : 'normal' }
    }
});

Template.effectWar_template.helpers({
    getWarSymbols() {
        return [...Array(this.effect.value).keys()].map(i => 'W')
    }
});

Template.effectCardColor_template.helpers({
    getSizePoint() {
        return this.size === 'big' ? 'normal' : 'small'
    }
})



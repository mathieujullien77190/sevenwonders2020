import 'bootstrap'
import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

import { Card } from '../model/Card'
import { allCards, getCard } from '../data/cards'
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
    'click .nextAge'(event) {
        getBoardObj().nextAge()
    }
});


Template.board_template.helpers({
    getAgeCards() {
        const boardMongo = getBoardMongo()
        if (boardMongo && boardMongo.ageCards) {
            return boardMongo.ageCards.map(uniqId => new Card(getCard(uniqId)))
        } else {
            return []
        }
    }

})

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



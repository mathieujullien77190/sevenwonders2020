import 'bootstrap'
import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

import { Card } from '../model/Card'
import { allCards } from '../data/cards'
import { Wonder } from '../model/Wonder'
import { getListWonders } from '../data/wonders'


import { getBoardObj, getBoardMongo, getBoardsMongo } from '../both/board'

import '../templates/html/'
import '../templates/helpers/'
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

Template.accueil_template.helpers({
    wonders() {
        return window.wonders
    },
    board() {
        return READY.get() ? getBoardMongo() : {}
    }
});




if (Meteor.isClient) {



    window.setEnv = () => {
        //boardObj.addPlayer({ id: 1, pseudo: 'Matou' })
        //boardObj.setBoardCards(cards.filter(item => ['5_4', '45_7', '42_3', '22_3'].includes(item.uniqId)), 1)
        boardObj.setWonder(wonders.filter(wonder => wonder.id === 3)[0], 1)
        //boardObj.setChoiceCards(cards.filter(item => ['25_3', '23_3'].includes(item.uniqId)), 1)
        //boardObj.addWonderCard(cards[0], 1, 1)
        //boardObj.addWonderCard(cards[0], 2, 1)


        // boardObj.addPlayer({ id: 2, pseudo: 'Gregou' })
        // boardObj.setBoardCards(cards.filter(item => ['6_3', '45_6'].includes(item.uniqId)), 2)
        boardObj.setWonder(wonders.filter(wonder => wonder.id === 10)[0], 2)
        // boardObj.addWonderCard(cards[0], 1, 2)

        // boardObj.addPlayer({ id: 3, pseudo: 'Flouflou' })
        // boardObj.setBoardCards(cards.filter(item => ['16_6'].includes(item.uniqId)), 3)
        boardObj.setWonder(wonders.filter(wonder => wonder.id === 7)[0], 3)
    }
}





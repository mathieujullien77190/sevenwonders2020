import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'

import { Card } from '../model/Card'
import { getListCards } from '../data/cards'
import { Wonder } from '../model/Wonder'
import { getListWonders } from '../data/wonders'
import { Player } from '../model/Player'

import '../templates/player.html'
import '../templates/card.html'
import '../templates/wonder.html'
import '../templates/step.html'
import '../templates/ressource.html'
import '../templates/scientific.html'
import '../templates/effect.html'
import '../templates/link.html'
import '../templates/atoms.html'
import './main.html'

//debug
window.cards = getListCards().map(card => new Card(card))
window.wonders = getListWonders().map(wonder => new Wonder(wonder))
window.players = [
    new Player({ pseudo: 'SuperMatou', id: 1 }),
    new Player({ pseudo: 'flopinouch', id: 2 }),
    new Player({ pseudo: 'Momo', id: 3 })
]

Template.body.helpers({
    cards() {
        return window.cards
    },
    wonders() {
        return window.wonders
    },
    players() {
        return window.players
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



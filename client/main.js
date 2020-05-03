import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'

import { Card } from '../model/Card'
import { getListCards } from '../data/cards'
import { Wonder } from '../model/Wonder'
import { getListWonders } from '../data/wonders'
import { Player } from '../model/Player'
import { Board } from '../model/Board'

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

//debug
window.cards = getListCards().map(card => new Card(card))
window.wonders = getListWonders().map(wonder => new Wonder(wonder))
window.players = [
    new Player({ pseudo: 'superMatou', id: 1 }),
    new Player({ pseudo: 'flopinouch', id: 2 }),
    new Player({ pseudo: 'momo', id: 3 }),
    new Player({ pseudo: 'manou', id: 4 }),
    new Player({ pseudo: 'gregou', id: 5 }),
    new Player({ pseudo: 'rourou', id: 6 }),
    new Player({ pseudo: 'amandou', id: 7 })
]
window.board = new Board({ id: 1, allCards: window.cards })

board.addPlayer(players[0])
board.addPlayer(players[1])
board.addPlayer(players[2])


window.superMatou = board.getPlayer('superMatou')
window.flopinouch = board.getPlayer('flopinouch')
window.momo = board.getPlayer('momo')

superMatou.setWonder(1)
flopinouch.setWonder(3)
momo.setWonder(4)

Template.board_template.events({
    'click .nextAge'(event) {
        board.nextAge()
    },
    'click .nextRound'(event) {
        board.nextRound()
    },
    'click .addPlayer'(event) {
        board.addPlayer(players[board.players.length])
    }
});

Template.body.helpers({
    cards() {
        return window.cards
    },
    wonders() {
        return window.wonders
    },
    board() {
        return window.board
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



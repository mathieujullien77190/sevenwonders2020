import { Wonder } from './Wonder'
import { getWonder } from '../data/wonders'
import { ReactiveVar } from 'meteor/reactive-var'
import { Player } from './Player'
import { shuffle } from './helpers'

export class Board {

    constructor(config) {

        this.id = config.id
        this.allCards = config.allCards
        this._age = new ReactiveVar(0)
        this._players = new ReactiveVar([])
        this._ageCards = new ReactiveVar([])
        this._round = new ReactiveVar(0)

    }

    addPlayer(player) {
        if (this.age === 0) {
            this._players.set([...this.players, player])
        } else {
            console.error("Error => Add player age = 0")
        }
    }

    getPlayer(pseudo) {
        const players = this.players.filter(player => player.pseudo === pseudo)
        return players[0] ? players[0] : null
    }

    nextAge() {
        this._age.set(this.age < 4 ? this.age + 1 : 0)
        this._ageCards.set(shuffle(this.getAgeCards(this.age)))
    }

    nextRound() {
        this._round.set(this.round < 6 ? this.round + 1 : 1)
        this.players.forEach(player => {
            player.setChoiceCards(this.getRoundCards(player))
        })
    }

    getAgeCards(age) {
        return this.allCards.filter(card => {
            return card.age.includes(age)
        })
    }

    getRoundCards(player) {
        return this.ageCards.filter((card, index) => {
            return index % player.id - 1
        })
    }


    get age() {
        return this._age.get()
    }

    get ageCards() {
        return this._ageCards.get()
    }

    get players() {
        return this._players.get()
    }

    get round() {
        return this._round.get()
    }


}


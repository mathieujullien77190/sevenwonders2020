import { Wonder } from './Wonder'
import { getWonder } from '../data/wonders'
import { ReactiveVar } from 'meteor/reactive-var'
import { Player } from './Player'
import { shuffle } from './helpers'

export class Board {

    constructor(config) {

        this.id = config.id
        this.allCards = config.allCards
        this._age = new ReactiveVar(1)
        this._players = new ReactiveVar([])
        this._ageCards = new ReactiveVar([])
        this._round = new ReactiveVar(1)

    }

    addPlayer(player) {
        this._players.set([...this.players, player])
    }

    nextAge() {
        this._age.set(this.age++)
        this._ageCards.set(shuffle(this.getAgeCards()))
    }

    nextRound() {
        this._round.set(this._round++)
        this._players.forEach(player => {
            this.players.setChoiceCards(this.getRoundCards(player))
        })
    }

    getAgeCards(age) {
        return this.allCards.filter(card => {
            return card.age.includes(age)
        })
    }

    getRoundCards(player) {
        return this._ageCards.filter((card, index) => {
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


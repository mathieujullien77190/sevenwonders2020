
import { shuffle } from './helpers'
import { Player } from './Player'

export class Board {

    constructor(config, actions) {

        this.id = config.id
        this.allCards = config.allCards

        this._age = config.age ? config.age : 0
        this._nbsPlayers = config.nbsPlayers ? config.nbsPlayers : 3
        this._ageCards = config.ageCards ? config.ageCards : []
        this._round = config.round ? config.round : 0

        this.update = actions && actions.update ? actions.update : () => { }
        this.create = actions && actions.create ? actions.create : () => { }

    }

    init() {
        this.create(this.toJson())
    }

    addPlayer() {
        if (this.age === 0) {
            this._nbPlayer++
            this.update(this.toJson())
        }
    }

    nextAge() {
        this._age = this.age < 4 ? this.age + 1 : 0
        this._ageCards = this.calcAgeCards(this.age, this.nbsPlayers)
        this.update(this.toJson())
    }

    calcAgeCards(age, nbsPlayers) {
        const baseCards = this.allCards.filter(card => {
            return age >= 1 && age <= 3 && card.age.includes(age) && card.color !== 'purple' && card.nbsPlayer <= nbsPlayers
        })

        const purpleCards = shuffle(this.allCards.filter(card => {
            return card.color === 'purple' && age === 3
        })).filter((card, index) => index < nbsPlayers + 2)

        return shuffle([...baseCards, ...purpleCards])
    }

    get age() {
        return this._age
    }

    get ageCards() {
        return this._ageCards
    }

    get nbsPlayers() {
        return this._nbsPlayers
    }

    get round() {
        return this._round
    }

    toJson() {
        return {
            age: this.age,
            id: this.id,
            ageCards: this.ageCards.map(card => card.uniqId),
            nbsPlayers: this.nbsPlayers
        }
    }


}


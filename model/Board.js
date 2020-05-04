
import { shuffle } from './helpers'

export class Board {

    constructor(config, actions) {

        this.id = config.id
        this.allCards = config.allCards
        this._age = 0
        this._players = []
        this._ageCards = []
        this._round = 0

        this.update = actions && actions.update ? actions.update : () => { }
        this.create = actions && actions.create ? actions.create : () => { }

    }

    init() {
        this.create(this.toJson())
    }

    findCard(id) {
        const cards = this.allCards.filter(card => card.id === id)
        return cards.length === 1 ? cards[0] : null
    }

    addPlayer(player) {
        if (this.age === 0) {
            this._players = [...this.players, player]
        } else {
            console.error("Error => Add player age = 0")
        }
    }

    getPlayer(pseudo) {
        const players = this.players.filter(player => player.pseudo === pseudo)
        return players[0] ? players[0] : null
    }

    nextAge() {
        this._age = this.age < 4 ? this.age + 1 : 0
        this._ageCards = this.calcAgeCards(this.age, this.players.length)
        this.update(this.toJson())
    }

    nextRound() {
        this._round = this.round < 6 ? this.round + 1 : 1
        this.players.forEach((player, index) => {
            player.setChoiceCards(this.getRoundCards(this.players.length, index))
        })
    }

    calcAgeCards(age, nbsPlayers) {
        const baseCards = this.allCards.filter(card => {
            return age >= 1 && age <= 3 && card.age.includes(age) && card.color !== 'purple' && card.nbsPlayer <= nbsPlayers
        }).map(card => card.id)

        const purpleCards = shuffle(this.allCards.filter(card => {
            return card.color === 'purple' && age === 3
        })).filter((card, index) => index < nbsPlayers + 2).map(card => card.id)

        return shuffle([...baseCards, ...purpleCards])
    }

    getRoundCards(nbsPlayers, indexPlayer) {
        return this.ageCards.filter((card, index) => {
            return index % nbsPlayers === indexPlayer
        })
    }


    get age() {
        return this._age
    }

    get ageCards() {
        return this._ageCards
    }

    get players() {
        return this._players
    }

    get round() {
        return this._round
    }

    toJson() {
        return {
            age: this.age,
            id: this.id,
            ageCards: this.ageCards
        }
    }


}


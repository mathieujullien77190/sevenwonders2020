
import { shuffle } from './helpers'

export class Board {

    constructor(config, actions) {

        this.allCards = config.allCards;
        this.id = config.id

        this.data = {
            age: config.age ? config.age : 0,
            players: config.players ? config.players : [],
            ageCards: config.ageCards ? config.ageCards : [],
            round: config.round ? config.round : 0,
        };

        this.update = actions && actions.update ? actions.update : () => { }
        this.create = actions && actions.create ? actions.create : () => { }

    }

    init() {
        this.create(this.toJson())
    }

    addPlayer(player) {
        if (this.age === 0 && !this.getPlayer(player.id) && this.players.length <= 7) {
            this.players = [...this.players, player]
            this.update(this.toJson())
        }
    }

    delPlayer(playerToDel) {
        if (this.age === 0) {
            this.players = this.players.filter(player => player.id !== playerToDel.id)
            this.update(this.toJson())
        }
    }


    getPlayer(id) {
        const players = this.players.filter(player => player.id === id)
        return players.length === 1 ? players[0] : null
    }

    nextAge() {
        this.age = this.age < 4 ? this.age + 1 : 0
        this.ageCards = this.calcAgeCards(this.age, this.players.length)
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
        return this.data.age
    }

    get ageCards() {
        return this.data.ageCards
    }

    get nbsPlayers() {
        return this.data.nbsPlayers
    }

    get round() {
        return this.data.round
    }

    get players() {
        return this.data.players
    }

    set players(players) {
        this.data.players = players
    }

    set age(age) {
        this.data.age = age
    }

    set ageCards(ageCards) {
        this.data.ageCards = ageCards
    }

    set nbsPlayers(nbsPlayers) {
        this.data.nbsPlayers = nbsPlayers
    }

    set round(round) {
        this.data.round = round
    }

    toJson() {
        return JSON.parse(JSON.stringify({ ...this.data, id: this.id }))
    }


}


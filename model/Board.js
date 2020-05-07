
import { shuffle } from './helpers'
import { Player } from './Player'
import { getRessourcesCombinaisons, getPrice } from './helpers/actions'

export class Board {

    constructor(config, actions) {

        this.allCards = config.allCards;
        this.id = config.id

        this.data = {
            age: config.age ? config.age : 0,
            players: config.players ? config.players.map(player => new Player(player)) : [],
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
            this.players = [...this.players, new Player(player)]
            this.update(this.toJson())
        }
    }

    delPlayer(idPlayer) {
        if (this.age === 0) {
            this.players = this.players.filter(player => player.id !== idPlayer)
            this.update(this.toJson())
        }
    }

    setWonder(wonder, idPlayer) {
        const realPlayer = this.getPlayer(idPlayer)
        if (realPlayer) {
            realPlayer.wonder = wonder
            this.update(this.toJson())
        }
    }

    setChoiceCards(cards, idPlayer) {
        const realPlayer = this.getPlayer(idPlayer)
        if (realPlayer) {
            realPlayer.choiceCards = cards
            this.update(this.toJson())
        }
    }

    addWonderCard(card, idStep, idPlayer) {
        const realPlayer = this.getPlayer(idPlayer)
        if (realPlayer) {
            const realStep = this.getStep(idPlayer, idStep)
            if (realStep) {
                realPlayer.wonderCards = [...realPlayer.wonderCards, card]
                realStep.hasCard = true
                this.update(this.toJson())
            }
        }
    }

    setBoardCards(cards, idPlayer) {
        const realPlayer = this.getPlayer(idPlayer)
        if (realPlayer) {
            realPlayer.boardCards = cards
            this.update(this.toJson())
        }
    }


    getPlayer(id) {
        const index = this.players.map(player => player.id).indexOf(id)
        return index !== -1 ? this.players[index] : null
    }

    getStep(idPlayer, idStep) {
        const realPlayer = this.getPlayer(idPlayer)
        if (realPlayer && realPlayer.wonder) {
            const index = realPlayer.wonder.steps.map(step => step.id).indexOf(idStep)
            return index !== -1 ? realPlayer.wonder.steps[index] : null
        }
        return null
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

    test(player, cost, isNeighbour) {
        return getRessourcesCombinaisons(player, cost, isNeighbour)
    }

    testPrice(player, ressourcesId, apply) {
        return getPrice(player, ressourcesId, apply)
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
        return JSON.parse(JSON.stringify({
            ...this.data,
            id: this.id,
            players: this.players.map(player => player.toJson())
        }))
    }


}


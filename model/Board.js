
import { Player } from './Player'
import { calcAgeCards, splitCardsChoice, switchCardsChoice, rightPlayer, leftPlayer, buyCard, buildStep } from './helpers/actions'


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

    getCard(uniqId) {
        const cards = this.allCards.filter(card => card.uniqId === uniqId)
        return cards.length === 1 ? cards[0] : null
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
        this.ageCards = calcAgeCards(this.age, this.players.length, this.allCards)

        if (this.canPlay()) {
            const split = splitCardsChoice(this.players.length, this.ageCards)

            this.players.forEach((player, index) => {
                player.choiceCards = split[index]
            })

            this.calcBuyInfo()
        } else {
            this.players.forEach((player, index) => {
                player.choiceCards = []
            })
        }

        this.update(this.toJson())
    }

    nextRound() {
        if (this.canPlay()) {
            const split = switchCardsChoice(this.players.map(player => player.choiceCards), this.age === 2 ? 'right' : 'left')

            this.players.forEach((player, index) => {
                player.choiceCards = split[index]
            })

            this.calcBuyInfo()

            this.update(this.toJson())

        }
    }

    canPlay() {
        return (this.age === 1 || this.age === 2 || this.age === 3) && this.players.length >= 3
    }

    calcBuyInfo() {
        this.players.forEach((player) => {
            player.choiceCards.map(card => card.setBuyInfo(this.canAddCard(player.id, card.uniqId)))
            player.wonder.steps.map(step => step.setBuyInfo(this.canBuildStep(player.id, step)))
        })
    }

    canBuildStep(idPlayer, step) {
        const me = this.getPlayer(idPlayer)
        const right = rightPlayer(idPlayer, this.players)
        const left = leftPlayer(idPlayer, this.players)

        return buildStep(me, right, left, step)
    }

    canAddCard(idPlayer, uniqIdCard) {
        const card = this.getCard(uniqIdCard)
        const me = this.getPlayer(idPlayer)
        const right = rightPlayer(idPlayer, this.players)
        const left = leftPlayer(idPlayer, this.players)

        return buyCard(me, right, left, card)
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


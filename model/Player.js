
export class Player {

    constructor(config) {

        this.id = config.id

        this.data = {
            pseudo: config.pseudo ? config.pseudo : 'inconnu',
            points: config.points ? config.points : 0,
            coins: config.coins ? config.coins : 3,
            wonder: config.wonder ? config.wonder : null,
            choiceCards: config.choiceCards ? config.choiceCards : [],
            myCards: config.myCards ? config.myCards : [],
            wonderCards: config.wonderCards ? config.wonderCards : []
        }

    }

    setWonder(wonder) {
        this._wonder = new Wonder(wonder)
    }

    setChoiceCards(cards) {
        this._choiceCards = [...cards]
    }

    addCard(card) {
        this._myCards = [...this.myCards, card]
    }

    addWonderCard(card) {
        this._wonderCards = [...this.wonderCards, card]
    }

    get pseudo() {
        return this.data.pseudo
    }

    get points() {
        return this.data.points
    }

    get wonder() {
        return this.data.wonder
    }

    get choiceCards() {
        return this.data.choiceCards
    }

    get myCards() {
        return this.data.myCards
    }

    get wonderCards() {
        return this.data.wonderCards
    }

    set pseudo(pseudo) {
        this.data.pseudo = pseudo
    }

    set points(points) {
        this.data.points = points
    }

    set wonder(wonder) {
        this.data.wonder = wonder
    }

    set choiceCards(choiceCards) {
        this.data.choiceCards = choiceCards
    }

    set myCards(myCards) {
        this.data.myCards = myCards
    }

    set wonderCards(wonderCards) {
        this.data.wonderCards = wonderCards
    }

    toJson() {
        return JSON.parse(JSON.stringify({ ...this.data, id: this.id }))
    }


}


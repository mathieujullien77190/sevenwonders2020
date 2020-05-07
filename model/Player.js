
export class Player {

    constructor(config) {

        this.id = config.id

        this.data = {
            pseudo: config.pseudo ? config.pseudo : 'inconnu',
            points: config.points ? config.points : 0,
            coins: config.coins ? config.coins : 3,
            wonder: config.wonder ? config.wonder : null,
            choiceCards: config.choiceCards ? config.choiceCards : [],
            boardCards: config.boardCards ? config.boardCards : [],
            wonderCards: config.wonderCards ? config.wonderCards : []
        }

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

    get boardCards() {
        return this.data.boardCards
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

    set boardCards(boardCards) {
        this.data.boardCards = boardCards
    }

    set wonderCards(wonderCards) {
        this.data.wonderCards = wonderCards
    }

    toJson() {
        return JSON.parse(JSON.stringify({ ...this.data, id: this.id }))
    }


}


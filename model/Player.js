
import { Wonder } from './Wonder'
import { Card } from './Card'

export class Player {

    constructor(config) {

        this.id = config.id
        this.pseudo = config.pseudo ? config.pseudo : 'inconnu'
        this.points = config.points ? config.points : 0
        this.coins = config.coins ? config.coins : 3
        this.wonder = config.wonder ? new Wonder(config.wonder) : null
        this.choiceCards = config.choiceCards ? config.choiceCards.map(card => {
            return new Card(card)
        }) : []
        this.boardCards = config.boardCards ? config.boardCards.map(card => new Card(card)) : []
        this.wonderCards = config.wonderCards ? config.wonderCards.map(card => new Card(card)) : []

    }

    getChoiceCard(id) {
        const cards = this.choiceCards.filter(card => card.id === id)
        return cards.length === 1 ? cards[0] : null
    }

    toJson() {

        return {
            id: this.id,
            pseudo: this.pseudo,
            points: this.points,
            coins: this.coins,
            wonder: this.wonder ? this.wonder.toJson() : null,
            choiceCards: this.choiceCards.map(card => card.toJson()),
            boardCards: this.boardCards.map(card => card.toJson()),
            wonderCards: this.wonderCards.map(card => card.toJson())
        }
    }


}


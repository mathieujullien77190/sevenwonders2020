
import { Wonder } from './Wonder'
import { Card } from './Card'

export class Player {

    constructor(config) {

        this.id = config.id
        this.pseudo = config.pseudo ? config.pseudo : 'inconnu'
        this.points = config.points ? config.points : 0
        this.coins = config.coins ? config.coins : 3
        this.warPoints = config.warPoints ? config.warPoints : []
        this.wonder = config.wonder ? new Wonder(config.wonder) : null
        this.choiceCards = config.choiceCards ? config.choiceCards.map(card => {
            return new Card(card)
        }) : []
        this.boardCards = config.boardCards ? config.boardCards.map(card => new Card(card)) : []
        this.selectionCard = config.selectionCard ? config.selectionCard : null

    }

    toJson() {

        return {
            id: this.id,
            pseudo: this.pseudo,
            points: this.points,
            coins: this.coins,
            warPoints: this.warPoints,
            wonder: this.wonder ? this.wonder.toJson() : null,
            choiceCards: this.choiceCards.map(card => card.toJson()),
            boardCards: this.boardCards.map(card => card.toJson()),
            selectionCard: this.selectionCard
        }
    }


}


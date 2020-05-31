
import { Wonder } from './Wonder'
import { Card } from './Card'
import { rand } from './helpers'


export class Player {

    constructor(config) {
        this.pseudo = config.pseudo

        this.id = config.id ? config.id : `${rand(1000, 1000000)}${new Date().getTime()}`
        this.connected = config.connected ? config.connected : new Date()
        this.active = config.active ? config.active : 1;
        this.leader = config.leader ? config.leader : false

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
            connected: this.connected,
            active: this.active,
            leader: this.leader,
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



import { getAllCards } from '../data/cards'
import { getListWonders } from '../data/wonders'
import { Card } from '../model/Card'
import { Wonder } from '../model/Wonder'


export class Board {

    constructor(config) {

        this.allCards = getAllCards().map(card => new Card(card))
        this.allWonders = getListWonders().map(wonder => new Wonder(wonder))
        this.id = config.id
        this.age = 0
        this.players = []
        this.ageCards = []
        this.round = 0

    }

    toJson() {
        return {
            allCards: this.allCards,
            allWonders: this.allWonders,
            id: this.id,
            age: this.age,
            players: this.players,
            ageCards: this.ageCards,
            roug: this.round
        }
    }

}


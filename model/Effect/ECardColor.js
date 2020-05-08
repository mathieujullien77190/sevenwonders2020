import { Effect } from './Effect'

export class ECardColor extends Effect {

    static create(config) {
        return new ECardColor(config)
    }

    constructor(config) {
        super(config)
        this.color = config.color
        this.coins = config.coins
        this.victoryPoint = config.victoryPoint
    }

    hasCoins() {
        return this.coins > 0
    }
    hasVictoryPoints() {
        return this.victoryPoint > 0
    }

    toJson() {
        return {
            ...super.toJson(),
            color: this.color,
            coins: this.coins,
            victoryPoint: this.victoryPoint
        }
    }

}

import { Effect } from './Effect'

export class EMoneyVictory extends Effect {

    static create(config) {
        return new EMoneyVictory(config)
    }

    constructor(config) {
        super(config)
        this.victoryPoint = config.victoryPoint
        this.coins = config.coins
    }

    toJson() {
        return {
            ...super.toJson(),
            victoryPoint: this.victoryPoint,
            coins: this.coins
        }
    }
}

import { Effect } from './Effect'

export class EStep extends Effect {

    static create(config) {
        return new EStep(config)
    }

    constructor(config) {
        super(config)
        this.coins = config.coins
        this.victoryPoint = config.victoryPoint
    }

    toJson() {
        return {
            ...super.toJson(),
            coins: this.coins,
            victoryPoint: this.victoryPoint
        }
    }
}

import { Effect } from './Effect'

export class EDefeat extends Effect {

    static create(config) {
        return new EDefeat(config)
    }

    constructor(config) {
        super(config)
        this.coins = config.coins
        this.victoryPoint = config.victoryPoint
    }
}

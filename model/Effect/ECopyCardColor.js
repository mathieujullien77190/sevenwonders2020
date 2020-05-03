import { Effect } from './Effect'

export class ECopyCardColor extends Effect {

    static create(config) {
        return new ECopyCardColor(config)
    }

    constructor(config) {
        super(config)
        this.color = config.color
    }
}

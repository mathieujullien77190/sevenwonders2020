import { Effect } from './Effect'

export class EPickCard extends Effect {

    static create(config) {
        return new EPickCard(config);
    }

    constructor(config) {
        super(config);
    }
}

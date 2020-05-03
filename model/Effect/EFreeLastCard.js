import { Effect } from './Effect'

export class EFreeLastCard extends Effect {

    static create(config) {
        return new EFreeLastCard(config);
    }

    constructor(config) {
        super(config);
    }
}

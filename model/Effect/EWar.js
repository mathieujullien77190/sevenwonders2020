import { Effect } from './Effect'

export class EWar extends Effect {

    static create(config) {
        return new EWar(config);
    }

    constructor(config) {
        super(config);
        this.value = config.value;
    }

}


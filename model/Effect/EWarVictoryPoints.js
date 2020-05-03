import { Effect } from './Effect'

export class EWarVictoryPoints extends Effect {

    static create(config) {
        return new EWarVictoryPoints(config);
    }

    constructor(config) {
        super(config);
        this.value = config.value;
    }

}


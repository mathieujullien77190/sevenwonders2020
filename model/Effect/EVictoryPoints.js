import { Effect } from './Effect'

export class EVictoryPoints extends Effect {

    static create(config) {
        return new EVictoryPoints(config);
    }

    constructor(config) {
        super(config);
        this.value = config.value;
    }

    toJson() {
        return {
            ...super.toJson(),
            value: this.value
        }
    }

}


import { Effect } from './Effect'

export class EMoneyLost extends Effect {

    static create(config) {
        return new EMoneyLost(config);
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

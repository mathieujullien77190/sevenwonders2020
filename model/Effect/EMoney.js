import { Effect } from './Effect'

export class EMoney extends Effect {

    static create(config) {
        return new EMoney(config);
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

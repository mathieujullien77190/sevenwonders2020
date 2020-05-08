import { Effect } from './Effect'

export class EDualPlay extends Effect {

    static create(config) {
        return new EDualPlay(config);
    }

    constructor(config) {
        super(config);
    }

    toJson() {
        return {
            ...super.toJson()
        }
    }
}

import { Scientific } from '../Scientific'
import { Effect } from './Effect'

export class EScientific extends Effect {

    static create(config) {
        return new EScientific(config);
    }

    constructor(config) {
        super(config);
        this.symbols = config.symbols.map(symbol => new Scientific(symbol));
    }

    toJson() {
        return {
            ...super.toJson(),
            symbols: this.symbols.map(Symbol => Symbol.toJson())
        }
    }

}


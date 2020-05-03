import { Scientific } from '../Scientific'
import { getScientific } from '../../data/scientifics'

import { Effect } from './Effect'

export class EScientific extends Effect {

    static create(config) {
        return new EScientific(config);
    }

    constructor(config) {
        super(config);
        this.symbols = config.symbols.map(id => new Scientific(getScientific(id)));
    }

}


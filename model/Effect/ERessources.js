import { Ressource } from '../Ressource'
import { getRessource } from '../../data/ressources'

import { Effect } from './Effect'

export class ERessources extends Effect {

    static create(config) {
        return new ERessources(config);
    }

    constructor(config) {
        super(config);
        this.ressources = config.ressources.map(id => new Ressource(getRessource(id)));
        this.operator = config.operator;
    }

    hasOperatorOr() {
        return this.operator === 'or';
    }

    hasOperatorAnd() {
        return this.operator === 'and';
    }
}


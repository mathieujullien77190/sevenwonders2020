import { Ressource } from '../Ressource'
import { getRessource } from '../../data/ressources'

import { Effect } from './Effect'

export class ERessources extends Effect {

    static create(config) {
        return new ERessources(config);
    }

    constructor(config) {
        super(config);

        this.ressources = config.ressources.map(ressource => new Ressource(ressource));
        this.operator = config.operator;
    }

    hasOperatorOr() {
        return this.operator === 'or';
    }

    hasOperatorAnd() {
        return this.operator === 'and';
    }

    toJson() {
        return {
            ...super.toJson(),
            ressources: this.ressources.map(ressource => ressource.toJson()),
            operator: this.operator
        }
    }
}


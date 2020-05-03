import { Ressource } from '../Ressource'
import { getRessource } from '../../data/ressources'

import { Effect } from './Effect'

export class EReduction extends Effect {

    static create(config) {
        return new EReduction(config);
    }

    constructor(config) {
        super(config);
        this.ressources = config.ressources.map(id => new Ressource(getRessource(id)));
        this.value = config.value;
    }
}

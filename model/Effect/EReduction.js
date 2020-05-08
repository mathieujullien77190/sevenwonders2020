import { Ressource } from '../Ressource'


import { Effect } from './Effect'

export class EReduction extends Effect {

    static create(config) {
        return new EReduction(config);
    }

    constructor(config) {
        super(config);
        this.ressources = config.ressources.map(ressource => new Ressource(ressource));
        this.value = config.value;
    }

    toJson() {
        return {
            ...super.toJson(),
            value: this.value,
            ressources: this.ressources.map(ressource => ressource.toJson())
        }
    }
}

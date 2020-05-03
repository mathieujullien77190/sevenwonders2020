import { Ressource } from './Ressource'
import { getRessource } from '../data/ressources'
import { constructEffect } from './Effect/helper'

export class Step {

    constructor(config) {
        this.ressourcesCost = config.ressourcesCost.map(id => new Ressource(getRessource(id)))
        this.coinsCost = config.coinsCost
        this.effects = config.effects.map(effect => constructEffect(effect.type, effect))
    }

    hasRessourcesCost() {
        return this.ressourcesCost.length > 0
    }

    hasCoinsCost() {
        return this.coinsCost > 0
    }

}


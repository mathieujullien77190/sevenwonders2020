import { Ressource } from './Ressource'
import { constructEffect } from './Effect/helper'

export class Step {

    constructor(config) {
        this.id = config.id
        this.ressourcesCost = config.ressourcesCost.map(ressource => new Ressource(ressource))
        this.coinsCost = config.coinsCost
        this.effects = config.effects.map(effect => constructEffect(effect.type, effect))
        this.hasCard = config.hasCard ? config.hasCard : false

    }

    toJson() {
        return {
            id: this.id,
            ressourcesCost: this.ressourcesCost.map(ressource => ressource.toJson()),
            coinsCost: this.coinsCost,
            effects: this.effects.map(effect => effect.toJson()),
            hasCard: this.hasCard
        }
    }


}


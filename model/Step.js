import { Ressource } from './Ressource'
import { getRessource } from '../data/ressources'
import { constructEffect } from './Effect/helper'

export class Step {

    constructor(config) {
        this.id = config.id
        this.ressourcesCost = config.ressourcesCost.map(id => new Ressource(getRessource(id)))
        this.coinsCost = config.coinsCost
        this.effects = config.effects.map(effect => constructEffect(effect.type, effect))
        this.hasCard = config.hasCard ? config.hasCard : false
    }


}


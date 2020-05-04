import { Ressource } from './Ressource'
import { constructEffect } from './Effect/helper'
import { getRessource } from '../data/ressources'
import { getCardLink } from '../data/cards'

export class Card {

    constructor(config) {

        this.id = config.id
        this.uniqId = config.uniqId
        this.name = config.name
        this.color = config.color
        this.age = [...config.age]
        this.nbsPlayer = config.nbsPlayer
        this.ressourcesCost = config.ressourcesCost.map(id => new Ressource(getRessource(id)))
        this.coinsCost = config.coinsCost
        this.image = config.image
        this.effects = config.effects.map(effect => constructEffect(effect.type, effect))
        this.links = config.links.map(id => new Card(getCardLink(id)))
    }

    hasRessourcesCost() {
        return this.ressourcesCost.length > 0
    }

    hasCoinsCost() {
        return this.coinsCost > 0
    }

}


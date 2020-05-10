import { Ressource } from './Ressource'
import { constructEffect } from './Effect/helper'
import { getCardLink } from '../data/cards'


export class Card {

    constructor(arg) {
        const config = typeof arg === 'number' ? getCardLink(arg) : arg

        this.id = config.id
        this.uniqId = config.uniqId
        this.name = config.name
        this.color = config.color
        this.age = [...config.age]
        this.nbsPlayer = config.nbsPlayer
        this.ressourcesCost = config.ressourcesCost.map(ressource => new Ressource(ressource))
        this.coinsCost = config.coinsCost
        this.image = config.image
        this.effects = config.effects.map(effect => constructEffect(effect.type, effect))
        this.links = config.links.map(id => new Card(id))
        this.buyInfo = config.buyInfo
    }

    toJson() {
        return {
            id: this.id,
            uniqId: this.uniqId,
            name: this.name,
            color: this.color,
            age: this.age,
            nbsPlayer: this.nbsPlayer,
            ressourcesCost: this.ressourcesCost.map(ressource => ressource.toJson()),
            coinsCost: this.coinsCost,
            image: this.image,
            effects: this.effects.map(effect => effect.toJson()),
            links: this.links.map(link => link.toJson()),
            buyInfo: this.buyInfo,
        }

    }

}


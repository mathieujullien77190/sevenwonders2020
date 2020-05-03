import { Ressource } from './Ressource'
import { getRessource } from '../data/ressources'
import { Step } from './Step'

export class Wonder {

    constructor(config) {
        this.id = config.id
        this.name = config.name
        this.face = config.face
        this.image = config.image
        this.advantageRessource = config.advantageRessource >= 1 ? new Ressource(getRessource(config.advantageRessource)) : null
        this.advantageCoins = config.advantageCoins
        this.order = config.order
        this.steps = config.steps.map(step => new Step(step))
    }

    hasAdvantageRessource() {
        return this.advantageRessource
    }

    hasAdvantageCoins() {
        return this.advantageCoins > 0
    }

}


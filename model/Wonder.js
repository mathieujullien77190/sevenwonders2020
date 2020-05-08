import { Step } from './Step'
import { constructEffect } from './Effect/helper'

export class Wonder {

    constructor(config) {
        this.id = config.id
        this.name = config.name
        this.face = config.face
        this.image = config.image
        this.mainEffects = config.mainEffects.map(effect => constructEffect(effect.type, effect))
        this.order = config.order
        this.steps = config.steps.map(step => new Step(step))
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            face: this.face,
            image: this.image,
            mainEffects: this.mainEffects.map(effect => effect.toJson()),
            order: this.order,
            steps: this.steps.map(step => step.toJson())
        }
    }

}


import { getRessource } from '../data/ressources'

export class Ressource {

    constructor(arg) {

        const config = typeof arg === 'number' ? getRessource(arg) : arg

        this.id = config.id
        this.name = config.name
        this.image = config.image
        this.color = config.color

    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            image: this.image,
            color: this.color
        }
    }

}


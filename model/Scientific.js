import { getScientific } from '../data/scientifics'

export class Scientific {

    constructor(arg) {
        const config = typeof arg === 'number' ? getScientific(arg) : arg

        this.id = config.id
        this.name = config.name
        this.image = config.image
    }

    toJson() {
        return {
            id: this.id,
            name: this.name,
            image: this.image
        }
    }

}


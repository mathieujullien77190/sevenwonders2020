import { getListWonders } from '../data/wonders'
import { rand } from './helpers'

export class Wonders {

    constructor() {
        this.list = getListWonders().map(wonder => ({ wonder, use: false }))
    }

    select() {
        const rest = this.list.filter(item => item.use === false)
        const nbs = rest.length
        const one = rand(0, nbs - 1)
        const select = rest[one]

        this.list = this.list.map(item => {
            if (item.wonder.name === select.wonder.name) {
                return { ...item, use: true }
            }
            return item
        })

        return select.wonder
    }

    synchro(players) {
        const wonder = players.map(player => player.wonder.name)
        this.list = this.list.map(item => {
            if (wonder.includes(item.wonder.name)) {
                return { ...item, use: true }
            }
            return { ...item, use: false }
        })
    }


}


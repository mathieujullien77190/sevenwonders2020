import { rand } from './helpers'

export class PlayersId {

    constructor() {
        this.players = []
    }

    addPlayer(pseudo) {
        const id = `${rand(1000, 1000000)}${new Date().getTime()}`
        this.players = [...this.players, { pseudo, id }]
        return id
    }

    synchro(players) {
        const pseudos = players.map(player => player.pseudo)
        this.players = this.players.filter(player => pseudos.includes(player.pseudo))
    }

    getPlayerPseudo(pseudo) {
        const playersSelection = this.players.filter(player => player.pseudo === pseudo)
        return playersSelection.length === 1 ? playersSelection[0] : null
    }

    getPlayerId(id) {
        const playersSelection = this.players.filter(player => player.id === id)
        return playersSelection.length === 1 ? playersSelection[0] : null
    }


}


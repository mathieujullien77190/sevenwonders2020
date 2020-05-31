import { Players } from '../../both/collections'

export const searchPlayerPseudo = (players, pseudo) => {
    findPlayers = players.filter(player => player.pseudo === pseudo)
    return findPlayers.length >= 1 ? findPlayers[0] : null
}

export const getIndexPlayer = (id) => {
    const ids = Players.find().fetch().map(player => player.id)
    return ids.indexOf(id)
}

export const isLeader = (id) => {
    const players = Players.find().fetch()
    const index = getIndexPlayer(id)
    return index !== -1 ? players[index].leader : false
}
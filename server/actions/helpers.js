export const searchPlayerPseudo = (players, pseudo) => {
    findPlayers = players.filter(player => player.pseudo === pseudo)
    return findPlayers.length >= 1 ? findPlayers[0] : null
}

export const getIndexPlayer = (players, identity) => {
    let _player = null

    if (identity.id) {
        _player = _playersId.getPlayerId(identity.id)
    } else if (identity.pseudo) {
        _player = _playersId.getPlayerPseudo(identity.pseudo)
    }

    if (_player) {
        const pseudos = players.map(player => player.pseudo)
        return pseudos.indexOf(_player.pseudo)
    } else {
        return -1
    }

}

export const isLeader = (id, players) => {
    const _player = _playersId.getPlayerId(id)
    const playersLeader = players.filter(player => player.leader === true)
    return playersLeader.length === 1 ? playersLeader[0].pseudo === _player.pseudo : false
}
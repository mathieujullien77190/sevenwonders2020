import { buyCard, buildStep } from './card'

export const getIndexPlayer = (playerId, players) => {
    const ids = players.map(player => player.id)
    return ids.indexOf(playerId)
}

export const getPlayer = (board, idPlayer) => {
    const players = board.players.filter(player => player.id === idPlayer)
    return players.length === 1 ? players[0] : null
}

export const rightPlayer = (playerId, players) => {
    const index = getIndexPlayer(playerId, players)
    const nextIndex = index + 1 >= players.length ? 0 : index + 1
    return players[nextIndex]
}

export const leftPlayer = (playerId, players) => {
    const index = getIndexPlayer(playerId, players)
    const previousIndex = index - 1 < 0 ? players.length - 1 : index - 1
    return players[previousIndex]
}

export const canAddCard = (board, idPlayer, card) => {
    const me = getPlayer(board, idPlayer)
    const right = rightPlayer(idPlayer, board.players)
    const left = leftPlayer(idPlayer, board.players)

    const buyInfo = buyCard(me, right, left, card)

    return { priceMini: buyInfo.priceMini, canHave: buyInfo.canHave, free: buyInfo.free }
}

export const canBuildStep = (board, idPlayer, step) => {
    const me = getPlayer(board, idPlayer)
    const right = rightPlayer(idPlayer, board.players)
    const left = leftPlayer(idPlayer, board.players)

    const buyInfo = buildStep(me, right, left, step)

    return { priceMini: buyInfo.priceMini, canHave: buyInfo.canHave, free: buyInfo.free }
}


export const getStepCanBuild = (player) => {
    if (player) {
        const steps = player.wonder.steps.filter(step => !step.hasCardAge)
        return steps.length >= 1 ? steps[0] : null
    }
    return null
}


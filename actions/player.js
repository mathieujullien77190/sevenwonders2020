import { buyCard, buildStep, getColorCards } from './card'
import { arrayMin } from './helpers/arrayMin'
import { cartesian } from './helpers/cartesian'
import { isOwn, isRight, isLeft } from './effect'

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

export const getPointsPlayer = (player, board) => {
    const right = rightPlayer(player.id, board.players)
    const left = leftPlayer(player.id, board.players)

    const allCardsEffects = player.boardCards.map(card => card.effects).flat(1)
    const allStepsEffects = player.wonder.steps.filter(step => step.hasCardAge).map(step => step.effects).flat(1)

    const basePoints = [...allCardsEffects, ...allStepsEffects].map(effect => getPoints(effect, player, right, left)).reduce((acc, curr) => acc + curr, 0)
    const scientificPoints = getScientificPoints(player)
    const coinsPoints = getCoinsPoints(player)

    return basePoints + scientificPoints + coinsPoints
}

export const getPoints = (effect, player, rightPlayer, leftPlayer) => {

    if (effect.type === 'victoryPoints') {
        return effect.value
    } else if (effect.type === 'cardColor') {
        const own = isOwn(effect) ? getColorCards(player, effect.color).length * effect.victoryPoint : 0
        const right = isRight(effect) ? getColorCards(rightPlayer, effect.color).length * effect.victoryPoint : 0
        const left = isLeft(effect) ? getColorCards(leftPlayer, effect.color).length * effect.victoryPoint : 0
        return own + right + left
    } else if (effect.type === 'defeat') {
        const right = isRight(effect) ? rightPlayer.warPoints.filter(point => point < 0).length : 0
        const left = isLeft(effect) ? leftPlayer.warPoints.filter(point => point < 0).defeatPoints : 0
        return right + left
    } else if (effect.type === 'step') {
        const own = isOwn(effect) ? player.wonder.steps.filter(step => step.hasCardAge).length : 0
        const right = isRight(effect) ? rightPlayer.wonder.steps.filter(step => step.hasCardAge).length : 0
        const left = isLeft(effect) ? leftPlayer.wonder.steps.filter(step => step.hasCardAge).length : 0
        return own + left + right
    } else if (effect.type === 'moneyVictory') {
        return player.coins / effect.coins * effect.victoryPoint
    } else if (effect.type === 'warVictoryPoints') {
        const own = isOwn(effect) ? player.warPoints.filter(point => point > 0).length * effect.value : 0
        const right = isRight(effect) ? rightPlayer.warPoints.filter(point => point > 0).length * effect.value : 0
        const left = isLeft(effect) ? leftPlayer.warPoints.filter(point => point > 0).length * effect.value : 0
        return own + left + right
    }
    return 0
}

export const getScientificPoints = (player) => {
    const scientificSymbols = getColorCards(player, 'green').map(card => card.effects[0].symbols[0].id).map(symbol => [symbol])
    const mixedSymbols = [
        ...player.boardCards.filter(card => card.id === 71).map(card => card.effects[0].symbols.map(symbol => symbol.id)),
        ...player.wonder.steps.filter(step => step.hasCardAge).map(step => step.effects[0]).filter(effect => effect.type === 'scientific').map(effect => effect.symbols.map(symbol => symbol.id))
    ]
    const allSymbols = [...scientificSymbols, ...mixedSymbols]

    const allCombinaisons = allSymbols.length > 0 ? cartesian(allSymbols) : []

    let maxPoints = 0
    allCombinaisons.forEach(combi => {
        const group = combi.reduce((acc, curr) => {
            acc[curr - 1]++
            return acc
        }, [0, 0, 0])
        const nbsGroup = arrayMin(group)
        const groupPoints = nbsGroup * 7
        const samePoints = group.reduce((acc, curr) => {
            return acc + curr * curr
        }, 0)
        if (groupPoints + samePoints > maxPoints) {
            maxPoints = groupPoints + samePoints
        }
    })

    return maxPoints
}

export const countShield = (player) => {
    const cardShields = getColorCards(player, 'red').map(card => card.effects[0].value)
    const stepShields = player.wonder.steps.map(step => step.effects).flat(1).filter(effect => effect.type === 'war').map(effect => effect.value)
    return [...cardShields, stepShields].reduce((acc, curr) => {
        return acc + curr
    }, 0)
}

export const getWarPoints = (board, players) => {
    return players.map(player => {
        let = points = []
        const playerC = countShield(player)
        const rightC = countShield(rightPlayer(player.id, players))
        const leftC = countShield(leftPlayer(player.id, players))
        if (playerC > rightC) {
            points = [...points, board.age]
        } else if (playerC < rightC) {
            points = [...points, -1]
        }

        if (playerC > leftC) {
            points = [...points, board.age]
        } else if (playerC < leftC) {
            points = [...points, -1]
        }

        return points

    })
}

export const getMoney = (card, player, playerRight, playerLeft) => {
    const effects = card.effects.map(effect => effect)

    return effects.map(effect => {
        if (effect.type === 'money' && effect.apply.includes('own')) {
            return effect.value
        } else if (effect.type === 'cardColor') {
            const own = isOwn(effect) ? getColorCards(player, effect.color).length * effect.coins : 0
            const right = isRight(effect) ? getColorCards(playerRight, effect.color).length * effect.coins : 0
            const left = isLeft(effect) ? getColorCards(playerLeft, effect.color).length * effect.coins : 0
            return own + right + left
        }
    }).reduce((acc, curr) => acc + curr, 0)
}

export const getCoinsPoints = (player) => {
    return player.coins / 3
}



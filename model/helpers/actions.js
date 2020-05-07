import { cartesian } from './cartesian'
import { intersect } from './intersect'
import { difference } from './difference'
import { arrayMax } from './arrayMax'
import { arrayUniq } from './arrayUniq'
import { toRessourceLabels } from '../../data/ressources'

const getIndexPlayer = (player, players) => {
    const ids = players.map(player => player.id)
    return ids.indexOf(player.id)
}

export const rightPlayer = (player, players) => {
    const index = getIndexPlayer(player, players)
    const nextIndex = index + 1 >= players.length ? 0 : index + 1
    return players[nextIndex]
}

export const leftPlayer = (player, players) => {
    const index = getIndexPlayer(player, players)
    const previousIndex = index - 1 < 0 ? players.length - 1 : index - 1
    return players[previousIndex]
}

export const getColorCards = (player, color) => {
    return player.boardCards.filter(card => card.color === color)
}

export const getEffectsReductionCards = (cards, apply) => {
    return cards.filter(card => card.effects[0].type === 'reduction' && card.effects[0].apply.includes(apply)).map(card => card.effects[0])
}

export const getEffectsReductionSteps = (steps, apply) => {
    return steps.filter(step => step.hasCard && step.effects[0].type === 'reduction' && step.effects[0].apply.includes(apply)).map(step => step.effects[0])
}

export const getEffectsRessourcesCards = (cards, isNeighbour) => {
    return cards.filter(card => card.color === 'brown' || card.color === 'gray' || (card.color === 'yellow' && !isNeighbour)).filter(card => card.effects[0].type === 'ressources').map(card => card.effects[0])
}

export const getEffectsRessourcesSteps = (steps) => {
    return steps.filter(step => step.hasCard && step.effects[0].type === 'ressources').map(step => step.effects[0])
}

export const getEffectsRessourcesWonder = (wonder) => {
    return wonder.mainEffects.filter(effect => effect.type === 'ressources')
}

export const canPlayCard = (player, card) => {
    return player.boardCards.filter(item => item.id === card.id).length === 0
}

const getGroupRessources = (effectsRessources) => {

    return effectsRessources.reduce((acc, curr) => {
        if (curr.operator === 'or') {
            return [...acc, curr.ressources.map(ressource => ressource.id)]
        } else {
            return [...acc, ...curr.ressources.map(ressource => [ressource.id])]
        }
    }, [])

}

export const getRessourcesCombinaisons = (player, cost, isNeighbour) => {
    const costId = cost.map(ressource => ressource.id)
    const ressourcesCards = getGroupRessources(getEffectsRessourcesCards(player.boardCards, isNeighbour))
    const ressourcesWonder = getGroupRessources(getEffectsRessourcesWonder(player.wonder))
    const ressourcesSteps = !isNeighbour ? getGroupRessources(getEffectsRessourcesSteps(player.wonder.steps)) : []

    const idAllRessources = [...ressourcesCards, ...ressourcesWonder, ...ressourcesSteps]
    const cartesianR = cartesian(idAllRessources)
    const cartesianRStr = cartesianR.map(item => [...item].sort().join(''))
    const cartesianRStrClear = [...new Set(cartesianRStr)]
    const cartesianRClear = cartesianRStrClear.map(item => item.split('').map(x => Number(x)))
    const findBest = cartesianRClear.map(item => {
        const inter = intersect(costId, item)
        const diff = difference(costId, inter)
        return { difference: toRessourceLabels(diff), intersect: toRessourceLabels(inter), nbs: inter.length, id: diff.join('') }
    })
    const maxR = arrayMax(findBest.map(item => item.nbs))
    const findBestOfTheBest = findBest.filter(item => item.nbs === maxR)
    const findBestOfTheBestUniq = arrayUniq(findBestOfTheBest)
    return { playerCombinaison: findBestOfTheBestUniq, cost: toRessourceLabels(costId), idAllRessources: idAllRessources.map(item => toRessourceLabels(item)) }
}

export const getPrice = (player, ressourcesId, apply) => {
    const basePrice = 2
    const ressourcesReductionCards = getEffectsReductionCards(player.boardCards, apply).map(effect => effect.ressources.map(ressource => ressource.id))
    const ressourcesReductionSteps = getEffectsReductionSteps(player.wonder.steps, apply).map(effect => effect.ressources.map(ressource => ressource.id))
    const allRessourcesReduction = [...new Set([...ressourcesReductionCards, ...ressourcesReductionSteps].flat(1))]

    return ressourcesId.reduce((acc, curr) => {
        if (allRessourcesReduction.includes(curr)) {
            return acc + (basePrice - 1)
        } else {
            return acc + basePrice
        }
    }, 0)

}


import { cartesian } from './cartesian'
import { intersect } from './intersect'
import { difference } from './difference'
import { arrayMax } from './arrayMax'
import { arrayUniq } from './arrayUniq'
import { toRessourceLabels } from '../../data/ressources'
import { Meteor } from 'meteor/meteor';

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

export const getRessourcesCombinaisons = (player, costId, isNeighbour) => {
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
        return {
            differenceVisu: toRessourceLabels(diff),
            difference: diff,
            intersectVisu: toRessourceLabels(inter),
            intersect: inter,
            nbs: inter.length,
            id: diff.join('')
        }
    })
    const maxR = arrayMax(findBest.map(item => item.nbs))
    const findBestOfTheBest = findBest.filter(item => item.nbs === maxR)
    const findBestOfTheBestUniq = arrayUniq(findBestOfTheBest)
    return { playerCombinaisons: findBestOfTheBestUniq, cost: toRessourceLabels(costId), idAllRessources: idAllRessources }
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

export const getPlayersCombinations = (me, right, left, cost) => {
    const costId = cost.map(ressource => ressource.id)

    const meC = getRessourcesCombinaisons(me, costId, false)

    console.log('ME', meC.playerCombinaisons.map(item => item.differenceVisu), meC)

    meC.playerCombinaisons.forEach(item => {
        const combi = getRessourcesCombinaisons(right, item.difference, true)
        console.log('RIGHT', combi.playerCombinaisons.map(item => item.intersectVisu))
    })
    meC.playerCombinaisons.forEach(item => {
        const combi = getRessourcesCombinaisons(left, item.difference, true)
        console.log('LEFT', combi.playerCombinaisons.map(item => item.intersectVisu))
    })



}

if (Meteor.isClient) {
    window.getPrice = getPrice
    window.getPlayersCombinations = getPlayersCombinations
    window.getRessourcesCombinaisons = getRessourcesCombinaisons

    window.setEnv = () => {
        boardObj.addPlayer({ id: 1, pseudo: 'Matou' })
        boardObj.setBoardCards(cards.filter(item => ['1_3', '5_4', '45_7', '42_3'].includes(item.uniqId)), 1)
        boardObj.setWonder(wonders.filter(wonder => wonder.id === 3)[0], 1)
        boardObj.setChoiceCards(cards.filter(item => ['25_3'].includes(item.uniqId)), 1)
        boardObj.addWonderCard(cards[0], 1, 1)

        boardObj.addPlayer({ id: 2, pseudo: 'Gregou' })
        boardObj.setBoardCards(cards.filter(item => ['6_3', '45_6'].includes(item.uniqId)), 2)
        boardObj.setWonder(wonders.filter(wonder => wonder.id === 10)[0], 2)
        boardObj.addWonderCard(cards[0], 1, 2)

        boardObj.addPlayer({ id: 3, pseudo: 'Flouflou' })
        boardObj.setBoardCards(cards.filter(item => ['16_6'].includes(item.uniqId)), 3)
        boardObj.setWonder(wonders.filter(wonder => wonder.id === 7)[0], 3)
    }
}

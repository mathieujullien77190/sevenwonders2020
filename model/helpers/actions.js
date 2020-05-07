import { cartesian } from './cartesian'
import { arrayMax } from './arrayMax'
import { Meteor } from 'meteor/meteor';
import { arrayUniq } from './arrayUniq'

const getIndexPlayer = (playerId, players) => {
    const ids = players.map(player => player.id)
    return ids.indexOf(playerId)
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

export const haveSameCard = (player, buyCard) => {
    return player.boardCards.filter(card => card.id === buyCard.id).length > 0
}

export const haveLink = (player, buyCard) => {
    return player.boardCards.map(card => card.links).flat(1).filter(card => card.id === buyCard.id).length > 0
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

const getGroupRessources = (effectsRessources, player) => {
    return effectsRessources.reduce((acc, curr) => {
        if (curr.operator === 'or') {
            return [...acc, curr.ressources.map(ressource => tagRessource(ressource, player))]
        } else {
            return [...acc, curr.ressources.map(ressource => [tagRessource(ressource, player)])]
        }
    }, [])
}

const getRessourcesId = (ressources) => ressources.map(ressource => ressource.id)

const tagRessource = (ressource, player) => {
    return { ...ressource, tag: player.id }
}

const getRessourcesPossibilities = (player, isNeighbour) => {
    const ressourcesCards = getGroupRessources(getEffectsRessourcesCards(player.boardCards, isNeighbour), player)
    const ressourcesWonder = getGroupRessources(getEffectsRessourcesWonder(player.wonder), player)
    const ressourcesSteps = !isNeighbour ? getGroupRessources(getEffectsRessourcesSteps(player.wonder.steps), player) : []

    const idAllRessources = [...ressourcesCards, ...ressourcesWonder, ...ressourcesSteps]
    return idAllRessources
}

const takeRessources = (cost, dispo) => {
    let cloneCost = [...cost]
    let rest = [...dispo]
    let take = []

    cost.forEach((element, index) => {
        const position = getRessourcesId(rest).indexOf(element.id)
        const elementTake = { ...rest[position] }
        if (position !== -1) {
            rest.splice(position, 1)
            cloneCost.splice(getRessourcesId(cloneCost).indexOf(element.id), 1)
            take = [...take, elementTake]
        }
    })

    return { take, newCost: cloneCost }
}

export const getRessourcesCombinaisons = (ressourcesPosibilities, cost, own) => {
    const cartesianR = cartesian(ressourcesPosibilities)
    const findBest = cartesianR.map(item => {
        const result = takeRessources(cost, item)
        return {
            newCost: result.newCost,
            take: result.take,
            nbs: result.take.length,
            id: getRessourcesId(result.take).join('')
        }
    }).filter(item => item.take.length > 0)
    const deleteSame = !own ? findBest : arrayUniq(findBest)
    const maxR = deleteSame.length > 0 ? arrayMax(deleteSame.map(item => item.nbs)) : 0
    const findBestOfTheBest = deleteSame.filter(item => item.nbs === maxR).filter(item => item.newCost.length === 0 && !own || own)
    return findBestOfTheBest
}

export const getPrice = (player, apply, ressource) => {
    const basePrice = 2

    if (apply === 'left' || apply === 'right') {
        const ressourcesReductionCards = getEffectsReductionCards(player.boardCards, apply).map(effect => effect.ressources.map(ressource => ressource.id))
        const ressourcesReductionSteps = getEffectsReductionSteps(player.wonder.steps, apply).map(effect => effect.ressources.map(ressource => ressource.id))
        const allRessourcesReduction = [...new Set([...ressourcesReductionCards, ...ressourcesReductionSteps].flat(1))]

        if (allRessourcesReduction.includes(ressource.id)) {
            return basePrice - 1
        } else {
            return basePrice
        }
    } else {
        return 0
    }

}

export const buyCard = (me, right, left, card) => {

    const cost = card.ressourcesCost

    if (haveSameCard(me, card)) {//carte que l on a deja
        return { canHave: false, duplicata: true }
    }

    if (haveLink(me, card)) {//utilisation lien
        return { canHave: true, link: true }
    }

    if (cost.length === 0) {//pas de cout
        return { free: true, canHave: true }
    }

    const playerPosition = {
        [right.id]: 'right',
        [left.id]: 'left'
    }

    const RP = getRessourcesPossibilities(me, false)
    const meC = getRessourcesCombinaisons(RP, cost, true)

    if (meC.length >= 1 && meC[0].newCost.length === 0) {//un cout mais on dispose de toute les ressources
        return { free: true, canHave: true }
    }

    const RPRight = getRessourcesPossibilities(right, true)
    const RPLeft = getRessourcesPossibilities(left, true)

    const RPCommon = [...RPRight, ...RPLeft]

    const playersC = meC.map(item => getRessourcesCombinaisons(RPCommon, item.newCost, false)).filter(item => item.length > 0).flat(1)
    const playersCWithPrice = playersC.map(combinaison => combinaison.take.map(ressource => ({ ...ressource, price: getPrice(me, playerPosition[ressource.tag], ressource) })))

    const playersCWithGlobalPrice = playersCWithPrice.map(combinaison => {
        const price = combinaison.reduce((acc, curr) => acc + curr.price, 0)
        return { combinaison, price }
    }).filter(item => me.coins >= item.price)


    return {//acheter chez les voisins
        free: false,
        canHave: playersCWithGlobalPrice.length === 0 ? false : true,
        combinations: playersCWithGlobalPrice
    }
}

if (Meteor.isClient) {
    window.buyCard = buyCard
    window.haveLink = haveLink

    window.setEnv = () => {
        boardObj.addPlayer({ id: 1, pseudo: 'Matou' })
        boardObj.setBoardCards(cards.filter(item => ['5_4', '45_7', '42_3', '22_3'].includes(item.uniqId)), 1)
        boardObj.setWonder(wonders.filter(wonder => wonder.id === 3)[0], 1)
        boardObj.setChoiceCards(cards.filter(item => ['25_3', '23_3'].includes(item.uniqId)), 1)
        boardObj.addWonderCard(cards[0], 1, 1)
        //boardObj.addWonderCard(cards[0], 2, 1)


        boardObj.addPlayer({ id: 2, pseudo: 'Gregou' })
        boardObj.setBoardCards(cards.filter(item => ['6_3', '45_6'].includes(item.uniqId)), 2)
        boardObj.setWonder(wonders.filter(wonder => wonder.id === 10)[0], 2)
        boardObj.addWonderCard(cards[0], 1, 2)

        boardObj.addPlayer({ id: 3, pseudo: 'Flouflou' })
        boardObj.setBoardCards(cards.filter(item => ['16_6'].includes(item.uniqId)), 3)
        boardObj.setWonder(wonders.filter(wonder => wonder.id === 7)[0], 3)
    }
}

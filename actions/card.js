import { shuffle } from './helpers/shuffle'
import { cartesian } from './helpers/cartesian'
import { arrayMax } from './helpers/arrayMax'
import { arrayMin } from './helpers/arrayMin'
import { arrayUniq } from './helpers/arrayUniq'

export const calcAgeCards = (age, nbsPlayers, allCards) => {
    const baseCards = allCards.filter(card => {
        return age >= 1 && age <= 3 && card.age.includes(age) && card.color !== 'purple' && card.nbsPlayer <= nbsPlayers
    })

    const purpleCards = shuffle(allCards.filter(card => {
        return card.color === 'purple' && age === 3
    })).filter((card, index) => index < nbsPlayers + 2)

    return shuffle([...baseCards, ...purpleCards])
}

export const splitChoiceCards = (nbPlayers, cards) => {
    let working = []
    cards.forEach((card, index) => {
        if (!working[index % nbPlayers]) {
            working[index % nbPlayers] = []
        }
        working[index % nbPlayers].push(card)
    })
    return working
}

export const switchCardsChoice = (choiceCardsPlayers, direction) => {
    const idLastPlayer = choiceCardsPlayers.length - 1
    const working = []
    choiceCardsPlayers.forEach((choice, index) => {
        if (index === 0) {
            working[index] = direction === 'right' ? choiceCardsPlayers[index + 1] : choiceCardsPlayers[idLastPlayer]
        } else if (index === idLastPlayer) {
            working[index] = direction === 'right' ? choiceCardsPlayers[0] : choiceCardsPlayers[index - 1]
        } else {
            working[index] = direction === 'right' ? choiceCardsPlayers[index + 1] : choiceCardsPlayers[index - 1]
        }
    })
    return working
}


export const getCard = (board, uniqId) => {
    const cards = board.allCards.filter(card => card.uniqId === uniqId)
    return cards.length === 1 ? cards[0] : null
}

export const buyCard = (me, right, left, card) => {

    const cost = card.ressourcesCost

    if (card.coinsCost > me.coins) {//carte cout monnaie et pas la tune
        return { canHave: false }
    }

    if (haveSameCard(me, card)) {//carte que l on a deja
        return { canHave: false, duplicata: true }
    }

    if (haveLink(me, card)) {//utilisation lien
        return { canHave: true, link: true, free: true }
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
        combinations: playersCWithGlobalPrice,
        priceMini: playersCWithGlobalPrice.length > 0 ? arrayMin(playersCWithGlobalPrice.map(item => item.price)) : undefined
    }
}

export const buildStep = (me, right, left, step) => {
    const cost = step.ressourcesCost

    if (step.coinsCost > me.coins) {
        return { canHave: false }
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
        combinations: playersCWithGlobalPrice,
        priceMini: playersCWithGlobalPrice.length > 0 ? arrayMin(playersCWithGlobalPrice.map(item => item.price)) : undefined
    }

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

export const getEffect = (card, filter) => {
    return card.effects.filter(filter)
}

export const getEffectsReductionCards = (cards, apply) => {
    return cards.filter(card => card.effects[0].type === 'reduction' && card.effects[0].apply.includes(apply)).map(card => card.effects[0])
}

export const getEffectsReductionSteps = (steps, apply) => {
    return steps.filter(step => step.card && step.effects[0].type === 'reduction' && step.effects[0].apply.includes(apply)).map(step => step.effects[0])
}

export const getEffectsRessourcesCards = (cards, isNeighbour) => {
    return cards.filter(card => card.color === 'brown' || card.color === 'gray' || (card.color === 'yellow' && !isNeighbour)).filter(card => card.effects[0].type === 'ressources').map(card => card.effects[0])
}

export const getEffectsRessourcesSteps = (steps) => {
    return steps.filter(step => step.card && step.effects[0].type === 'ressources').map(step => step.effects[0])
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
    })
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

export const stackCards = (player, container) => {

    if (container === 1) {
        return [
            ...player.boardCards.filter(card => card.color === 'brown').sort((a, b) => b.effects[0].ressources.length - a.effects[0].ressources.length),
            ...player.boardCards.filter(card => card.color === 'gray')
        ]
    } else if (container === 2) {
        return player.boardCards.filter(card => card.color === 'red')
    } else if (container === 4) {
        return player.boardCards.filter(card => card.color === 'green').sort((a, b) => a.effects[0].symbols[0].id - b.effects[0].symbols[0].id)
    } else if (container === 3) {
        return [
            ...player.boardCards.filter(card => card.color === 'blue').sort((a, b) => a.effects[0].value - b.effects[0].value),
            ...player.boardCards.filter(card => card.color === 'yellow')
        ]
    } else if (container === 5) {
        return player.boardCards.filter(card => card.color === 'purple')
    }

    return []
}

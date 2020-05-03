import { EReduction } from './EReduction'
import { ERessources } from './ERessources'
import { EVictoryPoints } from './EVictoryPoints'
import { EMoney } from './EMoney'
import { EWar } from './EWar'
import { EScientific } from './EScientific'
import { ECardColor } from './ECardColor'

const classEffects = {
    reduction: EReduction,
    ressources: ERessources,
    victoryPoints: EVictoryPoints,
    money: EMoney,
    war: EWar,
    scientific: EScientific,
    cardColor: ECardColor
}

export const constructEffect = (type, config) => {
    return classEffects[type].create(config)
}
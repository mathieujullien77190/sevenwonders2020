import { EReduction } from './EReduction'
import { ERessources } from './ERessources'
import { EVictoryPoints } from './EVictoryPoints'
import { EMoney } from './EMoney'
import { EWar } from './EWar'
import { EScientific } from './EScientific'
import { ECardColor } from './ECardColor'
import { ECopyCardColor } from './ECopyCardColor'
import { EDefeat } from './EDefeat'
import { EDualPlay } from './EDualPlay'
import { EFreeLastCard } from './EFreeLastCard'
import { EPickCard } from './EPickCard'
import { EWarVictoryPoints } from './EWarVictoryPoints'
import { EStep } from './EStep'
import { EMoneyLost } from './EMoneyLost'

const classEffects = {
    reduction: EReduction,
    ressources: ERessources,
    victoryPoints: EVictoryPoints,
    money: EMoney,
    war: EWar,
    scientific: EScientific,
    cardColor: ECardColor,
    copyCardColor: ECopyCardColor,
    defeat: EDefeat,
    dualPlay: EDualPlay,
    freeLastCard: EFreeLastCard,
    pickCard: EPickCard,
    warVictoryPoints: EWarVictoryPoints,
    step: EStep,
    moneyLost: EMoneyLost
}

export const constructEffect = (type, config) => {
    return classEffects[type].create(config)
}
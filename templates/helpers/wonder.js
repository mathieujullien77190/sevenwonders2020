import { stackCards } from '../../both/game/card'

Template.wonder_template.helpers({
    hasAdvantageCoins() {
        return this.wonder.advantageCoins > 0
    },
    hasAdvantageRessources() {
        return this.wonder.advantageRessource
    },
    getAdvantageColor() {
        const effect = this.wonder.mainEffects[0]

        if (effect.type === 'money') {
            return 'yellow'
        } else if (effect.type === 'ressources') {
            return effect.ressources[0].color
        } else {
            return ''
        }

    },
    getCardStack1() {
        return stackCards(this.player, 1)
    },
    getCardStack2() {
        return stackCards(this.player, 2)
    },
    getCardStack3() {
        return stackCards(this.player, 3)
    },
    getCardStack4() {
        return stackCards(this.player, 4)
    },
    getCardStack5() {
        return stackCards(this.player, 5)
    }
})

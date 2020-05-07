

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

    }
})

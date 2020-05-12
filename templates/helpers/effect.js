import { isRight, isOwn, isLeft } from '../../actions/effect'

Template.effect_template.helpers({
    getTemplate() {
        const name = this.effect.type.charAt(0).toUpperCase() + this.effect.type.slice(1)
        return `effect${name}_template`
    },

    getData(size) {
        return { ...this, size: size ? size : 'normal' }
    }
});

Template.effectWar_template.helpers({
    getWarSymbols() {
        return [...Array(this.effect.value).keys()].map(i => 'W')
    }
});

Template.effectCardColor_template.helpers({
    hasVictoryPoint() {
        return this.effect.victoryPoint > 0
    },
    hasCoin() {
        return this.effect.coins > 0
    },
    effectAlone() {
        return this.effect.victoryPoint > 0 && this.effect.coins === 0 || this.effect.victoryPoint === 0 && this.effect.coins > 0 ? 'alone' : 'notAlone'
    }
})

Template.effectRessources_template.helpers({
    hasOperatorOr() {
        return this.effect.operator === 'or'
    }
})

Template.registerHelper('isApplyLeft', () => {
    const effect = Template.instance().data.effect
    return effect && (effect.type === 'reduction' || effect.type === 'cardColor') && isLeft(effect) ? true : false
});

Template.registerHelper('isApplyRight', () => {
    const effect = Template.instance().data.effect
    return effect && (effect.type === 'reduction' || effect.type === 'cardColor') && isRight(effect) ? true : false
});

Template.registerHelper('isApplyOwn', () => {
    const effect = Template.instance().data.effect
    return effect && effect.type === 'cardColor' && isOwn(effect) && isRight(effect) && isLeft(effect) && effect.apply ? true : false
});



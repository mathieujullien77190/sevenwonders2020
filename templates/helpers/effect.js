

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
    getSizePoint() {
        return this.size === 'big' ? 'normal' : 'small'
    }
})

Template.effectRessources_template.helpers({
    hasOperatorOr() {
        return this.effect.operator === 'or'
    }
})

Template.registerHelper('isApplyLeft', () => {
    const effect = Template.instance().data.effect
    return effect && effect.type === 'reduction' && effect.apply.includes('left') ? true : false
});

Template.registerHelper('isApplyRight', () => {
    const effect = Template.instance().data.effect
    return effect && effect.type === 'reduction' && effect.apply.includes('right') ? true : false
});

Template.registerHelper('isApplyOwn', () => {
    const effect = Template.instance().data.effect
    return effect && effect.type === 'reduction' && effect.apply.includes('own') ? true : false
});

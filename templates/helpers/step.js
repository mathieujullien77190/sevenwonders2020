import { getStepCanBuild } from '../../actions/player'

Template.step_template.helpers({
    costSize() {
        return this.step.ressourcesCost.length
    },
    free() {
        const nextStep = getStepCanBuild(this.player)
        return nextStep && this.step.id === nextStep.id && this.step.buyInfo && this.step.buyInfo.free
    },
    impossible() {
        const nextStep = getStepCanBuild(this.player)
        return nextStep && this.step.id === nextStep.id && this.step.buyInfo && !this.step.buyInfo.canHave
    },
    buy() {
        const nextStep = getStepCanBuild(this.player)
        return nextStep && this.step.id === nextStep.id && this.step.buyInfo && this.step.buyInfo.canHave && !this.step.buyInfo.free ? this.step.buyInfo.priceMini : null
    }
});
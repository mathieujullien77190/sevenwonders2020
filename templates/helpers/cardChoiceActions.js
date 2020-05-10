import { getStepCanBuild } from '../../actions/player'
import { selectCard } from '../../actions/board'

Template.cardChoiceActions_template.events({
    'mouseenter .cardChoiceActions_container'(event) {
        event.target.classList.add('show')
    },
    'mouseleave .cardChoiceActions_container'(event) {
        event.target.classList.remove('show')
    },
    'click .playCard'() {
        if (this.card.buyInfo && this.card.buyInfo.free) {
            selectCard(this.board, this.card.uniqId, this.player.id)
        }
    }
})

Template.cardChoiceActions_template.helpers({
    canPlayAction() {
        return !this.player.selectionCard
    },
    free() {
        return this.card.buyInfo && this.card.buyInfo.free
    },
    impossible() {
        return this.card.buyInfo && !this.card.buyInfo.canHave
    },
    canPlayCard() {
        return this.card.buyInfo && this.card.buyInfo.canHave
    },
    canBuildStep() {
        const nextStep = getStepCanBuild(this.player)
        return nextStep && nextStep.buyInfo && nextStep.buyInfo.canHave
    },
    buy() {
        return this.card.buyInfo && this.card.buyInfo.canHave && !this.card.buyInfo.free ? this.card.buyInfo.priceMini : null
    }
});
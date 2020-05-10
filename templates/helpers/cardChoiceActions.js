import { getStepCanBuild } from '../../actions/player'
import { selectCard } from '../../actions/board'

Template.cardChoiceActions_template.events({
    'mouseenter .cardChoiceActions_container'(event) {
        event.target.classList.add('show')
    },
    'mouseleave .cardChoiceActions_container'(event) {
        if (event.target.classList.contains('cardChoiceActions_container')) {
            event.target.classList.remove('show')
            event.target.querySelector('.over').classList.remove('showInfo')
        }
    },
    'click .playCard'() {
        selectCard(this.board, this.card.uniqId, this.player.id, "play")
    },
    'click .playStep'() {
        selectCard(this.board, this.card.uniqId, this.player.id, "wonder")
    },
    'click .discardCard'() {
        selectCard(this.board, this.card.uniqId, this.player.id, "discard")
    },
    'click .infoCard'() {
        event.target.parentNode.classList.add('showInfo')
    },
    'click .info'() {
        event.target.parentNode.classList.remove('showInfo')
    }
})

const impossible = (card) => {
    return card.buyInfo && !card.buyInfo.canHave
}

const canPlayCard = (card) => {
    return card.buyInfo && card.buyInfo.canHave
}

const free = (card) => {
    return card.buyInfo && card.buyInfo.free
}

const buy = (card) => {
    return card.buyInfo && card.buyInfo.canHave && !card.buyInfo.free ? card.buyInfo.priceMini : null
}

const canBuildStep = (player) => {
    const nextStep = getStepCanBuild(player)
    return nextStep && nextStep.buyInfo && nextStep.buyInfo.canHave
}

Template.cardChoiceActions_template.helpers({
    canPlayAction() {
        return !this.player.selectionCard
    },
    free() {
        return free(this.card)
    },
    impossible() {
        return impossible(this.card)
    },
    canPlayCard() {
        return canPlayCard(this.card)
    },
    canBuildStep() {
        return canBuildStep(this.player)
    },
    buy() {
        return buy(this.card)
    },
    info() {
        if (impossible(this.card) && !canBuildStep(this.player)) {
            return 'Vous pouvez défausser cette carte et gagner 3 pièces, c\'est mieux que rien :)'
        } else if (impossible(this.card) && canBuildStep(this.player)) {
            return 'Construisez un étage de merveille, c\'est gratuit!!'
        } else if (canPlayCard(this.card) && !free(this.card)) {
            return `Vous pouvez poser cette carte mais elle vous coutera ${buy(this.card)} pièces minimum ;)`
        } else {
            return 'Une carte parmi tant d\'autre'
        }
    }
});
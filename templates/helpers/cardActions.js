import { getBoardObj } from "../../both/board";

Template.cardActions_template.events({
    'mouseenter .cardAction_container'(event) {
        event.target.classList.add('show')
    },
    'mouseleave .cardAction_container'(event) {
        event.target.classList.remove('show')
    }
})

Template.cardActions_template.helpers({
    free() {
        return window.boardObj.canAddCard(this.player.id, this.card.uniqId).free
    },
    impossible() {
        return !window.boardObj.canAddCard(this.player.id, this.card.uniqId).canHave
    },
    buy() {
        const result = window.boardObj.canAddCard(this.player.id, this.card.uniqId)
        return result.canHave && !result.free ? result.priceMini : null
    }
});
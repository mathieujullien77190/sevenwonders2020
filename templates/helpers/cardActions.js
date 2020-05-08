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
        return this.card.buyInfo && this.card.buyInfo.free
    },
    impossible() {
        return this.card.buyInfo && !this.card.buyInfo.canHave
    },
    buy() {
        return this.card.buyInfo && this.card.buyInfo.canHave && !this.card.buyInfo.free ? this.card.buyInfo.priceMini : null
    }
});
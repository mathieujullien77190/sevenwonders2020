Template.card_template.helpers({
    hasCoinsCost() {
        return this.card.coinsCost > 0
    },
    big() {
        return !this.mini
    }
});

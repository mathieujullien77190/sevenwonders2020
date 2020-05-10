import { cancelCard } from '../../actions/board'

Template.cardSelectionActions_template.events({
    'click .cancel'() {
        if (this.card.buyInfo && this.card.buyInfo.free) {
            cancelCard(this.board, this.player.id)
        }
    }
})

Template.cardSelectionActions_template.helpers({
    canCancel() {
        return this.player.selectionCard
    },
    actionDescription() {
        if (this.card.action === 'play') {
            return 'Vous jouez cette carte'
        } else if (this.card.action === 'discard') {
            return 'Vous defaussez cette carte'
        } else if (this.card.action === 'wonder') {
            return 'Vous construisez un étage de merveille'
        }
    }
});
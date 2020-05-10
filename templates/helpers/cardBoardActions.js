import { cancelCardOnBoard } from '../../actions/board'

Template.cardBoardActions_template.events({
    'click .cancel'() {
        if (this.card.buyInfo && this.card.buyInfo.free) {
            cancelCardOnBoard(this.board, this.card.uniqId, this.player.id)
        }
    }
})

Template.cardBoardActions_template.helpers({
    canCancel() {
        return this.card.last
    },
});
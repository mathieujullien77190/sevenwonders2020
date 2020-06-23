import { errorActions } from './helpers'

Template.cardSelectionActions_template.events({
    'click .cancel'() {
        const me = Session.get('player')
        Meteor.call('cancelCard', { id: me.id }, error => {
            if (errorActions(error)) {
                console.log('erreur', error)
            }
        })
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
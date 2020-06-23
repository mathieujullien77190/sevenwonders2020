import { Players } from '../../both/collections'
import { cancelCard } from '../../both/game/board'

export const cancelCardAction = (data) => {
    const player = Players.findOne({ id: data.id })
    if (!player) {
        throw new Meteor.Error('cancelCard : player not exist')
    }

    if (!player.selectionCard) {
        throw new Meteor.Error('cancelCard : vous ne pouvez pas effectuer cette action')
    }

    cancelCard(player)

    return true

}
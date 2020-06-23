import { Players, Boards } from '../../both/collections'
import { selectCard } from '../../both/game/board'

export const playCard = (data) => {
    const player = Players.findOne({ id: data.id })
    if (!player) {
        throw new Meteor.Error('playCard : player not exist')
    }

    if (player.choiceCards.filter(card => card.uniqId === data.uniqIdCard).length === 0) {
        throw new Meteor.Error('playCard : vous ne pouvez pas jouer cette carte')
    }

    selectCard(data.uniqIdCard, player, data.nameAction)

    return true

}
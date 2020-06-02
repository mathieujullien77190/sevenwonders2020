import { Players, Boards } from '../../both/collections'
import { nextAge } from '../../both/game/board'

export const actionNextAge = (data) => {
    const player = Players.findOne({ id: data.id })
    if (!player) {
        throw new Meteor.Error('nextAge : player not exist')
    }

    if (!player.leader) {
        throw new Meteor.Error('nextAge : vous devez être leader')
    }

    const players = Players.find().fetch()
    const board = Boards.findOne()

    nextAge(board, players)

    return true

}
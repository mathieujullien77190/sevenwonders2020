import { Boards } from '../../both/collections'
import { getIndexPlayer } from './helpers'
import { removePlayers } from './removePlayers'

export const logout = (data) => {

    const board = Boards.findOne()
    if (!board) {
        throw new Meteor.Error('logout : board not exist')
    }

    const indexPlayer = getIndexPlayer(board.players, { id: data.id })
    if (indexPlayer === -1) {
        throw new Meteor.Error('logout : player not exist')
    }

    const select = { ...board.players[indexPlayer], active: Number.MAX_VALUE }
    board.players[indexPlayer] = select
    Boards.update({ _id: board._id }, board)

    removePlayers()

    return true
}
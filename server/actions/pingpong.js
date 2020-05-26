import { Boards } from '../../both/collections'
import { getIndexPlayer } from './helpers'

export const pingpong = (data) => {

    const board = Boards.findOne()
    if (!board) {
        throw new Meteor.Error('pingpongError : board not exist')
    }

    const indexPlayer = getIndexPlayer(board.players, { id: data.id })
    if (indexPlayer === -1) {
        throw new Meteor.Error('pingpongError : player not exist')
    }

    const select = { ...board.players[indexPlayer], connected: new Date(), active: data.active }
    board.players[indexPlayer] = select
    Boards.update({ _id: board._id }, board);
    return {
        id: data.id,
        connected: select.connected,
        active: select.active,
        pseudo: select.pseudo,
        leader: select.leader
    }
}
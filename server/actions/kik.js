import { Boards } from '../../both/collections'
import { getIndexPlayer, isLeader } from './helpers'
import { removePlayers } from './removePlayers'

export const kik = (data) => {

    const board = Boards.findOne()
    if (!board) {
        throw new Meteor.Error('kik : board not exist')
    }

    if (!isLeader(data.idLeader, board.players)) {
        throw new Meteor.Error('kik : Vous devez être leader pour kiker quelqu\'un')
    }


    const indexPlayer = getIndexPlayer(board.players, { pseudo: data.pseudo })
    if (indexPlayer === -1) {
        throw new Meteor.Error('logout : player not exist')
    }

    console.log()

    const select = { ...board.players[indexPlayer], active: Number.MAX_VALUE }
    board.players[indexPlayer] = select
    Boards.update({ _id: board._id }, board)

    removePlayers()

    return true
}
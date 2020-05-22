import { Boards } from '../../both/collections'
import { Meteor } from 'meteor/meteor'

export const setMaxPlayers = (nbsMax, idCurrentBoard) => {
    okNbsMax = nbsMax >= 3 && nbsMax <= 7 ? Math.floor(nbsMax) : 3

    const board = Boards.findOne({ id: idCurrentBoard })
    board.nbMaxPlayers = okNbsMax

    Boards.update(board._id, board);

    return { data: true, message: 'Nombre maximal de joueurs : ' + okNbsMax }
}
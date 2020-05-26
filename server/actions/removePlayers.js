import { Boards } from '../../both/collections'
import { KIK_TIME, PINGPONG_TIME } from '../../actions/constants'

export const removePlayers = () => {
    const board = Boards.findOne()

    if (board) {
        board.players = board.players.filter(player => player.connected > new Date(Date.now() - KIK_TIME) && player.active < KIK_TIME / PINGPONG_TIME)
        _playersId.synchro(board.players)
        _pseudos.synchro(board.players)
        _wonders.synchro(board.players)

        if (board.players.length > 0 && board.players.filter(player => player.leader).length === 0) {
            board.players[0].leader = true
        }

        Boards.update({ _id: board._id }, board);

        if (board.players.length === 0) {
            Boards.remove({})
        }
    }

}
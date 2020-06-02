import { Boards, Players } from '../../both/collections'
import { KIK_TIME, PINGPONG_TIME } from '../../both/constants'

export const removePlayers = () => {

    Players.remove({
        connected: { "$lt": new Date(Date.now() - KIK_TIME) }
    })
    Players.remove({
        active: { "$gt": KIK_TIME / PINGPONG_TIME }
    })

    const players = Players.find().fetch()

    _pseudos.synchro(players)
    _wonders.synchro(players)

    if (players.length > 0 && players.filter(player => player.leader).length === 0) {
        players[0].leader = true
        Players.update({ _id: players[0]._id }, players);
    }

    if (players.length === 0) {
        Boards.remove({})
    }


}
import { Players, Boards } from '../../both/collections'
import { KIK_TIME, PINGPONG_TIME } from '../../actions/constants'

export const removeOldPlayers = () => {
    Players.remove({
        connected: { "$lt": new Date(Date.now() - KIK_TIME) }
    })
    Players.remove({
        active: { "$gt": KIK_TIME / PINGPONG_TIME }
    })

    const players = Players.find().fetch()
    if (players.length > 0 && players.filter(player => player.leader).length === 0) {
        Players.update({ _id: players[0]._id }, { $set: { leader: true } });
    }
    if (players.length === 0) {
        Boards.remove({})
    }

}
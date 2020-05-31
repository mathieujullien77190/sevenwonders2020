import { Players } from '../../both/collections'

export const pingpong = (data) => {
    const player = Players.findOne({ id: data.id })
    if (!player) {
        throw new Meteor.Error('pingpongError : player not exist')
    }

    const select = { ...player, connected: new Date(), active: data.active }

    Players.update({ _id: player._id }, select);
    return {
        id: select.id,
        connected: select.connected,
        active: select.active,
        pseudo: select.pseudo,
        leader: select.leader
    }
}
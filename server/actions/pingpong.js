import { Players } from '../../both/collections'

export const pingpong = (data) => {

    const select = Players.findOne({ id: data.id })
    if (select) {
        Players.update({ _id: select._id }, { $set: { connected: new Date(), active: data.active ? true : false } });
        return true
    } else {
        return false
    }


}
import { Players } from '../../both/collections'

export const logout = (data) => {
    Players.remove({ id: data.id })
    return true
}
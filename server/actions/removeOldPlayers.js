import { Players } from '../../both/collections'

export const removeOldPlayers = () => {
    const kikTime = 20000
    Players.remove({ connected: { "$lt": new Date(Date.now() - kikTime) } })
}
import { Players } from '../../both/collections'
import { isLeader } from './helpers'

export const kik = (data) => {
    if (!isLeader(data.idLeader)) {
        throw new Meteor.Error('kik : Vous devez être leader pour kiker quelqu\'un')
    }

    Players.remove({ pseudo: data.pseudo })

    return true
}
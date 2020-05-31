import { Players, Boards } from '../../both/collections'
import { Meteor } from 'meteor/meteor'
import { searchPlayerPseudo } from './helpers'
import { Player } from '../../model/Player'

export const addPlayer = (pseudo) => {
    let badPseudo = true
    let okPseudo = ''

    const players = Players.find().fetch()
    const board = Boards.findOne()
    const nbsPlayers = players.length

    if (!board) {
        throw new Meteor.Error('Vous ne pouvez pas vous connecter le board n\'existe pas')
    }

    if (pseudo.toString().match(/^[a-zA-Z0-9]{3,12}$/g)) {
        okPseudo = pseudo
        badPseudo = false
    } else {
        okPseudo = _pseudos.select()
    }

    if (searchPlayerPseudo(players, okPseudo)) {
        throw new Meteor.Error('Ce pseudo existe déjà')
    }

    if (nbsPlayers >= board.nbMaxPlayers) {
        throw new Meteor.Error('Nombre de joueur maximal atteint vous ne pouvez plus vous connecter')
    }

    const newWonder = _wonders.select()
    const newPlayer = new Player({ pseudo: okPseudo, leader: nbsPlayers === 0, wonder: newWonder })

    Players.insert(newPlayer);

    return {
        data: {
            pseudo: newPlayer.pseudo,
            id: players.id,
            leader: players.leader,
            active: players.active,
            connected: players.connected
        }, message: badPseudo ? 'Vous n\'avez pas voulu respecter les règles, voici un pseudo qui vous ira bien' : 'Connexion effectué avec succès'
    }
}
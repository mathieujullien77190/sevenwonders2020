import { Boards } from '../../both/collections'
import { Meteor } from 'meteor/meteor'
import { searchPlayerPseudo } from './helpers'
import { Player } from '../../model/Player'


export const addPlayer = (pseudo) => {
    let badPseudo = true
    let okPseudo = ''

    const board = Boards.findOne()
    const players = board.players;
    const nbsPlayers = players.length

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

    const id = _playersId.addPlayer(okPseudo)

    const newWonder = _wonders.select()

    const newPlayer = new Player({ pseudo: okPseudo, leader: nbsPlayers === 0, wonder: newWonder })

    board.players = [...board.players, newPlayer]

    Boards.update({ _id: board._id }, board);

    return { data: { ...newPlayer, id }, message: badPseudo ? 'Vous n\'avez pas voulu respecter les règles, voici un pseudo qui vous ira bien' : 'Connexion effectué avec succès' }
}
import { Players, Boards } from '../../both/collections'
import { Meteor } from 'meteor/meteor'

let PSEUDOS = [
    '_Baleine',
    '_Rateau',
    '_Moineau',
    '_Pulco',
    '_Ciboulette',
    '_RatonLaveur',
    '_LeFou',
    '_Bouboule',
]

const rand = (min, max) => {
    return min + Math.floor(Math.random() * (max - min + 1));
}

export const addPlayer = (pseudo) => {
    let badPseudo = true
    let okPseudo = 'Toto' + new Date().getTime()

    const board = Boards.findOne()
    const id = `${rand(1000, 1000000)}${new Date().getTime()}`
    const nbsPlayers = Players.find().fetch().length

    if (pseudo.toString().match(/^[a-zA-Z0-9]{3,12}$/g)) {
        okPseudo = pseudo
        badPseudo = false
    } else if (PSEUDOS.length > 0) {
        okPseudo = PSEUDOS.pop()
    }

    if (Players.findOne({ pseudo: okPseudo })) {
        throw new Meteor.Error('Ce pseudo existe déjà')
    }

    if (nbsPlayers >= board.nbMaxPlayers) {
        throw new Meteor.Error('Nombre de joueur maximal atteint vous ne pouvez plus vous connecter')
    }

    Players.insert({ id: id, pseudo: okPseudo, connected: new Date(), active: 1, leader: nbsPlayers === 0 })
    const player = Players.findOne({ pseudo: okPseudo })

    if (!player) {
        throw new Meteor.Error('AddPlayerError')
    } else {
        return { data: player, message: badPseudo ? 'Vous n\'avez pas voulu respecter les règles, voici un pseudo qui vous ira bien' : 'Connexion effectué avec succès' }
    }
}
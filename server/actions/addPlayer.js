import { Players } from '../../both/collections'
import { Meteor } from 'meteor/meteor'

let PSEUDOS = [
    'Baleine',
    'Rateau',
    'Moineau',
    'Pulco',
    'Ciboulette',
    'RatonLaveur',
    'LeFou',
    'Bouboule',
]

const rand = (min, max) => {
    return min + Math.floor(Math.random() * (max - min + 1));
}

export const addPlayer = (pseudo) => {
    let badPseudo = true
    let okPseudo = 'Toto' + new Date().getTime()
    if (pseudo.toString().match(/^[a-zA-Z0-9]{3,12}$/g)) {
        okPseudo = pseudo
        badPseudo = false
    } else if (PSEUDOS.length > 0) {
        okPseudo = PSEUDOS.pop()
    }

    if (Players.findOne({ pseudo: okPseudo })) {
        throw new Meteor.Error('Ce pseudo existe déjà')
    }

    const id = `${rand(1000, 1000000)}${new Date().getTime()}`//TODO
    Players.insert({ id: id, pseudo: okPseudo, connected: new Date(), active: 'active' })
    const player = Players.findOne({ pseudo: okPseudo })

    if (!player) {
        throw new Meteor.Error('AddPlayerError')
    } else {
        return { data: player, message: badPseudo ? 'Vous n\'avez pas voulu respecter les règles, voici un pseudo qui vous ira bien' : 'Connexion effectué avec succès' }
    }
}
import { Meteor } from 'meteor/meteor'
import { addPlayer } from './actions/addPlayer'
import { pingpong } from './actions/pingpong'
import { createBoard } from './actions/createBoard'
import { logout } from './actions/logout'
import { kik } from './actions/kik'
import { actionNextAge } from './actions/actionNextAge'
import { playCard } from './actions/playCard'
import { cancelCardAction } from './actions/cancelCard'

export const loadMethods = () => {
    Meteor.methods({
        addPlayer: (data) => {
            return addPlayer(data.pseudo)
        },
        pingpong: (data) => {
            return pingpong(data)
        },
        createBoard: () => {
            return createBoard()
        },
        logout: (data) => {
            return logout(data)
        },
        kik: (data) => {
            return kik(data)
        },
        nextAge: (data) => {
            return actionNextAge(data)
        },
        playCard: (data) => {
            return playCard(data)
        },
        cancelCard: (data) => {
            return cancelCardAction(data)
        }
    })
}
import { Meteor } from 'meteor/meteor'
import { addPlayer } from './actions/addPlayer'
import { pingpong } from './actions/pingpong'
import { setMaxPlayers } from './actions/setMaxPlayers'
import { createBoard } from './actions/createBoard'
import { logout } from './actions/logout'
import { kik } from './actions/kik'

export const loadMethods = () => {
    Meteor.methods({
        addPlayer: (data) => {
            return addPlayer(data.pseudo)
        },
        pingpong: (data) => {
            return pingpong(data)
        },
        setMaxPlayers: (data) => {
            return setMaxPlayers(data)
        },
        createBoard: () => {
            return createBoard()
        },
        logout: (data) => {
            return logout(data)
        },
        kik: (data) => {
            return kik(data)
        }
    })
}
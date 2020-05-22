import { Players, Boards } from '../both/collections'
import { Meteor } from 'meteor/meteor'
import { addPlayer } from './actions/addPlayer'
import { pingpong } from './actions/pingpong'
import { setMaxPlayers } from './actions/setMaxPlayers'
import { createBoard } from './actions/createBoard'

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
            const nbsPlayers = Players.find().fetch().length

            if (nbsPlayers === 0) {
                createBoard()
            }
        }
    })
}
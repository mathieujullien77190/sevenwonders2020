import { Meteor } from 'meteor/meteor'
import { addPlayer } from './actions/addPlayer'
import { pingpong } from './actions/pingpong'

export const loadMethods = () => {
    Meteor.methods({
        addPlayer: (data) => {
            return addPlayer(data.pseudo)
        },
        pingpong: (data) => {
            return pingpong(data)
        }
    })
}
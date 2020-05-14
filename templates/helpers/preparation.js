import { Session } from 'meteor/session'
import { Meteor } from 'meteor/meteor'
import { errorActions, login, message } from './helpers'

Template.preparation_template.helpers({
    isConnected() {
        return Session.get('player')
    },
    message() {
        const message = Session.get('message')
        return message ? message : ''
    },
    alive(player) {
        if (new Date().getTime() - player.connected < 10000) {
            if (player.active) {
                return 'connected'
            } else {
                return 'inactive'
            }
        } else {
            return 'disconnected'
        }
    },
    me(player) {
        const playerSession = Session.get('player')
        return playerSession && player._id === playerSession._id ? 'me' : ''
    }
})

Template.preparation_template.events({
    'click .playerJoin'() {
        const pseudo = document.getElementById('inputPseudo').value
        Meteor.call('addPlayer', { pseudo }, (error, result) => {
            if (!errorActions(error)) {
                login(result.data)
                message(result.message)
            }
        })
    }
})

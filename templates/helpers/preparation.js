import { Session } from 'meteor/session'
import { Meteor } from 'meteor/meteor'
import { errorActions, login, message, addPlayersTest, logout } from './helpers'
import { INACTIVE_TIME, PINGPONG_TIME, DISCONNECTED_TIME } from '../../actions/constants'


Template.preparation_template.helpers({
    nbsPlayers() {
        return this.players && this.players.length > 0 ? this.players.length : 0
    },
    isConnected() {
        return Session.get('player')
    },
    message() {
        const message = Session.get('message')
        return message ? message : ''
    },
    alive(player) {
        if (new Date().getTime() - player.connected < DISCONNECTED_TIME && player.active < DISCONNECTED_TIME / PINGPONG_TIME) {
            if (player.active < INACTIVE_TIME / PINGPONG_TIME) {
                return 'connected'
            } else {
                return 'inactive'
            }
        } else {
            return 'disconnected'
        }
    },
    timeInactive(player) {
        const time = player ? player.active * PINGPONG_TIME / 1000 : 0
        const min = Math.floor(time / 60)
        const sec = time % 60
        return (min > 0 ? `${min}min` : '') + `${sec}sec`
    },
    me(player) {
        const playerSession = Session.get('player')
        return playerSession && player._id === playerSession._id ? 'me' : ''
    },
    leader(player) {
        return player && player.leader ? 'leader' : ''
    },
    full() {
        return this.players && this.board && this.players.length === this.board.nbMaxPlayers ? '' : 'disabled'
    },
    isLeader() {
        const playerSession = Session.get('player')
        return playerSession && playerSession.leader ? true : false
    }
})

const join = (pseudo) => {
    Meteor.call('createBoard', {}, (error, result) => {
        if (!errorActions(error)) {
            Meteor.call('addPlayer', { pseudo }, (error, result) => {
                if (!errorActions(error)) {
                    login(result.data)
                    message(result.message)
                }
            })
        }
    })
}

const setNbsPlayer = (nbs) => {
    Meteor.call('setMaxPlayers', nbs, (error, result) => {
        if (!errorActions(error)) {
            message(result.message)
        }
    })
}

Template.preparation_template.events({
    'click .playerJoin'() {
        const pseudo = document.getElementById('inputPseudo').value
        join(pseudo)
        addPlayersTest(5)
    },
    'change .nbsPlayers'(event) {
        const value = event.target.value
        setNbsPlayer(value)
    },
    'click .logout'(event) {
        logout()
    }
})

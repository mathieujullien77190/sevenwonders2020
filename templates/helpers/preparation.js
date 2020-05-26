import { Session } from 'meteor/session'
import { Meteor } from 'meteor/meteor'
import { errorActions, login, message, logout, kik } from './helpers'
import { INACTIVE_TIME, PINGPONG_TIME, DISCONNECTED_TIME } from '../../actions/constants'

Template.preparation_template.helpers({
    isConnected() {
        return this.board && this.board.players && Session.get('player')
    },
    nbsPlayers() {
        return this.board.players && this.board.players.length > 0 ? this.board.players.length : 0
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
        return playerSession && player.pseudo === playerSession.pseudo ? 'me' : ''
    },
    leader(player) {
        return player && player.leader ? 'leader' : ''
    },
    full() {
        return this.board.players && this.board && this.board.players.length === this.board.nbMaxPlayers ? '' : 'disabled'
    },
    isLeader() {
        const playerSession = Session.get('player')
        return playerSession && playerSession.leader ? true : false
    }
})

const join = (pseudo) => {
    Meteor.call('createBoard', {}, (error, result) => {
        window.setTimeout(() => {
            Meteor.call('addPlayer', { pseudo }, (error, result) => {
                if (!errorActions(error)) {
                    login(result.data)
                    message(result.message)
                }
            })
        }, 1000)
    })
}

const joinTest = (pseudo) => {
    Meteor.call('addPlayer', { pseudo }, () => { })
}

Template.preparation_template.events({
    'click .playerJoin'() {
        const pseudo = document.getElementById('inputPseudo').value
        join(pseudo)
    },
    'click .addPlayerTest'() {
        joinTest('')
    },
    'click .logout'(event) {
        logout()
    },
    'click .kik'(event) {
        kik(event.target.dataset.pseudo)
    }
})

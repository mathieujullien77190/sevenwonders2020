export const errorActions = (error) => {
    if (error) {
        console.log(error)
        message(`Une erreur est survenue : ${error.error}`)
        return true
    }
    return false
}

export const message = (message) => {
    window.timeMessage = window.timeMessage ? window.timeMessage : null
    window.clearTimeout(timeMessage)
    Session.set('message', message)
    timeMessage = window.setTimeout(() => {
        Session.set('message', undefined)
    }, 10000)
}

export const pingpong = () => {
    const player = Session.get('player')
    const position = Session.get('position')
    const oldPosition = Session.get('oldPosition')
    let active = Session.get('active')

    if (!active) {
        Session.set('active', 1)
        active = 1
    }

    if (oldPosition === position) {
        Session.set('active', active + 1)
    } else {
        Session.set('active', 1)
        Session.set('oldPosition', position)
    }

    if (player) {
        Meteor.call('pingpong', { id: player.id, active: Session.get('active') > 5 ? false : true }, (error, result) => {
            if (!errorActions(error)) {
                if (!result) {
                    logout()
                }
            }
        })
    } else {
        logout()
    }
}

export const login = (data) => {
    Session.set('player', data)
    localStorage.setItem('playerSeven', JSON.stringify(data));
    window.setInterval(() => { pingpong() }, 2000)
}

export const logout = () => {
    Session.set('player', undefined)
    document.location.reload(true);
}

export const saveUserActivity = () => {
    document.onmousemove = (event) => {
        const position = event.pageX + '_' + event.pageY
        Session.set('position', position)
    }
}

const getArrayFromIndex = (array, startIndex) => {
    var returnArray = [];
    for (var i = 0; i < array.length; i++) {
        var index = (i + startIndex) % array.length;
        returnArray = [...returnArray, array[index]];
    }
    return returnArray;
}

const startArrayOnMe = (arr, me) => {
    const indexMe = arr.reduce((acc, curr, index) => {
        return acc + (me.pseudo === curr.pseudo ? index : 0)
    }, 0)
    return getArrayFromIndex(arr, indexMe)
}

const getLast = (arr, index) => {
    return index === 0 ? arr.slice(index - 1) : arr.slice(index - 1, index)
}

const getMiddle = (arr) => {
    return arr[Math.floor(arr.length / 2)];
}

const getMePlayer = (players) => {
    if (players) {
        const me = Session.get('player')
        const arrTransform = startArrayOnMe(players, me)
        return arrTransform[0]
    }
    return ''
}

const getLastPlayer = (players, index) => {
    if (players) {
        const me = Session.get('player')
        const arrTransform = startArrayOnMe(players, me)
        const last = getLast(arrTransform, -index)[0]
        return last
    }
    return ''
}

const getNextPlayer = (players, index) => {
    if (players) {
        const me = Session.get('player')
        const arrTransform = startArrayOnMe(players, me)
        const next = arrTransform[index + 1]
        return next
    }
    return ''
}

const getMiddlePlayer = (players) => {
    if (players) {
        const me = Session.get('player')
        const arrTransform = startArrayOnMe(players, me)
        const middle = getMiddle(arrTransform)
        return middle
    }
    return ''
}

Template.table_template.helpers({
    displayLast() {
        if (this.board) {
            return this.players.length % 2 === 0 ? true : false
        } else {
            return false
        }
    },
    displaySup4() {
        if (this.board) {
            return this.players.length > 4 ? true : false
        } else {
            return false
        }
    },
    displaySup6() {
        if (this.board) {
            return this.players.length > 6 ? true : false
        } else {
            return false
        }
    },
    getMe() {
        return getMePlayer(this.players)
    },
    getLast0() {
        return getLastPlayer(this.players, 0)
    },
    getNext0() {
        return getNextPlayer(this.players, 0)
    },
    getLast1() {
        return getLastPlayer(this.players, 1)
    },
    getNext1() {
        return getNextPlayer(this.players, 1)
    },
    getLast2() {
        return getLastPlayer(this.players, 2)
    },
    getNext2() {
        return getNextPlayer(this.players, 2)
    },
    getMiddle() {
        return getMiddlePlayer(this.players)
    },
    getChoiceCards() {
        const me = getMePlayer(this.players)
        return me.choiceCards
    },
    getSelectCard() {
        const me = getMePlayer(this.players)
        return me.selectionCard
    }

});

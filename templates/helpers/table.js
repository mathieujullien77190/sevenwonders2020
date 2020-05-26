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
        return acc + (me._id === curr._id ? index : 0)
    }, 0)
    return getArrayFromIndex(arr, indexMe)
}

const getLast = (arr, index) => {
    return index === 0 ? arr.slice(index - 1) : arr.slice(index - 1, index)
}

const getMiddle = (arr) => {
    return arr[Math.floor(arr.length / 2)];
}

Template.table_template.helpers({
    displayLast() {
        if (this.board) {
            return this.board.players.length % 2 === 0 ? true : false
        } else {
            return false
        }
    },
    displaySup4() {
        if (this.board) {
            return this.board.players.length > 4 ? true : false
        } else {
            return false
        }
    },
    displaySup6() {
        if (this.board) {
            return this.board.players.length > 6 ? true : false
        } else {
            return false
        }
    },
    getMe() {
        const me = Session.get('player')
        return me ? me.pseudo : ''
    },
    getLast(index) {
        if (this.board.players) {
            const me = Session.get('player')
            const arrTransform = startArrayOnMe(this.board.players, me)
            const last = getLast(arrTransform, index)[0]
            return last ? last.pseudo : ''
        }
        return ''
    },
    getNext(index) {
        if (this.board.players) {
            const me = Session.get('player')
            const arrTransform = startArrayOnMe(this.board.players, me)
            const next = arrTransform[index + 1]
            return next ? next.pseudo : ''
        }
        return ''
    },
    getMiddle() {
        if (this.board.players) {
            const me = Session.get('player')
            const arrTransform = startArrayOnMe(this.board.players, me)
            const middle = getMiddle(arrTransform)
            return middle ? middle.pseudo : ''
        }
        return ''
    }

});

export class Pseudos {

    constructor() {
        this.list = [
            { name: '_Baleine', canUse: true },
            { name: '_Rateau', canUse: true },
            { name: '_Moineau', canUse: true },
            { name: '_Pulco', canUse: true },
            { name: '_Ciboulette', canUse: true },
            { name: '_RatonLaveur', canUse: true },
            { name: '_LeFou', canUse: true },
            { name: '_Bouboule', canUse: true }
        ]
        this.default = '_Toto'
    }

    select() {
        const pseudos = this.list.filter(pseudo => pseudo.canUse)
        if (pseudos.length > 0) {
            this.list = this.list.map(pseudo => {
                if (pseudo.name === pseudos[0].name) {
                    return { ...pseudo, canUse: false }
                }
                return pseudo
            })
            return pseudos[0].name
        } else {
            return this.default + new Date().getTime()
        }
    }

    synchro(players) {
        const pseudos = players.map(player => player.pseudo)
        this.list = this.list.map(item => {
            if (pseudos.includes(item.name)) {
                return { ...item, canUse: false }
            }
            return { ...item, canUse: true }
        })
    }


}


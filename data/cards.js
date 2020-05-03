const brownCards = [
    // Âge 1
    {
        id: 1,
        name: 'Chantier',
        color: 'brown',
        age: [1],
        nbsPlayers: [3, 4],
        ressourcesCost: [],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [4] }],
        links: []
    },
    {
        id: 2,
        name: 'Cavité',
        color: 'brown',
        age: [1],
        nbsPlayers: [3, 5],
        ressourcesCost: [],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [3] }],
        links: []
    },
    {
        id: 3,
        name: 'Bassin argileux',
        color: 'brown',
        age: [1],
        nbsPlayers: [3, 5],
        ressourcesCost: [],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [1] }],
        links: []
    },
    {
        id: 4,
        name: 'Filon',
        color: 'brown',
        age: [1],
        nbsPlayers: [3, 4],
        ressourcesCost: [],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [2] }],
        links: []
    },
    {
        id: 74,
        name: 'Friche',
        color: 'brown',
        age: [1],
        nbsPlayers: [6],
        ressourcesCost: [],
        coinsCost: 1,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [4, 1], operator: 'or' }],
        links: []
    },
    {
        id: 5,
        name: 'Excavation',
        color: 'brown',
        age: [1],
        nbsPlayers: [4],
        ressourcesCost: [],
        coinsCost: 1,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [3, 1], operator: 'or' }],
        links: []
    },
    {
        id: 6,
        name: 'Fosse argileuse',
        color: 'brown',
        age: [1],
        nbsPlayers: [3],
        ressourcesCost: [],
        coinsCost: 1,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [1, 2], operator: 'or' }],
        links: []
    },
    {
        id: 7,
        name: 'Exploitation forestière',
        color: 'brown',
        age: [1],
        nbsPlayers: [3],
        ressourcesCost: [],
        coinsCost: 1,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [3, 4], operator: 'or' }],
        links: []
    },
    {
        id: 8,
        name: 'Gisement',
        color: 'brown',
        age: [1],
        nbsPlayers: [5],
        ressourcesCost: [],
        coinsCost: 1,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [4, 2], operator: 'or' }],
        links: []
    },
    {
        id: 9,
        name: 'Mine',
        color: 'brown',
        age: [1],
        nbsPlayers: [6],
        ressourcesCost: [],
        coinsCost: 1,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [2, 3], operator: 'or' }],
        links: []
    },
    // Âge 2
    {
        id: 10,
        name: 'Scierie',
        color: 'brown',
        age: [2],
        nbsPlayers: [3,4],
        ressourcesCost: [],
        coinsCost: 1,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [4, 4], operator: 'and' }],
        links: []
    },
    {
        id: 11,
        name: 'Carrière',
        color: 'brown',
        age: [2],
        nbsPlayers: [3,4],
        ressourcesCost: [],
        coinsCost: 1,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [3, 3], operator: 'and' }],
        links: []
    },
    {
        id: 12,
        name: 'Briqueterie',
        color: 'brown',
        age: [2],
        nbsPlayers: [3,4],
        ressourcesCost: [],
        coinsCost: 1,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [1, 1], operator: 'and' }],
        links: []
    },
    {
        id: 13,
        name: 'Fonderie',
        color: 'brown',
        age: [2],
        nbsPlayers: [3,4],
        ressourcesCost: [],
        coinsCost: 1,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [2, 2], operator: 'and' }],
        links: []
    }
]

const greyCards = [     
    {
        id: 14,
        name: 'Métier à tisser',
        color: 'gray',
        age: [1, 2],
        nbsPlayers: [3, 6],
        ressourcesCost: [],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [6] }],
        links: []
    },
    {
        id: 15,
        name: 'Verrerie',
        color: 'gray',
        age: [1, 2],
        nbsPlayers: [3, 6],
        ressourcesCost: [],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [5] }],
        links: []
    },
    {
        id: 16,
        name: 'Presse',
        color: 'gray',
        age: [1, 2],
        nbsPlayers: [3, 6],
        ressourcesCost: [],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [7] }],
        links: []
    }
]

const blueCards = [
    // Âge 1
    {
        id: 17,
        name: 'Prêteur sur gages',
        color: 'blue',
        age: [1],
        nbsPlayers: [4, 7],
        ressourcesCost: [],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'victoryPoints', apply: ['own'], value: 3 }],
        links: []
    },
    {
        id: 18,
        name: 'Bains',
        color: 'blue',
        age: [1],
        nbsPlayers: [3, 7],
        ressourcesCost: [3],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'victoryPoints', apply: ['own'], value: 3 }],
        links: [21]
    },
    {
        id: 19,
        name: 'Autel',
        color: 'blue',
        age: [1],
        nbsPlayers: [3, 5],
        ressourcesCost: [],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'victoryPoints', apply: ['own'], value: 2 }],
        links: [22]
    },
    {
        id: 20,
        name: 'Théâtre',
        color: 'blue',
        age: [1],
        nbsPlayers: [3, 6],
        ressourcesCost: [],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'victoryPoints', apply: ['own'], value: 2 }],
        links: [23]
    },

    // Âge 2
    {
        id: 21,
        name: 'Aqueduc',
        color: 'blue',
        age: [2],
        nbsPlayers: [3, 7],
        ressourcesCost: [3, 3, 3],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'victoryPoints', apply: ['own'], value: 5 }],
        links: []
    },
    {
        id: 22,
        name: 'Temple',
        color: 'blue',
        age: [2],
        nbsPlayers: [3, 6],
        ressourcesCost: [4, 1, 5],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'victoryPoints', apply: ['own'], value: 3 }],
        links: [25]
    },
    {
        id: 23,
        name: 'Statue',
        color: 'blue',
        age: [2],
        nbsPlayers: [3, 7],
        ressourcesCost: [2, 2, 4],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'victoryPoints', apply: ['own'], value: 4 }],
        links: [26]
    },
    {
        id: 24,
        name: 'Tribunal',
        color: 'blue',
        age: [2],
        nbsPlayers: [3, 5],
        ressourcesCost: [1, 1, 6],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'victoryPoints', apply: ['own'], value: 4 }],
        links: []
    },

    // Âge 3
    {
        id: 25,
        name: 'Panthéon',
        color: 'blue',
        age: [3],
        nbsPlayers: [3, 6],
        ressourcesCost: [1, 1, 2, 7, 6, 5],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'victoryPoints', apply: ['own'], value: 7 }],
        links: []
    },
    {
        id: 26,
        name: 'Jardins',
        color: 'blue',
        age: [3],
        nbsPlayers: [3, 4],
        ressourcesCost: [1, 1, 4],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'victoryPoints', apply: ['own'], value: 5 }],
        links: []
    },
    {
        id: 27,
        name: 'Hôtel de ville',
        color: 'blue',
        age: [3],
        nbsPlayers: [3, 5, 6],
        ressourcesCost: [3, 3, 2, 5],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'victoryPoints', apply: ['own'], value: 6 }],
        links: []
    },
    {
        id: 28,
        name: 'Palace',
        color: 'blue',
        age: [3],
        nbsPlayers: [3, 7],
        ressourcesCost: [1, 4, 2, 3, 5, 7, 6],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'victoryPoints', apply: ['own'], value: 8 }],
        links: []
    },
    {
        id: 29,
        name: 'Sénat',
        color: 'blue',
        age: [3],
        nbsPlayers: [3, 5],
        ressourcesCost: [4, 4, 2, 3],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'victoryPoints', apply: ['own'], value: 6 }],
        links: []
    }
]

const redCards = [

    // Âge 1
    {
        id: 30,
        name: 'Palissage',
        color: 'red',
        age: [1],
        nbsPlayers: [3, 7],
        ressourcesCost: [4],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'war', apply: ['own'], value: 1 }],
        links: []
    },
    {
        id: 31,
        name: 'Caserne',
        color: 'red',
        age: [1],
        nbsPlayers: [3, 5],
        ressourcesCost: [2],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'war', apply: ['own'], value: 1 }],
        links: []
    },
    {
        id: 32,
        name: 'Palissage',
        color: 'red',
        age: [1],
        nbsPlayers: [3, 4],
        ressourcesCost: [1],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'war', apply: ['own'], value: 1 }],
        links: []
    },

    // Âge 2
    {
        id: 33,
        name: 'Muraille',
        color: 'red',
        age: [2],
        nbsPlayers: [3, 7],
        ressourcesCost: [3, 3, 3],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'war', apply: ['own'], value: 2 }],
        links: [37]
    },
    {
        id: 34,
        name: 'Place d\'armes',
        color: 'red',
        age: [2],
        nbsPlayers: [4, 6, 7],
        ressourcesCost: [2, 2, 4],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'war', apply: ['own'], value: 2 }],
        links: [38]
    },
    {
        id: 35,
        name: 'Écuries',
        color: 'red',
        age: [2],
        nbsPlayers: [3, 5],
        ressourcesCost: [2, 1, 4],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'war', apply: ['own'], value: 2 }],
        links: []
    },
    {
        id: 36,
        name: 'Champs de tir',
        color: 'red',
        age: [2],
        nbsPlayers: [3, 6],
        ressourcesCost: [4, 4, 2],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'war', apply: ['own'], value: 2 }],
        links: []
    },

    // Âge 3
    {
        id: 37,
        name: 'Fortifications',
        color: 'red',
        age: [3],
        nbsPlayers: [3, 7],
        ressourcesCost: [2, 2, 2, 3],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'war', apply: ['own'], value: 3 }],
        links: []
    },
    {
        id: 38,
        name: 'Cirque',
        color: 'red',
        age: [3],
        nbsPlayers: [4, 5, 6],
        ressourcesCost: [3, 3, 3, 2],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'war', apply: ['own'], value: 3 }],
        links: []
    },
    {
        id: 39,
        name: 'Arsenal',
        color: 'red',
        age: [3],
        nbsPlayers: [3, 4, 7],
        ressourcesCost: [2, 4, 4, 6],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'war', apply: ['own'], value: 3 }],
        links: []
    },
    {
        id: 40,
        name: 'Atelier de siège',
        color: 'red',
        age: [3],
        nbsPlayers: [3, 5],
        ressourcesCost: [4, 1, 1, 1],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'war', apply: ['own'], value: 3 }],
        links: []
    }
]

const yellowCards = [    
    {
        id: 41,
        name: 'Taverne',
        color: 'yellow',
        age: [1],
        nbsPlayers: [4, 5, 7],
        ressourcesCost: [],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'money', apply: ['own'], value: 5 }],
        links: []
    },
    {
        id: 42,
        name: 'Comptoir Est',
        color: 'yellow',
        age: [1],
        nbsPlayers: [3, 7],
        ressourcesCost: [],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'reduction', apply: ['right'], ressources: [1, 2, 3, 4], value: 1 }],
        links: [45]
    },
    {
        id: 43,
        name: 'Comptoir Ouest',
        color: 'yellow',
        age: [1],
        nbsPlayers: [3, 7],
        ressourcesCost: [],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'reduction', apply: ['left'], ressources: [1, 2, 3, 4], value: 1 }],
        links: [45]
    },
    {
        id: 44,
        name: 'Marché',
        color: 'yellow',
        age: [1],
        nbsPlayers: [3, 6],
        ressourcesCost: [],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'reduction', apply: ['left', 'right'], ressources: [5, 6, 7], value: 1 }],
        links: [46]
    },

    // Âge 2    
    {
        id: 45,
        name: 'Forum',
        color: 'yellow',
        age: [2],
        nbsPlayers: [3, 6, 7],
        ressourcesCost: [1, 1],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [5, 6, 7], operator: 'or' }],
        links: [49]
    },
    {
        id: 46,
        name: 'Caravansérail',
        color: 'yellow',
        age: [2],
        nbsPlayers: [3, 5, 6],
        ressourcesCost: [4, 4],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [1, 2, 3, 4], operator: 'or' }],
        links: [50]
    },
    {
        id: 47,
        name: 'Vignoble',
        color: 'yellow',
        age: [2],
        nbsPlayers: [3, 6],
        ressourcesCost: [],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'cardColor', apply: ['own', 'left', 'right'], coins: 1, color: 'brown' }],
        links: []
    },
    {
        id: 48,
        name: 'Bazar',
        color: 'yellow',
        age: [2],
        nbsPlayers: [4, 7],
        ressourcesCost: [],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'cardColor', apply: ['own', 'left', 'right'], coins: 2, color: 'gray' }],
        links: []
    },

    // Âge 3
    {
        id: 49,
        name: 'Port',
        color: 'yellow',
        age: [3],
        nbsPlayers: [3, 4],
        ressourcesCost: [4, 2, 6],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'cardColor', apply: ['own'], coins: 1, victoryPoint: 1, color: 'brown' }],
        links: []
    },
    {
        id: 50,
        name: 'Phare',
        color: 'yellow',
        age: [3],
        nbsPlayers: [3, 6],
        ressourcesCost: [3, 5],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'cardColor', apply: ['own'], coins: 1, victoryPoint: 1, color: 'yellow' }],
        links: []
    },
    {
        id: 51,
        name: 'Chambre de commerce',
        color: 'yellow',
        age: [3],
        nbsPlayers: [4, 6],
        ressourcesCost: [1, 1, 7],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'cardColor', apply: ['own'], coins: 2, victoryPoint: 2, color: 'gray' }],
        links: []
    },
    {
        id: 75,
        name: 'Arène',
        color: 'yellow',
        age: [3],
        nbsPlayers: [3, 5, 6],
        ressourcesCost: [3, 3,2],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'step', apply: ['own'], coins: 1, victoryPoint: 1}],
        links: []
    }
]

const greenCards = [
    // Âge 1
    {
        id: 52,
        name: 'Officine',
        color: 'green',
        age: [1],
        nbsPlayers: [3, 5],
        ressourcesCost: [6],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'scientific', apply: ['own'], symbols: [1] }],
        links: [35, 55]
    },
    {
        id: 53,
        name: 'Atelier',
        color: 'green',
        age: [1],
        nbsPlayers: [3, 7],
        ressourcesCost: [5],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'scientific', apply: ['own'], symbols: [2] }],
        links: [36, 56]
    },
    {
        id: 54,
        name: 'Scriptorium',
        color: 'green',
        age: [1],
        nbsPlayers: [3, 4],
        ressourcesCost: [7],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'scientific', apply: ['own'], symbols: [3] }],
        links: [24, 57]
    },

    // Âge 2
    {
        id: 55,
        name: 'Dispensaire',
        color: 'green',
        age: [2],
        nbsPlayers: [3, 4],
        ressourcesCost: [2, 2, 5],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'scientific', apply: ['own'], symbols: [1] }],
        links: [51, 59]
    },
    {
        id: 56,
        name: 'Laboratoire',
        color: 'green',
        age: [2],
        nbsPlayers: [3, 5],
        ressourcesCost: [1, 1, 7],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'scientific', apply: ['own'], symbols: [2] }],
        links: [40, 60]
    },
    {
        id: 57,
        name: 'Bibliothèque',
        color: 'green',
        age: [2],
        nbsPlayers: [3, 6],
        ressourcesCost: [3, 3, 6],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'scientific', apply: ['own'], symbols: [3] }],
        links: [29, 61]
    },
    {
        id: 58,
        name: 'École',
        color: 'green',
        age: [2],
        nbsPlayers: [3, 7],
        ressourcesCost: [4, 7],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'scientific', apply: ['own'], symbols: [3] }],
        links: [62, 63]
    },

    // Âge 3
    {
        id: 59,
        name: 'Loge',
        color: 'green',
        age: [3],
        nbsPlayers: [3, 6],
        ressourcesCost: [1, 1, 6, 7],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'scientific', apply: ['own'], symbols: [1] }],
        links: []
    },
    {
        id: 60,
        name: 'Observatoire',
        color: 'green',
        age: [3],
        nbsPlayers: [3, 7],
        ressourcesCost: [2, 2, 5, 6],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'scientific', apply: ['own'], symbols: [2] }],
        links: []
    },
    {
        id: 61,
        name: 'Université',
        color: 'green',
        age: [3],
        nbsPlayers: [3, 4],
        ressourcesCost: [4, 4, 7, 5],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'scientific', apply: ['own'], symbols: [3] }],
        links: []
    },
    {
        id: 62,
        name: 'Académie',
        color: 'green',
        age: [3],
        nbsPlayers: [3, 7],
        ressourcesCost: [3, 3, 3, 5],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'scientific', apply: ['own'], symbols: [1] }],
        links: []
    },
    {
        id: 63,
        name: 'Étude',
        color: 'green',
        age: [3],
        nbsPlayers: [3, 5],
        ressourcesCost: [4, 7, 6],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'scientific', apply: ['own'], symbols: [2] }],
        links: []
    }
]

const purpleCards = [
    {
        id: 64,
        name: 'Guilde des travailleurs',
        color: 'purple',
        age: [3],
        nbsPlayers: [3],
        ressourcesCost: [2, 2, 1, 3, 4],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'cardColor', apply: ['left', 'right'], victoryPoint: 1, color: 'brown' }],
        links: []
    },
    {
        id: 65,
        name: 'Guilde des artisans',
        color: 'purple',
        age: [3],
        nbsPlayers: [3],
        ressourcesCost: [2, 2, 3, 3],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'cardColor', apply: ['left', 'right'], victoryPoint: 2, color: 'grey' }],
        links: []
    },
    {
        id: 66,
        name: 'Guilde des commerçants',
        color: 'purple',
        age: [3],
        nbsPlayers: [3],
        ressourcesCost: [6, 7, 5],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'cardColor', apply: ['left', 'right'], victoryPoint: 1, color: 'yellow' }],
        links: []
    },
    {
        id: 67,
        name: 'Guilde des philosophes',
        color: 'purple',
        age: [3],
        nbsPlayers: [3],
        ressourcesCost: [1, 1, 1, 6, 7],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'cardColor', apply: ['left', 'right'], victoryPoint: 1, color: 'green' }],
        links: []
    },
    {
        id: 68,
        name: 'Guilde des espions',
        color: 'purple',
        age: [3],
        nbsPlayers: [3],
        ressourcesCost: [1, 1, 1, 5],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'cardColor', apply: ['left', 'right'], victoryPoint: 1, color: 'red' }],
        links: []
    },
    {
        id: 69,
        name: 'Guilde des stratèges',
        color: 'purple',
        age: [3],
        nbsPlayers: [3],
        ressourcesCost: [2, 2, 3, 6],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'defeat', apply: ['left', 'right'], victoryPoint: 1 }],
        links: []
    },
    {
        id: 70,
        name: 'Guilde des armateurs',
        color: 'purple',
        age: [3],
        nbsPlayers: [3],
        ressourcesCost: [4, 4, 4, 7, 5],
        coinsCost: 0,
        image: '',
        effects: [
            { type: 'cardColor', apply: ['own'], victoryPoint: 1, color: 'brown' },
            { type: 'cardColor', apply: ['own'], victoryPoint: 1, color: 'gray' },
            { type: 'cardColor', apply: ['own'], victoryPoint: 1, color: 'purple' }
        ],
        links: []
    },
    {
        id: 71,
        name: 'Guilde des scientifiques',
        color: 'purple',
        age: [3],
        nbsPlayers: [3],
        ressourcesCost: [4, 4, 2, 2, 7],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'scientific', apply: ['own'], symbols: [1, 2, 3], operator: 'or' }],
        links: []
    },
    {
        id: 72,
        name: 'Guilde des magistrats',
        color: 'purple',
        age: [3],
        nbsPlayers: [3],
        ressourcesCost: [4, 4, 4, 3, 6],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'cardColor', apply: ['left', 'right'], victoryPoint: 1, color: 'blue' }],
        links: []
    },
    {
        id: 73,
        name: 'Guilde des bâtisseurs',
        color: 'purple',
        age: [3],
        nbsPlayers: [3],
        ressourcesCost: [3, 3, 1, 1, 5],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'step', apply: ['own', 'left', 'right'], victoryPoint: 1 }],
        links: []
    }
];

const cards = [
    ...brownCards,
    ...greyCards,
    ...blueCards,
    ...redCards,
    ...yellowCards,
    ...greenCards,
    ...purpleCards
]

export const getListCards = (filterFn) => {
    return filterFn ? cards.filter(filterFn) : cards;
}

export const getCard = (id) => {
    const result = cards.filter(card => card.id === id)
    return result.length === 1 ? result[0] : null;
}

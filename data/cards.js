const cards = [
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
        name: 'Bains',
        color: 'blue',
        age: [1],
        nbsPlayers: [3, 7],
        ressourcesCost: [3],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'victoryPoints', apply: ['own'], value: 3 }],
        links: [4]
    },
    {
        id: 4,
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
        id: 5,
        name: 'Friche',
        color: 'brown',
        age: [1],
        nbsPlayers: [6],
        ressourcesCost: [],
        coinsCost: 1,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [1, 4], operator: 'or' }],
        links: []
    },
    {
        id: 6,
        name: 'Fonderie',
        color: 'brown',
        age: [2],
        nbsPlayers: [3, 4],
        ressourcesCost: [],
        coinsCost: 1,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [2, 2], operator: 'and' }],
        links: []
    },
    {
        id: 7,
        name: 'Forum',
        color: 'yellow',
        age: [2],
        nbsPlayers: [3, 6, 7],
        ressourcesCost: [1, 1],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [5, 6, 7], operator: 'or' }],
        links: [18]
    },
    {
        id: 8,
        name: 'Caravansérail',
        color: 'yellow',
        age: [2],
        nbsPlayers: [3, 5, 6],
        ressourcesCost: [4, 4],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'ressources', apply: ['own'], ressources: [1, 2, 3, 4], operator: 'or' }],
        links: []
    },
    {
        id: 9,
        name: 'Atelier',
        color: 'green',
        age: [1],
        nbsPlayers: [3, 7],
        ressourcesCost: [5],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'scientific', apply: ['own'], symbols: [2] }],
        links: [10, 11]
    },
    {
        id: 10,
        name: 'Laboratoire',
        color: 'green',
        age: [2],
        nbsPlayers: [3, 5],
        ressourcesCost: [1, 1, 7],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'scientific', apply: ['own'], symbols: [2] }],
        links: []
    },
    {
        id: 11,
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
    {
        id: 12,
        name: 'Comptoir Est',
        color: 'yellow',
        age: [1],
        nbsPlayers: [3, 7],
        ressourcesCost: [],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'reduction', apply: ['right'], ressources: [1, 2, 3, 4], value: 1 }],
        links: [7]
    },
    {
        id: 13,
        name: 'Comptoir Ouest',
        color: 'yellow',
        age: [1],
        nbsPlayers: [3, 7],
        ressourcesCost: [],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'reduction', apply: ['left'], ressources: [1, 2, 3, 4], value: 1 }],
        links: [7]
    },
    {
        id: 13,
        name: 'Marché',
        color: 'yellow',
        age: [1],
        nbsPlayers: [3, 6],
        ressourcesCost: [],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'reduction', apply: ['left', 'right'], ressources: [5, 6, 7], value: 1 }],
        links: [8]
    },
    {
        id: 14,
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
    },
    {
        id: 17,
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
        id: 18,
        name: 'Port',
        color: 'yellow',
        age: [3],
        nbsPlayers: [3, 4],
        ressourcesCost: [4, 2, 6],
        coinsCost: 0,
        image: '',
        effects: [{ type: 'cardColor', apply: ['own'], coins: 1, victoryPoint: 1, color: 'brown' }],
        links: []
    }
]

export const getListCards = (filterFn) => {
    return filterFn ? cards.filter(filterFn) : cards;
}

export const getCard = (id) => {
    const result = cards.filter(card => card.id === id)
    return result.length === 1 ? result[0] : null;
}

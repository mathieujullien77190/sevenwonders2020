const wonders = [
    {
        id: 1,
        name: 'Alexandrie',
        face: 'B',
        images: '',
        advantageRessource: 5,
        advantageCoins: 0,
        order: true,
        steps: [
            {
                ressourcesCost: [1, 1],
                coinsCost: 0,
                effects: [{ type: 'ressources', apply: ['own'], ressources: [1, 2, 3, 4], operator: 'or' }],
            },
            {
                ressourcesCost: [4, 4],
                coinsCost: 0,
                effects: [{ type: 'ressources', apply: ['own'], ressources: [5, 6, 7], operator: 'or' }],
            },
            {
                ressourcesCost: [3, 3, 3],
                coinsCost: 0,
                effects: [{ type: 'victoryPoints', apply: ['own'], value: 7 }],
            }
        ]
    },
    {
        id: 2,
        name: 'Alexandrie',
        face: 'A',
        images: '',
        advantageRessource: 5,
        advantageCoins: 0,
        order: true,
        steps: [
            {
                ressourcesCost: [3, 3],
                coinsCost: 0,
                effects: [{ type: 'victoryPoints', apply: ['own'], value: 3 }],
            },
            {
                ressourcesCost: [2, 2],
                coinsCost: 0,
                effects: [{ type: 'ressources', apply: ['own'], ressources: [1, 2, 3, 4], operator: 'or' }],
            },
            {
                ressourcesCost: [5, 5],
                coinsCost: 0,
                effects: [{ type: 'victoryPoints', apply: ['own'], value: 7 }],
            }
        ]
    },
    {
        id: 3,
        name: 'Manneken Pis',
        face: 'B',
        images: '',
        advantageCoins: 4,
        order: true,
        steps: [
            {
                ressourcesCost: [1, 2, 3, 4, 5, 6, 7],
                coinsCost: 0,
                effects: [
                    { type: 'victoryPoints', apply: ['own'], value: 7 },
                    { type: 'money', apply: ['own'], value: 7 },
                    { type: 'war', apply: ['own'], value: 1 }
                ],
            }
        ]
    },
    {
        id: 4,
        name: 'Gizeh',
        face: 'B',
        images: '',
        advantageRessource: 3,
        advantageCoins: 0,
        order: true,
        steps: [
            {
                ressourcesCost: [4, 4],
                coinsCost: 0,
                effects: [
                    { type: 'victoryPoints', apply: ['own'], value: 3 }
                ]
            },
            {
                ressourcesCost: [3, 3, 3],
                coinsCost: 0,
                effects: [
                    { type: 'victoryPoints', apply: ['own'], value: 5 },
                ],
            },
            {
                ressourcesCost: [1, 1, 1],
                coinsCost: 0,
                effects: [
                    { type: 'victoryPoints', apply: ['own'], value: 5 },
                ],
            },
            {
                ressourcesCost: [3, 3, 3, 3, 7],
                coinsCost: 0,
                effects: [
                    { type: 'victoryPoints', apply: ['own'], value: 7 },
                ],
            }
        ]
    }

]

export const getListWonders = (filterFn) => {
    return filterFn ? wonders.filter(filterFn) : wonders;
}

export const getWonder = (id) => {
    const result = wonders.filter(wonder => wonder.id === id)
    return result.length === 1 ? result[0] : null;
}

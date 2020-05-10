const wonders = [
    {
        id: 1,
        name: 'Rhodes',
        face: 'A',
        images: '',
        mainEffects: [{ type: 'ressources', apply: ['own'], ressources: [2], operator: 'and' }],
        order: true,
        steps: [
            {
                id: 1,
                ressourcesCost: [2],
                coinsCost: 0,
                effects: [{ type: 'victoryPoints', apply: ['own'], value: 3 }]
            },
            {
                id: 2,
                ressourcesCost: [1, 1, 1],
                coinsCost: 0,
                effects: [{ type: 'war', apply: ['own'], value: 2 }]
            },
            {
                id: 3,
                ressourcesCost: [2, 2],
                coinsCost: 0,
                effects: [{ type: 'victoryPoints', apply: ['own'], value: 7 }]
            }
        ]
    },
    {
        id: 2,
        name: 'Rhodes',
        face: 'B',
        images: '',
        mainEffects: [{ type: 'ressources', apply: ['own'], ressources: [2], operator: 'and' }],
        order: true,
        steps: [
            {
                id: 1,
                ressourcesCost: [3, 3, 3],
                coinsCost: 0,
                effects: [
                    { type: 'war', apply: ['own'], value: 1 },
                    { type: 'money', apply: ['own'], value: 3 },
                    { type: 'victoryPoints', apply: ['own'], value: 3 }
                ]
            },
            {
                id: 2,
                ressourcesCost: [2, 2, 2, 2],
                coinsCost: 0,
                effects: [
                    { type: 'war', apply: ['own'], value: 1 },
                    { type: 'money', apply: ['own'], value: 4 },
                    { type: 'victoryPoints', apply: ['own'], value: 4 }
                ]
            }
        ]
    },
    {
        id: 3,
        name: 'Alexandrie',
        face: 'A',
        images: '',
        mainEffects: [{ type: 'ressources', apply: ['own'], ressources: [5], operator: 'and' }],
        order: true,
        steps: [
            {
                id: 1,
                ressourcesCost: [3, 3],
                coinsCost: 0,
                effects: [{ type: 'victoryPoints', apply: ['own'], value: 3 }]
            },
            {
                id: 2,
                ressourcesCost: [2, 2],
                coinsCost: 0,
                effects: [{ type: 'ressources', apply: ['own'], ressources: [1, 2, 3, 4], operator: 'or' }]
            },
            {
                id: 3,
                ressourcesCost: [5, 5],
                coinsCost: 0,
                effects: [{ type: 'victoryPoints', apply: ['own'], value: 7 }]
            }
        ]
    },
    {
        id: 4,
        name: 'Alexandrie',
        face: 'B',
        images: '',
        mainEffects: [{ type: 'ressources', apply: ['own'], ressources: [5], operator: 'and' }],
        order: true,
        steps: [
            {
                id: 1,
                ressourcesCost: [1, 1],
                coinsCost: 0,
                effects: [{ type: 'ressources', apply: ['own'], ressources: [1, 2, 3, 4], operator: 'or' }]
            },
            {
                id: 2,
                ressourcesCost: [4, 4],
                coinsCost: 0,
                effects: [{ type: 'ressources', apply: ['own'], ressources: [5, 6, 7], operator: 'or' }]
            },
            {
                id: 3,
                ressourcesCost: [3, 3, 3],
                coinsCost: 0,
                effects: [{ type: 'victoryPoints', apply: ['own'], value: 7 }]
            }
        ]
    },
    {
        id: 5,
        name: 'Éphèse',
        face: 'A',
        images: '',
        mainEffects: [{ type: 'ressources', apply: ['own'], ressources: [7], operator: 'and' }],
        order: true,
        steps: [
            {
                id: 1,
                ressourcesCost: [3, 3],
                coinsCost: 0,
                effects: [{ type: 'victoryPoints', apply: ['own'], value: 3 }]
            },
            {
                id: 2,
                ressourcesCost: [4, 4],
                coinsCost: 0,
                effects: [{ type: 'money', apply: ['own'], value: 9 }]
            },
            {
                id: 3,
                ressourcesCost: [7, 7],
                coinsCost: 0,
                effects: [{ type: 'victoryPoints', apply: ['own'], value: 7 }]
            }
        ]
    },
    {
        id: 6,
        name: 'Éphèse',
        face: 'B',
        images: '',
        mainEffects: [{ type: 'ressources', apply: ['own'], ressources: [7], operator: 'and' }],
        order: true,
        steps: [
            {
                id: 1,
                ressourcesCost: [3, 3],
                coinsCost: 0,
                effects: [
                    { type: 'victoryPoints', apply: ['own'], value: 2 },
                    { type: 'money', apply: ['own'], value: 4 }
                ]
            },
            {
                id: 2,
                ressourcesCost: [4, 4],
                coinsCost: 0,
                effects: [
                    { type: 'victoryPoints', apply: ['own'], value: 3 },
                    { type: 'money', apply: ['own'], value: 4 }
                ]
            },
            {
                id: 3,
                ressourcesCost: [7, 6, 5],
                coinsCost: 0,
                effects: [
                    { type: 'victoryPoints', apply: ['own'], value: 5 },
                    { type: 'money', apply: ['own'], value: 4 }
                ]
            }
        ]
    },
    {
        id: 7,
        name: 'Babylone',
        face: 'A',
        images: '',
        mainEffects: [{ type: 'ressources', apply: ['own'], ressources: [1], operator: 'and' }],
        order: true,
        steps: [
            {
                id: 1,
                ressourcesCost: [1, 1],
                coinsCost: 0,
                effects: [{ type: 'victoryPoints', apply: ['own'], value: 3 }]
            },
            {
                id: 2,
                ressourcesCost: [4, 4, 4],
                coinsCost: 0,
                effects: [{ type: 'scientific', apply: ['own'], symbols: [1, 2, 3] }]
            },
            {
                id: 3,
                ressourcesCost: [1, 1, 1, 1],
                coinsCost: 0,
                effects: [{ type: 'victoryPoints', apply: ['own'], value: 7 }]
            }
        ]
    },
    {
        id: 8,
        name: 'Babylone',
        face: 'B',
        images: '',
        mainEffects: [{ type: 'ressources', apply: ['own'], ressources: [1], operator: 'and' }],
        order: true,
        steps: [
            {
                id: 1,
                ressourcesCost: [6, 1],
                coinsCost: 0,
                effects: [{ type: 'victoryPoints', apply: ['own'], value: 3 }]
            },
            {
                id: 2,
                ressourcesCost: [5, 4, 4],
                coinsCost: 0,
                effects: [{ type: 'dualPlay', apply: ['own'] }]
            },
            {
                id: 3,
                ressourcesCost: [1, 1, 1, 7],
                coinsCost: 0,
                effects: [{ type: 'scientific', apply: ['own'], symbols: [1, 2, 3] }]
            }
        ]
    },
    {
        id: 9,
        name: 'Olympia',
        face: 'A',
        images: '',
        mainEffects: [{ type: 'ressources', apply: ['own'], ressources: [4], operator: 'and' }],
        order: true,
        steps: [
            {
                id: 1,
                ressourcesCost: [4, 4],
                coinsCost: 0,
                effects: [{ type: 'victoryPoints', apply: ['own'], value: 3 }]
            },
            {
                id: 2,
                ressourcesCost: [3, 3],
                coinsCost: 0,
                effects: [{ type: 'freeLastCard', apply: ['own'] }]
            },
            {
                id: 3,
                ressourcesCost: [2, 2],
                coinsCost: 0,
                effects: [{ type: 'victoryPoints', apply: ['own'], value: 7 }]
            }
        ]
    },
    {
        id: 10,
        name: 'Olympia',
        face: 'B',
        images: '',
        mainEffects: [{ type: 'ressources', apply: ['own'], ressources: [4], operator: 'and' }],
        order: true,
        steps: [
            {
                id: 1,
                ressourcesCost: [4, 4],
                coinsCost: 0,
                effects: [{ type: 'reduction', apply: ['left', 'right'], ressources: [1, 3, 4, 2], value: 1 }]
            },
            {
                id: 2,
                ressourcesCost: [3, 3],
                coinsCost: 0,
                effects: [{ type: 'victoryPoints', apply: ['own'], value: 5 }]
            },
            {
                id: 3,
                ressourcesCost: [2, 2],
                coinsCost: 0,
                effects: [{ type: 'copyCardColor', apply: ['left', 'right'], color: 'purple' }]
            }
        ]
    },
    {
        id: 11,
        name: 'Halicarnasse',
        face: 'A',
        images: '',
        mainEffects: [{ type: 'ressources', apply: ['own'], ressources: [6], operator: 'and' }],
        order: true,
        steps: [
            {
                id: 1,
                ressourcesCost: [1, 1],
                coinsCost: 0,
                effects: [{ type: 'victoryPoints', apply: ['own'], value: 3 }]
            },
            {
                id: 2,
                ressourcesCost: [2, 2, 2],
                coinsCost: 0,
                effects: [{ type: 'pickCard', apply: ['own'] }]
            },
            {
                id: 3,
                ressourcesCost: [6, 6],
                coinsCost: 0,
                effects: [{ type: 'victoryPoints', apply: ['own'], value: 7 }]
            }
        ]
    },
    {
        id: 12,
        name: 'Halicarnasse',
        face: 'B',
        images: '',
        mainEffects: [{ type: 'ressources', apply: ['own'], ressources: [6], operator: 'and' }],
        order: true,
        steps: [
            {
                id: 1,
                ressourcesCost: [2, 2],
                coinsCost: 0,
                effects: [
                    { type: 'victoryPoints', apply: ['own'], value: 2 },
                    { type: 'pickCard', apply: ['own'] }
                ]
            },
            {
                id: 2,
                ressourcesCost: [1, 1, 1],
                coinsCost: 0,
                effects: [
                    { type: 'victoryPoints', apply: ['own'], value: 1 },
                    { type: 'pickCard', apply: ['own'] }
                ]
            },
            {
                id: 3,
                ressourcesCost: [5, 7, 6],
                coinsCost: 0,
                effects: [{ type: 'pickCard', apply: ['own'], value: 5 }]
            }
        ]
    },
    {
        id: 13,
        name: 'Gizeh',
        face: 'A',
        images: '',
        mainEffects: [{ type: 'ressources', apply: ['own'], ressources: [3], operator: 'and' }],
        order: true,
        steps: [
            {
                id: 1,
                ressourcesCost: [2, 2],
                coinsCost: 0,
                effects: [
                    { type: 'victoryPoints', apply: ['own'], value: 3 }
                ]
            },
            {
                id: 2,
                ressourcesCost: [4, 4, 4],
                coinsCost: 0,
                effects: [
                    { type: 'victoryPoints', apply: ['own'], value: 5 },
                ],
            },
            {
                id: 3,
                ressourcesCost: [3, 3, 3, 3],
                coinsCost: 0,
                effects: [
                    { type: 'victoryPoints', apply: ['own'], value: 7 },
                ],
            }
        ]
    },
    {
        id: 14,
        name: 'Gizeh',
        face: 'B',
        images: '',
        mainEffects: [{ type: 'ressources', apply: ['own'], ressources: [3], operator: 'and' }],
        order: true,
        steps: [
            {
                id: 1,
                ressourcesCost: [4, 4],
                coinsCost: 0,
                effects: [
                    { type: 'victoryPoints', apply: ['own'], value: 3 }
                ]
            },
            {
                id: 2,
                ressourcesCost: [3, 3, 3],
                coinsCost: 0,
                effects: [
                    { type: 'victoryPoints', apply: ['own'], value: 5 },
                ],
            },
            {
                id: 3,
                ressourcesCost: [1, 1, 1],
                coinsCost: 0,
                effects: [
                    { type: 'victoryPoints', apply: ['own'], value: 5 },
                ],
            },
            {
                id: 4,
                ressourcesCost: [7, 3, 3, 3, 3],
                coinsCost: 0,
                effects: [
                    { type: 'victoryPoints', apply: ['own'], value: 7 },
                ],
            }
        ]
    },

    // Extensions
    {
        id: 15,
        name: 'Manneken Pis',
        face: 'B',
        images: '',
        mainEffects: [{ type: 'money', apply: ['own'], value: 4 }],
        order: true,
        steps: [
            {
                id: 1,
                ressourcesCost: [2, 1, 5, 7, 6, 3, 4],
                coinsCost: 0,
                effects: [
                    { type: 'victoryPoints', apply: ['own'], value: 7 },
                    { type: 'money', apply: ['own'], value: 7 },
                    { type: 'war', apply: ['own'], value: 1 }
                ]
            }
        ]
    },
    {
        id: 16,
        name: 'Pietra',
        face: 'B',
        images: '',
        mainEffects: [{ type: 'ressources', apply: ['own'], ressources: [1], operator: 'and' }],
        order: true,
        steps: [
            {
                id: 1,
                ressourcesCost: [1, 2, 1, 2],
                coinsCost: 0,
                effects: [
                    { type: 'victoryPoints', apply: ['own'], value: 3 },
                    { type: 'moneyLost', apply: ['own'], value: 2 }
                ]
            },
            {
                id: 2,
                ressourcesCost: [],
                coinsCost: 14,
                effects: [
                    { type: 'victoryPoints', apply: ['own'], value: 14 }
                ]
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

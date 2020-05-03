const scientifics = [
    {
        id: 1,
        name: 'Compass',
        image: '',
    },
    {
        id: 2,
        name: 'wheel',
        image: '',
    },
    {
        id: 3,
        name: 'tablet',
        image: '',
    }

]

export const getListScientifics = () => {
    return scientifics;
}

export const getScientific = (id) => {
    const result = scientifics.filter(symbol => symbol.id === id)
    return result.length === 1 ? result[0] : null;
}
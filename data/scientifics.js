const scientifics = [
    {
        id: 1,
        name: 'Compas',
        image: '',
    },
    {
        id: 2,
        name: 'Roue',
        image: '',
    },
    {
        id: 3,
        name: 'Tablette',
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
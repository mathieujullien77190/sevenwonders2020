const ressources = [
    {
        id: 1,
        name: 'Clay',
        image: '',
        color: 'brown'
    },
    {
        id: 2,
        name: 'Ore',
        image: '',
        color: 'brown'
    },
    {
        id: 3,
        name: 'stone',
        image: '',
        color: 'brown'
    },
    {
        id: 4,
        name: 'Wood',
        image: '',
        color: 'brown'
    },
    {
        id: 5,
        name: 'Glass',
        image: '',
        color: 'gray'
    },
    {
        id: 6,
        name: 'Loom',
        image: '',
        color: 'gray'
    },
    {
        id: 7,
        name: 'Papyrus',
        image: '',
        color: 'gray'
    }

]

export const getListRessources = () => {
    return ressources;
}

export const getRessource = (id) => {
    const result = ressources.filter(ressource => ressource.id === id)
    return result.length === 1 ? result[0] : null;
}
const ressources = [
    {
        id: 1,
        name: 'Argile',
        image: '',
        color: 'brown'
    },
    {
        id: 2,
        name: 'Minerai',
        image: '',
        color: 'brown'
    },
    {
        id: 3,
        name: 'Pierre',
        image: '',
        color: 'brown'
    },
    {
        id: 4,
        name: 'Bois',
        image: '',
        color: 'brown'
    },
    {
        id: 5,
        name: 'Verre',
        image: '',
        color: 'gray'
    },
    {
        id: 6,
        name: 'Tissu',
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

export const toRessourceLabels = (idRessources) => {
    return idRessources.map(id => {
        const res = getRessource(id)
        return res ? res.name : null
    })
}
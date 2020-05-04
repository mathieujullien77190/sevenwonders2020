import { Mongo } from 'meteor/mongo';
import { Board } from '../model/Board'
import { Card } from '../model/Card'
import { allCards, getCard } from '../data/cards'
import { addObject, updateObject, getObject } from './mongoHelpers'


const ID = 1
const boardsMongo = new Mongo.Collection('boards')


export const getBoardsMongo = () => {
    return boardsMongo
}

export const getBoardMongo = () => {
    return getObject(ID, boardsMongo)
}

export const getBoardObj = () => {
    const mongoBoard = getObject(ID, boardsMongo)

    const baseConfig = { id: ID, allCards: allCards.map(card => new Card(card)) }

    const config = mongoBoard ? {
        ...baseConfig,
        ageCards: mongoBoard.ageCards.map(uniqId => getCard(uniqId)),
        age: mongoBoard.age,
        nbsPlayers: mongoBoard.nbsPlayers
    } : baseConfig

    return new Board(
        config,
        {
            update: (objectState) => {
                updateObject(objectState, boardsMongo)
            },
            create: (objectState) => {
                addObject(objectState, boardsMongo)
            }
        }
    )
}

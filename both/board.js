import { Mongo } from 'meteor/mongo';
import { Board } from '../model/Board'
import { Card } from '../model/Card'
import { getAllCards } from '../data/cards'
import { Player } from '../model/Player'
import { addObject, updateObject } from './mongoHelpers'

const allCards = getAllCards().map(card => new Card(card))
const ID = 1

const boardsMongo = new Mongo.Collection('boards')

const boardObj = new Board(
    { id: ID, allCards: allCards },
    {
        update: (objectState) => {
            updateObject(objectState, boardsMongo)
        },
        create: (objectState) => {
            addObject(objectState, boardsMongo)
        }
    }
)
boardObj.addPlayer(new Player({ pseudo: 'superMatou', id: 1 }))
boardObj.addPlayer(new Player({ pseudo: 'flopinouch', id: 2 }))
boardObj.addPlayer(new Player({ pseudo: 'momo', id: 3 }))


export const getBoardMongo = () => {
    return boardsMongo.findOne({ id: ID })
}

export const getBoardObj = () => {
    return boardObj
}

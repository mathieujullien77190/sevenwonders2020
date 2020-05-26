import { Boards } from '../both/collections';

export const initPublicationBoard = () => {
    Meteor.publish('board.current', () => {
        return Boards.find({})
    })
}

//{ fields: { 'id': false } }
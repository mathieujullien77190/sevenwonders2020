import { Boards } from '../both/collections';

export const initPublication = (idBoard) => {
    Meteor.publish('board.current', () => {
        return Boards.find({ id: idBoard })
    })
}
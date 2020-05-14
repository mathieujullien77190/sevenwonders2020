import { Boards, Players } from '../both/collections';

export const initPublication = (idBoard) => {
    Meteor.publish('board.current', () => {
        return Boards.find({ id: idBoard })
    })
    Meteor.publish('players', () => {
        return Players.find({}, { fields: { 'id': false } })
    })

}
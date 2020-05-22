import { Boards, Players } from '../both/collections';

export const initPublicationBoard = () => {
    Meteor.publish('board.current', () => {
        return Boards.find({})
    })
}

export const initPublicationPlayers = () => {
    Meteor.publish('players', () => {
        return Players.find({}, { fields: { 'id': false } })
    })
}
import { Boards, Players } from '../both/collections';

export const initPublicationBoard = () => {
    Meteor.publish('board.current', () => {
        return Boards.find({})
    })
    Meteor.publish('players.list', () => {
        return Players.find({}, { fields: { 'id': false, 'choiceCards': false, 'selectionCard': false } })
    })
    Meteor.publish(`player.me`, (id) => {
        return Players.find({ id: id })
    })
}
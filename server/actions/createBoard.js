import { Boards } from '../../both/collections'
import { Board } from '../../model/Board'

export const createBoard = () => {

    const listBoards = Boards.find().fetch()

    if (listBoards.length === 0) {
        const board = new Board({ id: 1 })
        Boards.insert(board)
        return { data: board, message: `Board numero ${board.id} créé` }
    } else {
        throw new Meteor.Error('Un board existe déjà')
    }

}
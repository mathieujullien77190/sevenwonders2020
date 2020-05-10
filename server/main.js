import { initPublication } from './publications.js'
import { getObject, addObject } from '../both/mongoHelpers'
import { Boards } from '../both/collections'
import { Board } from '../model/Board'

Meteor.startup(() => {

  const CURRENT_ID_BOARD = 43
  const currentBoard = getObject(CURRENT_ID_BOARD, Boards)

  if (!currentBoard) {
    const board = new Board({ id: CURRENT_ID_BOARD })
    addObject(board, Boards)
  }

  initPublication(CURRENT_ID_BOARD)

});

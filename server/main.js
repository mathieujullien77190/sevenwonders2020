import { initPublication } from './publications.js'
import { getObject, addObject } from '../both/mongoHelpers'
import { Boards } from '../both/collections'
import { Board } from '../model/Board'
import { initObserver } from './observer'

Meteor.startup(() => {

  const CURRENT_ID_BOARD = 91
  const currentBoard = getObject(CURRENT_ID_BOARD, Boards)

  if (!currentBoard) {
    const board = new Board({ id: CURRENT_ID_BOARD })
    addObject(board, Boards)
  }

  initPublication(CURRENT_ID_BOARD)
  initObserver(CURRENT_ID_BOARD)

});

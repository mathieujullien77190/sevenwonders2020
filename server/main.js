import { loadMethods } from './methods'
import { initObserver } from './observer'
import { initPublicationBoard } from './publications'
import { PlayersId } from './PlayersId'
import { Pseudos } from './Pseudos'
import { Boards } from '../both/collections'

_playersId = new PlayersId()
_pseudos = new Pseudos()

Meteor.startup(() => {
  Boards.remove({})

  initPublicationBoard()
  initObserver()
  loadMethods()


});


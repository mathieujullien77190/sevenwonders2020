import { loadMethods } from './methods'
import { initObserver } from './observer'
import { initPublicationBoard } from './publications'
import { Pseudos } from './Pseudos'
import { Wonders } from './Wonders'
import { Boards, Players } from '../both/collections'

_pseudos = new Pseudos()
_wonders = new Wonders()

Meteor.startup(() => {
  console.log('go 5')
  //Boards.remove({})
  //Players.remove({})

  initPublicationBoard()
  initObserver()
  loadMethods()
});


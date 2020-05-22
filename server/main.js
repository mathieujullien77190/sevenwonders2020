import { loadMethods } from './methods'
import { initObserver } from './observer'
import { initPublicationPlayers, initPublicationBoard } from './publications'

Meteor.startup(() => {
  initPublicationPlayers()
  initPublicationBoard()
  initObserver()
  loadMethods()
});


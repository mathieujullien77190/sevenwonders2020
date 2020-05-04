import { getBoardObj } from '../both/board'

Meteor.startup(() => {
  console.log('start')
  getBoardObj().init()
});

import { getBoardObj } from '../both/board'

Meteor.startup(() => {
  getBoardObj().init()
});

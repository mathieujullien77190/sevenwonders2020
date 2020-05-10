import 'bootstrap'
import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

import { Boards } from '../both/collections'


import '../templates/html/'
import '../templates/helpers/'
import './main.html'

if (Meteor.isDevelopment) {
    window.Boards = Boards
}

Meteor.startup(() => {

});

Template.accueil_template.onCreated(function () {
    this.subscribe('board.current');
});

Template.accueil_template.helpers({
    board() {
        return Boards.find().fetch()[0]
    }
});
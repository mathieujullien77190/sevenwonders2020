import { Template } from 'meteor/templating'
import { allCards } from '../../data/cards'
import { Card } from '../../model/Card'

Template.panelCards_template.helpers({
    cards() {
        return allCards.map(card => new Card(card))
    }
});
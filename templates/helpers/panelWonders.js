import { Template } from 'meteor/templating'
import { getListWonders } from '../../data/wonders'
import { Wonder } from '../../model/Wonder'

Template.panelWonders_template.helpers({
    wonders() {
        return getListWonders().map(wonder => new Wonder(wonder))
    }
});
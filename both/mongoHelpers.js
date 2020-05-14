import { Meteor } from 'meteor/meteor'

export const addObject = (object, collection, propTest) => {
    const prop = propTest ? propTest : 'id'
    const find = collection.find({ [prop]: object[prop] }).fetch();
    if (find.length === 0 && Meteor.isServer) {
        console.log('CREATE')
        collection.insert(object)
    }
}

export const updateObject = (object, collection) => {
    const select = collection.findOne({ id: object.id })
    if (select) {
        console.log('UPDATE', Meteor.isClient ? object : {})
        collection.update(select._id, object);
    }
}

export const getObject = (prop, value, collection) => {
    const select = collection.findOne({ [prop]: value })
    return select ? select : null
}


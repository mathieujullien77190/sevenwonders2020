import { Meteor } from 'meteor/meteor';

export const addObject = (object, collection) => {
    const find = collection.find({ id: object.id }).fetch();
    if (find.length === 0 && Meteor.isServer) {
        console.log('CREATE', object)
        collection.insert(object)
    }
}

export const updateObject = (object, collection) => {
    const select = collection.findOne({ id: object.id })
    if (select) {
        console.log('UPDATE', object)
        collection.update(select._id, object);
    }
}

export const getObject = (id, collection) => {
    const select = collection.findOne({ id: id })
    return select ? select : null
}


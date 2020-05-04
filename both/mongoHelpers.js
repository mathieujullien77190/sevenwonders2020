import { Meteor } from 'meteor/meteor';

export const addObject = (object, collection) => {

    const find = collection.find({ id: object.id }).fetch();

    if (find.length === 0) {
        if (Meteor.isServer) {
            console.log('CREATE', object)
            collection.insert(object)
        }
    } else {
        updateObject(object, collection)
    }

}

export const updateObject = (object, collection) => {
    const select = collection.findOne({ id: 1 })
    if (select) {
        console.log('UPDATE', object)
        collection.update(select._id, object);
    } else {
        console.error('Error : object not exist')
    }
}
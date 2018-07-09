import { Mongo } from 'meteor/mongo';

Meteor.methods({
    'users.insert': function(data) {
        Users.insert(data);
    },
    'users.remove': function(id) {
        Users.remove({ _id: id });
    },
    'users.update': function(id, data) {
        Users.update({ _id: id }, { ...data });
    }
});

export const Users = new Mongo.Collection('users');

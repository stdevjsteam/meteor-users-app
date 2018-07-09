import { Meteor } from 'meteor/meteor';
import { Users } from '../import/collections/users';

Meteor.startup(() => {
    Meteor.publish('users', function () {
        return Users.find({});
    });

    Meteor.publish('user', function (id) {
        return Users.find({ _id: id });
    })
});

import React, { Component } from 'react';
import UserForm from './User-form';
import PageTitle from './Page-title';
import { Users } from "../../import/collections/users";
import { withTracker } from 'meteor/react-meteor-data';


class EditUser extends Component {

    onSubmitHandler = (values, actions) => {
        const { id } = this.props.match.params;
        Meteor.call('users.update', id, values,  error => {
            if (error) {
                console.log('Error: ', error)
            } else {
                this.props.history.push('/users');
            }
        });
    };

    render() {
        const { user } = this.props;
        let userData = null;
        if( user[0]) userData = user[0];
        return (
            <div>
                <PageTitle>Edit User</PageTitle>
                { userData && <UserForm user={ userData }
                                        onSubmitHandler={ this.onSubmitHandler } /> }
            </div>
        );
    }
}

export default withTracker(props => {
    const { id } = props.match.params;
    Meteor.subscribe('user', id);

    return { user: Users.find({ _id: id }).fetch() };
})( EditUser );


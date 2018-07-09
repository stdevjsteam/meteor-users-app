import React, { Component } from 'react';
import UserForm from './User-form';
import PageTitle from './Page-title';



class AddUser extends Component {

    onSubmitHandler = (values, actions) => {
        Meteor.call('users.insert', values, error => {
            if (error) {
                console.log('Error: ', error)
            } else {
                this.props.history.push('/users');
            }
        });
    };

    render() {

        return (
            <div>
                <PageTitle>Add User</PageTitle>
                <UserForm onSubmitHandler={ this.onSubmitHandler } />
            </div>
        );
    }
}

export default AddUser;

import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch, withRouter } from 'react-router-dom';

import Users from './components/Users';
import User from './components/User';
import AddUser from './components/Add-user';
import EditUser from './components/Edit-user';
import Toolbar from './components/Toolbar';


class App extends Component {
    render() {
        return (
            <div>
                <Toolbar />
                <Switch>
                    <Route path="/users" exact component={ Users } />
                    <Route path="/users/add" exact component={ AddUser } />
                    <Route path="/users/:id" exact component={ User } />
                    <Route path="/users/:id/edit" exact component={ EditUser } />
                    <Redirect to="/users" />
                </Switch>
            </div>
        );
    }
}

const AppWithRouter = withRouter(App);

Meteor.startup(() => {
    const target =  document.querySelector(".container");
    const app = (
        <BrowserRouter>
            <AppWithRouter />
        </BrowserRouter>
    );
    render(app, target);
});

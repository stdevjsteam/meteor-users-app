import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import PageTitle from './Page-title';
import { Users } from '../../import/collections/users';
import { withTracker } from 'meteor/react-meteor-data';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        textAlign: 'center'
    },
    body: {
        textAlign: 'center',
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '80%',
        marginTop: theme.spacing.unit,
        marginRight: 'auto',
        marginLeft: 'auto',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
        cursor: 'pointer'
    },
    icon: {
        backgroundColor: 'rgb(240, 240, 240)',
        color: 'black',
        boxShadow: '4px 2px 8px -3px rgba(0,0,0,0.75)'
    },
    editIcon: {
        color: 'black'
    },
    deleteIcon: {
        color: '#ce0000'
    },
    action: {
        width: '80%',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 50,
    }
});


class UsersList extends Component {

    deleteUser = userId => {
        Meteor.call('users.remove', userId, error => {
            if (error) {
                console.log('Error: ', error)
            }
        });
    };

    userClickHandler = (event, userId) => {
        if (event.target.matches('td')) {
            const url = `/users/${userId}`;
            this.props.history.push(url);
        }
    };

    render() {
        const { classes, users } = this.props;
        if (!users) return null;

        return (
            <div>
                <PageTitle>Users</PageTitle>
                <div className={classes.action}>
                    <Link to="/users/add">
                        <IconButton className={classes.icon}>
                            <AddIcon />
                        </IconButton>
                    </Link>
                </div>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>#</CustomTableCell>
                                <CustomTableCell>First Name</CustomTableCell>
                                <CustomTableCell>Last Name</CustomTableCell>
                                <CustomTableCell>Mobile Number</CustomTableCell>
                                <CustomTableCell>Email</CustomTableCell>
                                <CustomTableCell>Actions</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => {
                                const { _id, firstName, lastName, mobileNumber, email } = user;
                                return (
                                    <TableRow key={_id}
                                              hover
                                              className={classes.row}
                                              onClick={ event => this.userClickHandler(event, _id) }>

                                        <CustomTableCell> { index + 1 }</CustomTableCell>
                                        <CustomTableCell>{ firstName }</CustomTableCell>
                                        <CustomTableCell>{ lastName }</CustomTableCell>
                                        <CustomTableCell>{ mobileNumber }</CustomTableCell>
                                        <CustomTableCell>{ email }</CustomTableCell>
                                        <CustomTableCell>
                                            <Link to={`/users/${_id}/edit`}>
                                                <IconButton className={classes.editIcon}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                            <IconButton className={classes.deleteIcon}
                                                        onClick={() => this.deleteUser(_id) } >

                                                <DeleteIcon />
                                            </IconButton>
                                        </CustomTableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}


export default withTracker(props => {
    Meteor.subscribe('users');

    return { users: Users.find({}).fetch() };
})( withStyles(styles)(UsersList) );

// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { Users } from '../../import/collections/users';
import { withTracker } from 'meteor/react-meteor-data';

const styles = {
    card: {
        minWidth: 275,
        maxWidth: 1000,
        marginTop: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 20
    },
    value: {
        marginBottom: 24,
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        marginBottom: 5,
        marginTop: 15,
        fontWeight: 'bold',
        fontSize: 16,
    },
    icon: {
        marginLeft: 'auto'
    }
};


// type Props = {
//     user: object,
//     classes: object
// };

class User extends Component {

    render() {
        const { classes, user } = this.props;
        if (!user || !Array.isArray(user) || !user[0]) return null;

        const { _id, firstName, lastName, mobileNumber, email } = user[0];
        return (
            <div>
                <Card className={classes.card}>

                    <CardActions>
                        <Link to={`/users/${_id}/edit`}>
                            <IconButton className={classes.icon}>
                                <EditIcon />
                            </IconButton>
                        </Link>
                    </CardActions>

                    <CardContent>
                        <div>
                            <Typography className={classes.title}>
                                First Name
                            </Typography>
                            <Typography className={classes.value} color="textSecondary">
                                { firstName }
                            </Typography>
                            <Divider />
                        </div>

                        <div>
                            <Typography className={classes.title}>
                                Last Name
                            </Typography>
                            <Typography className={classes.value} color="textSecondary">
                                { lastName }
                            </Typography>
                            <Divider />
                        </div>

                        <div>
                            <Typography className={classes.title}>
                                Mobile Number
                            </Typography>
                            <Typography className={classes.value} color="textSecondary">
                                { mobileNumber }
                            </Typography>
                            <Divider />
                        </div>

                        <div>
                            <Typography className={classes.title}>
                                Email
                            </Typography>
                            <Typography className={classes.value} color="textSecondary">
                                { email }
                            </Typography>
                        </div>
                    </CardContent>


                    <Button variant="contained"
                            className={classes.button}
                            component={Link} to="/users" >

                        Back
                    </Button>
                </Card>
            </div>
        );
    }
}

export default withTracker(props => {
    const { id } = props.match.params;
    Meteor.subscribe('user', id);

    return { user: Users.find({ _id: id }).fetch() };
})( withStyles(styles)(User) );

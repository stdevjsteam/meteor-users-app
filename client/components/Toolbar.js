import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
        flexGrow: 1,
    },
};

const toolbar = props => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        MeteorAppUsers
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};


export default withStyles(styles)( toolbar );

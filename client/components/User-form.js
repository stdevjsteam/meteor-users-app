import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import * as yup from 'yup';

const errorMessages = {
  required: 'The field is required',
  minLength: 'Minimum of 6 characters',
  email: 'Please type valid email'
};

const styles = theme => ({
    container: {

    },
    card: {
        minWidth: 275,
        maxWidth: 600,
        marginTop: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 30
    },
    textField: {
        width: '100%',
    },
    button: {
        marginTop: 30,
        fontWeight: 'bold'
    },
    actions: {
        justifyContent: 'flex-end'
    }
});

const Submit = props => <button type='submit' {...props}></button>;
const Input = props => (
    <React.Fragment>
        <TextField
            id={ props.field }
            label={ props.label }
            error={ Boolean( props.touched[props.field] && props.errors[props.field] )  }
            className={props.classes.textField}
            onChange={ props.handleChange }
            onBlur={props.handleBlur}
            value={props.values[props.field]}
            name={ props.field }
            margin="normal"
        />
        {props.touched[props.field] && props.errors[props.field] && <div className='error'>{props.errors[props.field]}</div>}
    </React.Fragment>
);

class UserForm extends Component {

    onCancelHandler = () => this.props.history.push('/users');

    render() {
        const { classes, user } = this.props;
        let initialValues = {
            firstName: '',
            lastName: '',
            mobileNumber: '',
            email: ''
        };
        if (user) {
            initialValues = {...user};
        }
        const validationSchema = yup.object().shape({
            firstName: yup.string().required(errorMessages.required),
            lastName: yup.string().required(errorMessages.required),
            mobileNumber: yup.string().required(errorMessages.required).min(6, errorMessages.minLength),
            email: yup.string().required(errorMessages.required).email(errorMessages.email)
        });
        return (
            <Formik  onSubmit={ this.props.onSubmitHandler }
                     validationSchema={ validationSchema }
                     initialValues={initialValues}
                     render={ props => {
                         const { handleSubmit } = props;
                         return (
                             <Card className={classes.card}>
                                 <CardContent>
                                     <form onSubmit={handleSubmit}
                                           className={classes.container}
                                           noValidate
                                           autoComplete="off">

                                         <Input field="firstName" label="First Name" classes={classes} {...props} />

                                         <Input field="lastName" label="Last Name" classes={classes} {...props} />

                                         <Input field="mobileNumber" label="Mobile Number" classes={classes} {...props} />

                                         <Input field="email" label="Email" classes={classes} {...props} />

                                         <CardActions className={classes.actions}>
                                             <Button variant="contained" onClick={ this.onCancelHandler } className={classes.button}>
                                                 Cancel
                                             </Button>

                                             <Button variant="contained" component={ Submit } className={classes.button}>
                                                 Save
                                             </Button>
                                         </CardActions>

                                     </form>
                                 </CardContent>

                             </Card>
                         );
                     } } />
        );
    }
}

export default withRouter(withStyles(styles)(UserForm));

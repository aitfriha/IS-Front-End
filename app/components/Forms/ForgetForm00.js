import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AllInclusive from '@material-ui/icons/AllInclusive';
import Brightness5 from '@material-ui/icons/Brightness5';
import People from '@material-ui/icons/People';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Hidden from '@material-ui/core/Hidden';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import { TextFieldRedux } from './ReduxFormMUI';
import styles from './user-jss';
import { ContentDivider } from '../Divider';

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email'
        : undefined
);

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
    return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

// eslint-disable-next-line
class ForgetForm extends React.Component {

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    render() {
        const {
            classes,
            handleSubmit,
            pristine,
            submitting,
            deco,
        } = this.props;

        return (
            <Fragment>
                <Hidden mdUp>
                    <NavLink to="/" className={classNames(classes.brand, classes.outer)}>
                        <img src="{logo}" alt={brand.name} />
                    </NavLink>
                </Hidden>
                <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>

                    <Typography variant="h4" className={classes.title} gutterBottom>
                        Sign In
                    </Typography>
                    <Typography variant="h4" className={classes.title} gutterBottom style={{ fontWeight: 'bold' }}>
                        Sistemas Internos
                    </Typography>

                    <section className={classes.formWrap}>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <FormControl className={classes.formControl}>
                                    <Field
                                        name="email"
                                        component={TextFieldRedux}
                                        placeholder="Your Email"
                                        label="Your Email"
                                        required
                                        validate={[required, email]}
                                        className={classes.field}
                                    />
                                </FormControl>
                            </div>
                            <div className={classes.btnArea}>
                                <Button variant="contained" color="primary" size="large" type="submit">
                                    Send
                                    <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                                </Button>
                            </div>
                        </form>
                    </section>
                </Paper>
            </Fragment>
        );
    }
}

ForgetForm.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    deco: PropTypes.bool.isRequired,
};

const LoginFormReduxed = reduxForm({
    form: 'immutableExample',
    enableReinitialize: true,
})(ForgetForm);

const reducerLogin = 'login';
const reducerUi = 'ui';
const FormInit = connect(
    state => ({
        force: state,
        initialValues: state.getIn([reducerLogin, 'usersLogin']),
        deco: state.getIn([reducerUi, 'decoration'])
    }),
)(LoginFormReduxed);

export default withStyles(styles)(FormInit);

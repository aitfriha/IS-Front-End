import React from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import styles from 'containers/Templates/appStyles-jss';
import { ErrorWrap } from 'dan-components';

class UnauthorizedDedicated extends React.Component {
    render() {
        const {
            classes, gradient, title, desc
        } = this.props;
        return (
            <div className={classNames(classes.appFrameOuter, gradient ? classes.gradientBg : classes.solidBg)}>
                <main className={classes.outerContent} id="mainContent">
                    <div className={classes.petal} />
                    <ErrorWrap title={title} desc={desc} />
                </main>
            </div>
        );
    }
}

UnauthorizedDedicated.propTypes = {
    classes: PropTypes.object.isRequired,
    gradient: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
};

const reducer = 'ui';
const mapStateToProps = state => ({
    gradient: state.getIn([reducer, 'gradient'])
});

export default (withStyles(styles)(connect(
    mapStateToProps,
)(UnauthorizedDedicated)));

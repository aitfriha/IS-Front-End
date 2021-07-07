import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Ionicon from 'react-ionicons';

const styles = {
  buttonSpacing: {
    minHeight: 90,
    minWidth: 200,
    textAlign: 'center'
  }
};

class MenuButtons extends React.Component {
  render() {
    const {
      classes, buttonPath, buttonTitle, color , icon,disabled
    } = this.props;
    return (
      <Button
        className={classes.buttonSpacing}
        variant="contained"
        size="large"
        disabled={disabled}
       /* component={Link}*/
       /* to={buttonPath}*/
        style={{ backgroundColor: color, color: '#fff' }}
        fullWidth
      >
        <span className={classes.iconTitle}>
          <Ionicon icon={icon} style={{ color: '#EDFRET', height: '60px', width: '100px' }} />
        </span>
        {buttonTitle}
      </Button>
    );
  }
}

MenuButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  buttonPath: PropTypes.string.isRequired,
  buttonTitle: PropTypes.any.isRequired
};
export default withStyles(styles)(MenuButtons);

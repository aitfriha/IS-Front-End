import { Button, LinearProgress, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import StepperComponent from './StepperComponent';

class StepperIndex extends Component {
  state = {
    percentage: 0,
    isShowStepper: false
  };

  handleNext = () => {
    const { percentage } = this.state;
    if (percentage < 100) {
      this.setState({
        percentage: percentage + 10
      });
    }
  };

  handlePrevious = () => {
    const { percentage } = this.state;

    if (percentage > 0) {
      this.setState({
        percentage: percentage - 10
      });
    }
  };

  handleShowStepper = () => {
    const { isShowStepper } = this.state;
    this.setState({
      isShowStepper: !isShowStepper
    });
  };

  render() {
    const { percentage, isShowStepper } = this.state;
    console.log('precentage ' + percentage);
    return (
      <div>
        {isShowStepper ? (
          <div>
            <StepperComponent percentage={percentage} />
            <Button onClick={this.handleShowStepper}>Back</Button>
          </div>
        ) : (
          <div>
            <LinearProgress
              variant="determinate"
              value={percentage}
              onClick={this.handleShowStepper}
            />
            <Typography variant="body2" color="textSecondary">
              {`${Math.round(percentage)}%`}
            </Typography>
          </div>
        )}
        <Button onClick={this.handlePrevious}>Previous</Button>
        <Button onClick={this.handleNext}>Next</Button>
      </div>
    );
  }
}

export default StepperIndex;

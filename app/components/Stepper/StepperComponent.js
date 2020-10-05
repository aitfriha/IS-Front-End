import {
  Step, StepContent, StepLabel, Stepper
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class StepperComponent extends Component {
  state = {
    mainActiveStep: 0,
    activeStep1: 0,
    activeStep2: -1,
    activeStep3: -1,
    activeStep4: -1
  };

  componentDidMount() {
    this.updateStepper();
  }

  componentDidUpdate(previousProps) {
    const { percentage } = this.props;
    console.log('received percentage ' + percentage);
    if (previousProps.percentage !== percentage) {
      this.updateStepper();
    }
  }

  updateStepper = () => {
    const { percentage } = this.props;
    switch (percentage) {
      case 0:
        this.setState({
          mainActiveStep: 0,
          activeStep1: 0,
          activeStep2: -1,
          activeStep3: -1,
          activeStep4: -1
        });
        break;
      case 10:
        this.setState({
          mainActiveStep: 0,
          activeStep1: 1,
          activeStep2: -1,
          activeStep3: -1,
          activeStep4: -1
        });

        break;
      case 20:
        this.setState({
          mainActiveStep: 1,
          activeStep1: 1,
          activeStep2: 0,
          activeStep3: -1,
          activeStep4: -1
        });
        break;
      case 30:
        this.setState({
          mainActiveStep: 1,
          activeStep1: 1,
          activeStep2: 1,
          activeStep3: -1,
          activeStep4: -1
        });
        break;
      case 40:
        this.setState({
          mainActiveStep: 1,
          activeStep1: 1,
          activeStep2: 2,
          activeStep3: -1,
          activeStep4: -1
        });
        break;
      case 50:
        this.setState({
          mainActiveStep: 2,
          activeStep1: 1,
          activeStep2: 2,
          activeStep3: 0,
          activeStep4: -1
        });
        break;
      case 60:
        this.setState({
          mainActiveStep: 2,
          activeStep1: 1,
          activeStep2: 2,
          activeStep3: 1,
          activeStep4: -1
        });
        break;
      case 70:
        this.setState({
          mainActiveStep: 2,
          activeStep1: 1,
          activeStep2: 2,
          activeStep3: 2,
          activeStep4: -1
        });
        break;
      case 80:
        this.setState({
          mainActiveStep: 3,
          activeStep1: 1,
          activeStep2: 2,
          activeStep3: 2,
          activeStep4: 0
        });
        break;
      case 90:
        this.setState({
          mainActiveStep: 3,
          activeStep1: 1,
          activeStep2: 2,
          activeStep3: 2,
          activeStep4: 1
        });
        break;
      case 100:
        this.setState({
          mainActiveStep: 3,
          activeStep1: 1,
          activeStep2: 2,
          activeStep3: 2,
          activeStep4: 2
        });
        break;
    }
  };

  mainSteps = ['Prospect', 'Qualification', 'Negociation', 'contract'];

  steps1 = ['Prospection', 'Commercial opportunity'];

  steps2 = [
    'Technical qualification',
    'Economical qualification',
    'Proposal presented'
  ];

  steps3 = [
    'Technical negociation',
    'Legal negociation',
    'Economical negociation '
  ];

  steps4 = ['Configuration of the commercial ...', 'Contract'];

  getStepContent = step => {
    console.log(step);
    const {
      activeStep1, activeStep2, activeStep3, activeStep4
    } = this.state;
    switch (step) {
      case 0:
        return (
          <Stepper
            activeStep={activeStep1}
            orientation="vertical"
            style={{ backgroundColor: 'transparent' }}
          >
            {this.steps1.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        );
      case 1:
        return (
          <Stepper
            activeStep={activeStep2}
            orientation="vertical"
            style={{ backgroundColor: 'transparent' }}
          >
            {this.steps2.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        );
      case 2:
        return (
          <Stepper
            activeStep={activeStep3}
            orientation="vertical"
            style={{ backgroundColor: 'transparent' }}
          >
            {this.steps3.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        );
      case 3:
        return (
          <Stepper
            activeStep={activeStep4}
            orientation="vertical"
            style={{ backgroundColor: 'transparent' }}
          >
            {this.steps4.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        );
      default:
        return 'Unknown step';
    }
  };

  render() {
    const { mainActiveStep } = this.state;
    return (
      <div>
        <Stepper
          activeStep={mainActiveStep}
          orientation="vertical"
          style={{ backgroundColor: 'transparent' }}
        >
          {this.mainSteps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>{this.getStepContent(index)}</StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
    );
  }
}

StepperComponent.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default StepperComponent;

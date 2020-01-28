import React from "react";
import Dialog from "@material-ui/core/Dialog";
import PropTypes from "prop-types";
import clsx from "clsx";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import MobileStepper from "@material-ui/core/MobileStepper";
import StepConnector from "@material-ui/core/StepConnector";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Check from "@material-ui/icons/Check";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PersonalDetailsForm from "../forms/PersonalDetailsForm";
import ContactDetailsForm from "../forms/ContactDetailsForm";
import ExtraDetailsForm from "../forms/ExtraDetailsForm";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateUsername,
  validateStreetAddress,
  validatePincode,
  validatePhoneNumber
} from "../validation";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 50
    //backgroundColor: theme.palette.background.default
  },
  mobileInstructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    alignSelf: "center"
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: "100%"
  }
}));

const getSteps = () => ["Personal Details", "Contact Details", "Extra Details"];

const Registration = props => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const { open, handleClose } = props;
  const steps = getSteps();

  const matches = useMediaQuery("(max-width:600px)");

  const [values, setValues] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
    streetAddress: "",
    streetAddress2: "",
    phoneNumber: "",
    expiryDate: new Date(),
    card: "",
    nameOnCard: "",
    file: null
  });

  const [errors, setErrors] = React.useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
    pincode: "",
    streetAddress: "",
    card: ""
  });

  const [visibility, setVisibility] = React.useState({
    password: false,
    confirmPassword: false
  });

  const validateByActiveStep = () => {
    switch (activeStep) {
      case 0: {
        const username = validateUsername(values.username);
        const email = validateEmail(values.email);
        const password = validatePassword(values.password);
        const confirmPassword = validateConfirmPassword(
          values.password,
          values.confirmPassword
        );
        console.log(confirmPassword);
        setErrors({
          ...errors,
          username,
          email,
          password,
          confirmPassword
        });
        return email || password || confirmPassword ? false : true;
      }
      case 1: {
        const streetAddress = validateStreetAddress(values.streetAddress);
        const pincode = errors.pincode.length
          ? errors.pincode
          : validatePincode(values.pincode);
        const phoneNumber = validatePhoneNumber(values.phoneNumber);
        setErrors({
          ...errors,
          streetAddress,
          pincode,
          phoneNumber
        });
        return streetAddress || pincode || phoneNumber ? false : true;
      }
      default: {
        break;
      }
    }
  };

  const handleNext = () => {
    if (!validateByActiveStep()) return;
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleFinish = () => {
    handleClose();
  };

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <PersonalDetailsForm
            values={values}
            errors={errors}
            visibility={visibility}
            setValues={setValues}
            setErrors={setErrors}
            setVisibility={setVisibility}
          />
        );
      case 1:
        return (
          <ContactDetailsForm
            values={values}
            errors={errors}
            setValues={setValues}
            setErrors={setErrors}
          />
        );
      case 2:
        return (
          <ExtraDetailsForm
            values={values}
            errors={errors}
            setValues={setValues}
            setErrors={setErrors}
          />
        );
      default:
        return "Unknown Step";
    }
  };

  const useQontoStepIconStyles = makeStyles(theme => ({
    root: {
      color: "#eaeaf0",
      display: "flex",
      height: 22,
      alignItems: "center"
    },
    active: {
      color: theme.palette.primary.main
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor"
    },
    completed: {
      color: theme.palette.primary.main,
      zIndex: 1,
      fontSize: 18
    }
  }));

  const QontoConnector = withStyles(theme => ({
    alternativeLabel: {
      top: 10,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)"
    },
    active: {
      "& $line": {
        borderColor: theme.palette.primary.main
      }
    },
    completed: {
      "& $line": {
        borderColor: theme.palette.primary.main
      }
    },
    line: {
      borderColor: "#eaeaf0",
      borderTopWidth: 3,
      borderRadius: 1
    }
  }))(StepConnector);

  function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active
        })}
      >
        {completed ? (
          <Check className={classes.completed} />
        ) : (
          <div className={classes.circle} />
        )}
      </div>
    );
  }

  QontoStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool
  };

  const renderStepper = () => (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <DialogTitle>Registration</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} connector={<QontoConnector />}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {getStepContent(activeStep)}
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button color="primary" onClick={handleFinish}>
            Finish
          </Button>
        ) : (
          <Button color="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );

  const renderMobileStepper = () => (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <DialogTitle>Registration</DialogTitle>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{steps[activeStep]}</Typography>
      </Paper>
      <DialogContent>{getStepContent(activeStep)}</DialogContent>
      <MobileStepper
        steps={steps.length}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={
          activeStep === steps.length - 1 ? (
            <Button color="primary" onClick={handleFinish}>
              Finish
            </Button>
          ) : (
            <Button color="primary" onClick={handleNext}>
              Next
            </Button>
          )
        }
        backButton={
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
        }
      />
    </Dialog>
  );

  return matches ? renderMobileStepper() : renderStepper();
};

export default Registration;

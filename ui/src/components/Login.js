import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  textField: {
    marginBottom: theme.spacing(2),
    width: "100%"
  },
  paper: {
    zIndex: 1,
    position: "relative",
    margin: theme.spacing(1)
  }
});

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    emailError: "",
    passwordError: ""
  };
  render() {
    const { classes, open, handleClose, startRegistration } = this.props;
    return (
      <Dialog
        maxWidth="xs"
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-login"
      >
        <DialogTitle id="form-dialog-login">Log In</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              className={classes.textField}
              label="Email"
              variant="outlined"
              value={this.state.email}
              helperText={this.state.emailError}
              error={this.state.emailError ? true : false}
              onChange={this.handleEmailChange}
            />
            <br />
            <TextField
              className={classes.textField}
              label="Password"
              type="password"
              variant="outlined"
              value={this.state.password}
              helperText={this.state.passwordError}
              error={this.state.passwordError ? true : false}
              onChange={this.handlePasswordChange}
            />
            <Button color="primary">Login</Button>
            <Button type="button" color="primary" onClick={startRegistration}>
              Register
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  handleEmailChange = event => {
    const email = event.target.value;
    const emailError = this.validateEmail(email);
    this.setState({ email, emailError });
  };
  handlePasswordChange = event => {
    const password = event.target.value;
    const passwordError = this.validatePassword(password);
    this.setState({ password, passwordError });
  };
  validateEmail = email => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email) ? "" : "Please enter a valid email";
  };
  validatePassword = password => {
    if (!/^(?=.*[a-z])/.test(password)) {
      return "The string must contain at least 1 lowercase alphabetical character";
    }
    if (!/^(?=.*[A-Z])/.test(password)) {
      return "The string must contain at least 1 uppercase alphabetical character";
    }
    if (!/^(?=.*[0-9])/.test(password)) {
      return "The string must contain at least 1 numeric character";
    }
    if (!/^(?=.*[!@#$%^&])/.test(password)) {
      return "The string must contain at least one special character";
    }
    if (!/^(?=.{8,})/.test(password))
      return "The string must be eight characters or longer";
  };
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);

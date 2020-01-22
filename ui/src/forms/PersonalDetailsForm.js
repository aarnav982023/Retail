import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword
} from "../validation";

const useStyles = makeStyles(theme => ({
  textField: {
    marginBottom: theme.spacing(2),
    width: "100%"
  }
}));

const PersonalDetailsForm = props => {
  const classes = useStyles();

  const {
    values,
    errors,
    visibility,
    setValues,
    setErrors,
    setVisibility
  } = props;

  const handleUsernameChange = event => {
    setValues({ ...values, username: event.target.value });
  };

  const handleEmailChange = event => {
    setValues({ ...values, email: event.target.value });
    setErrors({ ...errors, email: validateEmail(event.target.value) });
  };

  const handlePasswordChange = event => {
    setValues({ ...values, password: event.target.value });
    setErrors({
      ...errors,
      password: validatePassword(event.target.value),
      confirmPassword: validateConfirmPassword(
        event.target.value,
        values.confirmPassword
      )
    });
  };

  const handleConfirmPasswordChange = event => {
    setValues({ ...values, confirmPassword: event.target.value });
    setErrors({
      ...errors,
      confirmPassword: validateConfirmPassword(
        values.password,
        event.target.value
      )
    });
  };

  return (
    <form>
      <TextField
        className={classes.textField}
        label="Username"
        variant="outlined"
        value={values.username}
        onChange={handleUsernameChange}
      />
      <TextField
        className={classes.textField}
        label="Email"
        variant="outlined"
        value={values.email}
        helperText={errors.email}
        error={errors.email ? true : false}
        onChange={handleEmailChange}
      />
      <TextField
        className={classes.textField}
        label="Password"
        type={visibility.password ? "text" : "password"}
        variant="outlined"
        value={values.password}
        helperText={errors.password}
        error={errors.password ? true : false}
        onChange={handlePasswordChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {
                  setVisibility({
                    ...visibility,
                    password: !visibility.password
                  });
                }}
              >
                {visibility.password ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <TextField
        className={classes.textField}
        label="Confirm Password"
        type={visibility.confirmPassword ? "text" : "password"}
        variant="outlined"
        value={values.confirmPassword}
        helperText={errors.confirmPassword}
        error={errors.confirmPassword ? true : false}
        onChange={handleConfirmPasswordChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {
                  setVisibility({
                    ...visibility,
                    confirmPassword: !visibility.confirmPassword
                  });
                }}
              >
                {visibility.confirmPassword ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </form>
  );
};

export default PersonalDetailsForm;

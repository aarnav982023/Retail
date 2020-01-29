import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { validateEmail } from "../validation";
import RetailApi from "../apis/RetailApi";

const styles = makeStyles(theme => ({
  textField: {
    marginBottom: theme.spacing(2),
    width: "100%"
  },
  paper: {
    zIndex: 1,
    position: "relative",
    margin: theme.spacing(1)
  }
}));

const Login = props => {
  const classes = styles();

  const [values, setValues] = React.useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = React.useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const handleEmailChange = event => {
    setValues({ ...values, email: event.target.value });
    setErrors({ ...errors, email: validateEmail(event.target.value) });
  };
  const handlePasswordChange = event => {
    setValues({ ...values, password: event.target.value });
  };

  const { open, handleClose, startRegistration } = props;

  const login = async event => {
    console.log("in login");
    event.preventDefault();
    const response = await RetailApi.post("/users/login", {
      email: values.email,
      password: values.password
    });
    console.log(response);
  };

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
        <form onSubmit={login}>
          <TextField
            className={classes.textField}
            label="Email"
            variant="outlined"
            value={values.email}
            helperText={errors.email}
            error={errors.email ? true : false}
            onChange={handleEmailChange}
          />
          <br />
          <TextField
            className={classes.textField}
            label="Password"
            type={showPassword ? "text" : "password"}
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
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button type="submit" color="primary">
            Login
          </Button>
          <Button type="button" color="primary" onClick={startRegistration}>
            Register
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Login;

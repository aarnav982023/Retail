import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  textField: {
    marginBottom: theme.spacing(2),
    width: "100%"
  }
}));

const SignInDialog = ({ open, handleClose }) => {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        maxWidth="xs"
        fullWidth
        className={classes.dialog}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-login"
      >
        <DialogTitle id="form-dialog-login">Log In</DialogTitle>
        <DialogContent>
          <TextField
            className={classes.textField}
            label="Email"
            variant="outlined"
          />
          <br />
          <TextField
            className={classes.textField}
            label="Password"
            variant="outlined"
          />
          <Button color="primary">Login</Button>
          <Button color="primary">Register</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignInDialog;

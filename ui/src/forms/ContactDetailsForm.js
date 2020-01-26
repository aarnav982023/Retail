import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  textField: {
    marginBottom: theme.spacing(2),
    width: "100%"
  },
  pincode: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  city: {
    width: "100%"
  },
  state: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: "100%"
  },
  country: {
    width: "100%"
  },
  test: {
    backgroundColor: "red",
    width: "100%",
    height: "100%"
  }
}));

const ContactDetailsForm = () => {
  const classes = useStyles();
  return (
    <form>
      <TextField
        className={classes.textField}
        label="Street Address"
        variant="outlined"
      />
      <TextField
        className={classes.textField}
        label="Street Address 2"
        variant="outlined"
      />
      <div style={{ display: "inline-flex", width: "100%" }}>
        <TextField
          className={classes.pincode}
          label="Pincode"
          variant="outlined"
        />
        <TextField
          className={classes.city}
          label="City"
          variant="outlined"
          disabled
        />
      </div>
      <div style={{ display: "inline-flex", width: "100%" }}>
        <TextField
          className={classes.state}
          label="State"
          variant="outlined"
          disabled
        />
        <TextField
          className={classes.country}
          label="Country"
          variant="outlined"
          disabled
        />
      </div>
      <TextField
        className={classes.textField}
        label="Phone Number"
        variant="outlined"
      />
    </form>
  );
};

export default ContactDetailsForm;

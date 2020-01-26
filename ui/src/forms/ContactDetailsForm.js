import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { validatePincode } from "../validation";
import PostalApi from "../apis/PostalApi";

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

const ContactDetailsForm = props => {
  const { values, errors, setValues, setErrors } = props;

  const handlePincodeChange = event => {
    if (event.target.value.length > 6) return;
    setValues({ ...values, pincode: event.target.value });
    setErrors({ ...errors, pincode: validatePincode(event.target.value) });
    if (validatePincode(event.target.value) === "")
      setCityStateCountry(event.target.value);
  };

  const setCityStateCountry = async pincode => {
    const response = await PostalApi.get(pincode);
    console.log(response.data[0].PostOffice[0]);
    if (!response.data[0].PostOffice) {
      setErrors({ ...errors, pincode: "Please enter a valid pincode" });
      return;
    }
    const { District, State, Country } = response.data[0].PostOffice[0];
    setValues({
      ...values,
      pincode,
      city: District, //Block === "NA" ? District : Block,
      state: State,
      country: Country
    });
    setErrors({ ...errors, pincode: validatePincode(pincode) });
  };

  const handleStreetAddressChange = event => {
    setValues({ ...values, streetAddress: event.target.value });
  };

  const handleStreetAddress2Change = event => {
    setValues({ ...values, streetAddress2: event.target.value });
  };

  const handlePhoneNumberChange = event => {
    setValues({ ...values, phoneNumber: event.target.value });
  };
  const classes = useStyles();

  return (
    <form>
      <TextField
        className={classes.textField}
        label="Street Address"
        variant="outlined"
        value={values.streetAddress}
        onChange={handleStreetAddressChange}
      />
      <TextField
        className={classes.textField}
        label="Street Address 2"
        variant="outlined"
        value={values.streetAddress2}
        onChange={handleStreetAddress2Change}
      />
      <div style={{ display: "inline-flex", width: "100%" }}>
        <TextField
          className={classes.pincode}
          value={values.pincode}
          label="Pincode"
          onChange={handlePincodeChange}
          helperText={errors.pincode}
          error={errors.pincode ? true : false}
          variant="outlined"
          maxLength="6"
        />
        <TextField
          className={classes.city}
          label="City"
          value={values.city}
          variant="outlined"
          disabled
        />
      </div>
      <div style={{ display: "inline-flex", width: "100%" }}>
        <TextField
          className={classes.state}
          label="State"
          value={values.state}
          variant="outlined"
          disabled
        />
        <TextField
          className={classes.country}
          label="Country"
          value={values.country}
          variant="outlined"
          disabled
        />
      </div>
      <TextField
        className={classes.textField}
        label="Phone Number"
        variant="outlined"
        value={values.phoneNumber}
        onChange={handlePhoneNumberChange}
      />
    </form>
  );
};

export default ContactDetailsForm;

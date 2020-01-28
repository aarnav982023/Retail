import React from "react";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { validateCard } from "../validation";
import Dropzone from "./Dropzone";

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(2),
    width: "100%"
  },
  name: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    width: "100%"
  },
  expiryDate: {
    marginTop: theme.spacing(2)
  },
  card: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "100%"
  }
}));

const CardIcon = props => {
  if (/^4[0-9]*/.test(props.card)) return <FaCcVisa size={50} />;
  if (/^5[0-9]*/.test(props.card)) return <FaCcMastercard size={50} />;
  return <div></div>;
};

const ExtraDetailsForm = props => {
  const classes = useStyles();

  const { values, setValues, errors, setErrors } = props;

  const handleExpiryDateChange = value => {
    setValues({ ...values, expiryDate: value });
  };

  const handleCardChange = event => {
    setValues({ ...values, card: event.target.value });
    setErrors({ ...errors, card: validateCard(event.target.value) });
  };

  const handleNameChange = event => {
    setValues({ ...values, nameOnCard: event.target.value });
  };

  const handleFileUpload = file => {
    setValues({ ...values, file });
    console.log(file);
  };

  return (
    <form>
      <Dropzone file={props.values.file} handleFileUpload={handleFileUpload} />
      <div style={{ display: "inline-flex", width: "100%" }}>
        <TextField
          className={classes.name}
          label="Name on Card"
          variant="outlined"
          value={values.nameOnCard}
          onChange={handleNameChange}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={classes.expiryDate}
            views={["year", "month"]}
            label="Expiry date"
            variant="inline"
            format="MM/yy"
            inputVariant="outlined"
            value={values.expiryDate}
            onChange={handleExpiryDateChange}
          />
        </MuiPickersUtilsProvider>
      </div>
      <TextField
        className={classes.card}
        label="Card number"
        helperText={errors.card}
        variant="outlined"
        value={values.card}
        error={errors.card ? true : false}
        onChange={handleCardChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CardIcon card={values.card} />
            </InputAdornment>
          )
        }}
      />
    </form>
  );
};

export default ExtraDetailsForm;

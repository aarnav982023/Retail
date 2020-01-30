import RetailApi from "../apis/RetailApi";
import { REGISTER_USER } from "./types";

export const registerUser = values => async dispatch => {
  let bodyFormData = new FormData();
  const personal = {
    username: values.username,
    email: values.email,
    password: values.password
  };
  const contact = {
    address: {
      field1: values.streetAddress,
      field2: values.streetAddress2,
      pincode: values.pincode,
      city: values.city,
      state: values.state,
      country: values.country
    },
    phone: values.phoneNumber
  };
  const extra = {
    card: {
      number: values.card,
      expiry: values.expiryDate,
      name: values.nameOnCard
    }
  };
  bodyFormData.append("avatar", values.file);
  bodyFormData.append("personal", JSON.stringify(personal));
  bodyFormData.append("contact", JSON.stringify(contact));
  bodyFormData.append("extra", JSON.stringify(extra));
  const response = await RetailApi.post("/users", bodyFormData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  dispatch({ type: REGISTER_USER, payload: response.data.user.user });
};

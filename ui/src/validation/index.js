export const validateEmail = email => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email) ? "" : "Please enter a valid email";
};
export const validatePassword = password => {
  if (!/^(?=.*[a-z])/.test(password)) {
    return "The password must contain at least 1 lowercase alphabetical character";
  }
  if (!/^(?=.*[A-Z])/.test(password)) {
    return "The password must contain at least 1 uppercase alphabetical character";
  }
  if (!/^(?=.*[0-9])/.test(password)) {
    return "The password must contain at least 1 numeric character";
  }
  if (!/^(?=.*[!@#$%^&])/.test(password)) {
    return "The password must contain at least one special character";
  }
  if (!/^(?=.{8,})/.test(password))
    return "The password must be eight characters or longer";
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (confirmPassword !== password)
    return "Please make sure your passwords match";
};

export const validatePincode = pincode => {
  const regex = /^[1-9][0-9]{5}$/;
  return regex.test(pincode) ? "" : "Please enter a valid pincode";
};

export const validatPhoneNumber = phoneNumber => {
  const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  return regex.test(phoneNumber) ? "" : "Please enter a valid phone Number";
};

export const validateCard = card => {
  if (card === "") return "";
  card = card.replace(/\D/g, "");
  const regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
  return regex.test(card) ? "" : "Please enter a valid card";
};

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

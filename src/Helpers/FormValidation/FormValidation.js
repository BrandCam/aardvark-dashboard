export const isRequired = (value) => (!value ? "Required!" : "");

export const isEmail = (value) => {
  if (value) {
    const mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return value.match(mailFormat) ? "" : "Please input a valid Email.";
  } else {
    return "Required!";
  }
};

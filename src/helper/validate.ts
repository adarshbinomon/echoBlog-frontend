import toast from "react-hot-toast";

interface Errors {
  password?: string;
  name?: string;
  email?: string;
  phone?: string;
  confirmPassword?: string;
}

interface Values {
  password?: string;
  name?: string;
  email?: string;
  phone?: string;
  confirmPassword?: string;
}

export const signupValidation = async (values: Values) => {
  let error: Errors = {};

  await Promise.all([
    nameVerify(error, values),
    passwordVerify(error, values),
    confirmPasswordVerify(error, values),
    emailVerify(error, values),
    phoneVerify(error, values),
  ]);
  return error;
};

export const loginValidation = async (values: Values) => {
  console.log(values);
  
  let error: Errors = {};

  await Promise.all([
    emailVerify(error, values),
    passwordVerify(error, values),
  ]);
  console.log(error);
  
  return error;
};

//functions

const nameVerify = (error: Errors = {}, values: Values) => {
  const nameRegex = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

  if (!values.name) {
    error.name = toast.error("Name required!");
  } else if (values.name?.trim() === "") {
    error.name = toast.error("Name required!");
  } else if (!nameRegex.test(values.name.trim())) {
    error.name = toast.error("Invalid name!");
  }
  return error;
};

const passwordVerify = (error: Errors = {}, values: Values) => {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    error.password = toast.error("Password required!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Password cannot contain spaces!");
  } else if (values.password.length < 4) {
    error.password = toast.error("Password should be more than 4 characters!");
  } else if (values.password.length > 15) {
    error.password = toast.error(
      "Password should be shorter than 15 characters!"
    );
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error(
      "Password should contain atleast one special character!"
    );
  }
  return error;
};

const confirmPasswordVerify = (error: Errors, values: Values) => {
  if (values.password !== values.confirmPassword) {
    error.confirmPassword = toast.error("Passwords should be same!");
  }
};

const emailVerify = (error: Errors = {}, values: Values) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if (!values.email) {
    error.email = toast.error("Email required!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Email should not contain spaces");
  } else if (!emailRegex.test(values.email)) {
    error.email = toast.error("Invalid email!");
  }
  return error;
};

const phoneVerify = (error: Errors = {}, values: Values) => {
  const phoneRegex = /^(?:\+91|0)?[7-9]\d{9}$/;

  if (!values.phone) {
    console.log(values?.phone);

    error.phone = toast.error("Phone required!");
  } else if (values?.phone?.length !== 10) {
    error.phone = toast.error("Phone number should be 10 digits!");
  } else if (values.phone.includes(" ")) {
    error.phone = toast.error("Phone number should not contain spaces!");
  } else if (!phoneRegex.test(values.phone)) {
    error.phone = toast.error("Invalid phone number!");
  }
  return error;
};

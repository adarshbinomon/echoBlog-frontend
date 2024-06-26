import toast from "react-hot-toast";
import { Errors, Values } from "../utils/interfaces/inteface";

export const signupValidation = async (values: Values) => {
  const error: Errors = {};

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

  const error: Errors = {};

  await Promise.all([
    emailVerify(error, values),
    passwordVerify(error, values),
  ]);
  console.log(error);

  return error;
};

export const userDetailsValidation = async (values: Values) => {
  console.log(values);

  const error: Errors = {};

  await Promise.all([
    userNameVerify(error, values),
    bioVerify(error, values),
    genderVerify(error, values),
    dateOfBirthVerify(error, values),
    accountTypeVerify(error, values),
  ]);
  console.log(error);

  return error;
};

export const editAccountValidation = async (values: Values) => {
  const error: Errors = {};
  console.log("validate");

  await Promise.all([
    userNameVerify(error, values),
    phoneVerify(error, values),
    genderVerify(error, values),
    dateOfBirthVerify(error, values),
  ]);
  console.log(error);
  return error;
};

export const editProfileValidation = async (values: Values) => {
  const error: Errors = {};

  await Promise.all([
    accountTypeVerify(error, values),
    nameVerify(error, values),
    bioVerify(error, values),
  ]);
  console.log(error);
  return error;
};
export const communityValidation = async (values: Values) => {
  console.log('values',values);
  
  const error: Errors = {};

  await Promise.all([
    nameVerify(error, values),
    aboutVerify(error, values),
  ]);
  console.log(error);
  return error;
};

export const profilePictureValidation = async (values: Values) => {
  const error: Errors = {};
  await Promise.resolve(profilePictureVerify(error, values));
  return error;
};

export const coverPictureValidation = async (values: Values) => {
  const error: Errors = {};
  await Promise.resolve(coverPictureVerify(error, values)); 
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
  const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

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

const genderVerify = (error: Errors = {}, values: Values) => {
  const allowedGenders = ["Male", "Female", "Other"];

  if (!values.gender) {
    error.gender = toast.error("Gender required!");
  } else if (!allowedGenders.includes(values.gender)) {
    error.gender = toast.error("Invalid gender!");
  }

  return error;
};

const dateOfBirthVerify = (error: Errors = {}, values: Values) => {
  const dateOfBirthRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!values.dateOfBirth) {
    error.dateOfBirth = toast.error("Date of Birth required!");
  } else if (!dateOfBirthRegex.test(values.dateOfBirth)) {
    error.dateOfBirth = toast.error("Invalid date format (YYYY-MM-DD)!");
  }

  return error;
};

const accountTypeVerify = (error: Errors = {}, values: Values) => {
  const allowedAccountTypes = ["Public", "Private"];

  if (!values.accountType) {
    error.accountType = toast.error("Account Type required!");
  } else if (!allowedAccountTypes.includes(values.accountType)) {
    error.accountType = toast.error("Invalid Account Type!");
  }

  return error;
};

const userNameVerify = (error: Errors = {}, values: Values) => {
  const userNameRegex = /^[a-zA-Z0-9_]+$/;

  if (!values.userName) {
    error.userName = toast.error("Username required!");
  } else if (!userNameRegex.test(values.userName)) {
    error.userName = toast.error(
      "Invalid username. It can contain only constters, numbers, and underscores (_)."
    );
  }

  return error;
};

const bioVerify = (error: Errors = {}, values: Values) => {
  if (!values.bio) {
    error.bio = toast.error("Bio cannot be empty!");
  }

  return error;
};
const aboutVerify = (error: Errors = {}, values: Values) => {
  if (!values.about) {
    error.about = toast.error("About cannot be empty!");
  }

  return error;
};

const profilePictureVerify = (error: Errors = {}, values: Values) => {
  const fileExtensionRegex = /\.(jpg|jpeg|png)$/i;

  if (!values.profilePicture) {
    error.profilePicture = toast.error("Profile picture is required!");
  } else if (!fileExtensionRegex.test(values.profilePicture)) {
    error.coverPicture = toast.error(
      "Invalid file format. Please use JPG, JPEG, or PNG."
    );
  }
  return error;
};

const coverPictureVerify = (error: Errors = {}, values: Values) => {
  const fileExtensionRegex = /\.(jpg|jpeg|png)$/i;

  if (!values.coverPicture) {
    error.coverPicture = toast.error("Cover picture is required!");
  } else if (!fileExtensionRegex.test(values.coverPicture)) {
    error.coverPicture = toast.error(
      "Invalid file format. Please use JPG, JPEG, or PNG."
    );
  }

  return error;
};

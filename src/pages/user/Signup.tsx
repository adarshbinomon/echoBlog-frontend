import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import axios from "axios";
import { signupValidation } from "../../helper/validate";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../../firebase/firebaseConfig";
import { useEffect } from "react";
import GoogleButton from "react-google-button";
const authServiceBaseUrl = import.meta.env.VITE_AUTH_SERVICE_BASEURL;



const Signup: React.FC = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      password: "a@1234",
      confirmPassword: "a@1234",
    },
    validate: signupValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log("Form values submitted:", values);
      if (formik.isValid) {
        axios
          .post(`${authServiceBaseUrl }/signup`, values, { withCredentials: true })
          .then((res) => {
            console.log(res.data);
            if (res.data.status) {
              console.log(res.data);
              navigate("/otp-verify");
            } else if (res.data?.status1) {
              console.log(res.data);
              toast.error(res.data?.message);
            } else {
              console.log(res.data);
              toast.error(res.data?.message);
            }
          })
          .catch((error) => {
            console.error("error", error);
            toast.error("An error occured!");
          });
      }
    },
  });
  const handleGoogle = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      const userData = {
        profile: data.user.photoURL,
        email: data.user.email,
        name: data.user.displayName,
        uid: data.user.uid,
        isGoogle: true,
        isFacebook: false,
      };

      axios
        .post(`${authServiceBaseUrl }/google-login`, userData, { withCredentials: true })
        .then((res) => {
          console.log("res");
          console.log(res);
          if (res.data.status) {
            navigate("/");
            localStorage.setItem("accessToken", res.data?.accessToken);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Sign in with Google failed!");
        });
    } catch (error) {
      console.log(error);
      toast.error("Sign in with Google failed!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen max-w-screen">
      <Toaster position="top-right" reverseOrder={false}></Toaster>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm border px-7  rounded-2xl bg-white">
        <h2 className="mt-5 text-center text-4xl font-bold text-indigo-600 hover:text-indigo-500">
          {"<EchoBlog/>"}
        </h2>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
            Create New Account
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-4"
            method="POST"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address*
              </label>
              <div className="">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name*
              </label>
              <div className="">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="Phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone*
              </label>
              <div className="">
                <input
                  id="phone"
                  name="phone"
                  type="string"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password*
              </label>
              <div className="">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password*
                </label>
              </div>
              <div className="">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="">
            <h6>Signup using:</h6>
          </div>
          <div className="mt-2 flex items-center space-x-2 justify-center">
            <GoogleButton onClick={handleGoogle} />
            {/* <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-900 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              onClick={handleGoogle}
            >
              Google
            </button> */}
            {/* <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-900 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              onClick={handleGoogle}
            >
              Github
            </button> */}
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const authServiceBaseUrl = import.meta.env.VITE_AUTH_SERVICE_BASEURL;

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [emailVisibility, setEmailVisibility] = useState<boolean>(true);
  const [otpVisibility, setOtpVisibility] = useState<boolean>(false);
  const [passwordFieldVisibility, setPasswordFieldVisibility] =
    useState<boolean>(false);
  const [emailValidity, setEmailValidity] = useState<boolean>(true);
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]); // Initialize OTP state with an array of 4 empty strings
  const [otpValidity, setOtpValidity] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordValidity, setPasswordValidity] = useState<boolean>(false);
  const [confirmPasswordValidity, setConfirmPasswordValidity] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateEmail(email)) {
      axios
        .post(
          `${authServiceBaseUrl}/forgot-password`,
          { email },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setOtpVisibility(true);
            setEmailVisibility(false);
          } else {
            console.error("Unexpected response:", res);
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          console.error("Axios request failed:", error);
          toast.error(error.response.data.message);
        });
      console.log("Form submitted successfully!");
    } else {
      toast.error("Invalid email");
    }
  };

  const handleSubmitOtp = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (otpValidity) {
      axios
        .post(
          `${authServiceBaseUrl}/verify-otp-forgot-password`,
          { enteredOtp },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          if (res.status) {
            setOtpVisibility(false);
            setPasswordFieldVisibility(true);
          } else {
            toast.error("OTP verification failed!");
          }
        });
    } else {
      toast.error("enter OTP");
    }
  };

  const handleSubmitPassword = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (passwordValidity && confirmPasswordValidity) {
      axios
        .post(
          `${authServiceBaseUrl}/change-password`,
          { password, confirmPassword },
          { withCredentials: true }
        )
        .then(() => {
          toast.success("Password changed successfully");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        });
    } else {
      console.log("else");
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleOtpChange = (index: number, value: string) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    const updatedOtpValidity = [...otpValidity];
    updatedOtpValidity[index] = value.length === 1;
    setOtpValidity(updatedOtpValidity);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordValidity(value.length >= 8);
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setConfirmPasswordValidity(value === password);
  };

  return (
    <div className="flex items-center justify-center h-screen max-w-screen">
      <Toaster position="top-right" reverseOrder={false}></Toaster>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm border px-7 py-4 rounded-2xl bg-white">
        <h2 className="mt-10 text-center text-4xl font-bold text-indigo-600 hover:text-indigo-500">
          {"<EchoBlog/>"}
        </h2>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Change your password
          </h2>
        </div>

        {emailVisibility && (
          <form
            className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
            onSubmit={handleSubmit}
            noValidate
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
              {!emailValidity && (
                <p className="text-red-500 text-xs mt-1">
                  Please enter a valid email address.
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send OTP
              </button>
            </div>
          </form>
        )}

        {otpVisibility && (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" noValidate>
              <div className="flex justify-center space-x-4">
                {otp.map((digit, index) => (
                  <div key={index} className="w-12">
                    <input
                      id={`otp-${index}`}
                      name={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      autoComplete="off"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                ))}
              </div>
              {otpValidity.some((valid) => !valid) && (
                <p className="text-red-500 text-xs mt-1">
                  Please enter a valid OTP.
                </p>
              )}
              <div>
                <button
                  type="button"
                  onClick={handleSubmitOtp}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit OTP
                </button>
              </div>
            </form>
          </div>
        )}

        {passwordFieldVisibility && (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  required
                  minLength={8}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {!passwordValidity && (
                <p className="text-red-500 text-xs mt-1">
                  Password must be at least 8 characters long.
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password*
              </label>
              <div className="">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                  required
                  minLength={8}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {!confirmPasswordValidity && (
                <p className="text-red-500 text-xs mt-1">
                  Passwords do not match.
                </p>
              )}
            </div>
            <button
              type="submit"
              onClick={handleSubmitPassword}
              className="mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Reset Password
            </button>
          </div>
        )}

        <p className="mt-10 text-center text-sm text-gray-500">
          Know your credentials?
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

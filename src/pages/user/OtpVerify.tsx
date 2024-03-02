import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../redux/slices/userSlices";
import { useDispatch } from "react-redux";

const OtpVerify: React.FC = () => {
  const baseUrl: string = "http://localhost:4000/api/auth/user";
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [otp, setOtp] = useState(["", "", "", ""]);
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  useEffect(() => {
    const currentRef = refs[otp.findIndex((digit) => digit === "")];
    if (currentRef && currentRef.current) {
      currentRef.current.focus();
    }
  }, [otp]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = { enteredOtp: otp.join("") };
    console.log("Submitted OTP:", enteredOtp);
    if (enteredOtp.enteredOtp.length < 4) {
      toast.error("Please enter OTP");
    } else {
      axios
        .post(`${baseUrl}/verify-otp`, enteredOtp, { withCredentials: true })
        .then((res) => {
          if (res.data?.status) {
            const userId = res.data.user._id;
            console.log(res.data.user);
            dispatch(addUser(res.data.user));


            localStorage.setItem("accessToken", res.data?.accessToken);
            navigate(`/user-details/${userId}`);
            
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((error: any) => {
          console.error("error", error);
          toast.error("An error occured!");
        });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Toaster position="top-right" reverseOrder={false}></Toaster>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm border px-7 py-4 rounded-2xl bg-white">
        <h2 className="mt-10 text-center text-4xl font-bold text-indigo-600 hover:text-indigo-500">
          {"<EchoBlog/>"}
        </h2>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter OTP
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="flex justify-center space-x-4">
              {otp.map((digit, index) => (
                <div key={index} className="w-12">
                  <input
                    ref={refs[index]}
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

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginValidation } from "../../helper/validate";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
const authServiceBaseUrl = import.meta.env.VITE_AUTH_SERVICE_BASEURL;



const AdminLogin = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminAccessToken");
    if (token) {
      navigate("/admin/");
    } else {
      navigate("/admin/login");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: "admin@echoblog.com",
      password: "admin@123",
    },
    validate: loginValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log("form values submitted", values);
      if (formik.isValid) {
        axios
          .post(`${authServiceBaseUrl}/admin/login`, values, { withCredentials: true })
          .then((res) => {
            console.log(res.data);
            if (res.data.status) {
              localStorage.setItem('adminAccessToken',res.data?.accessToken)
              navigate("/admin/");
            } else {
              toast.error(res.data?.message);
            }
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message);
          });
      }
    },
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <Toaster position="top-right" reverseOrder={false}></Toaster>

      <div className="sm:mx-auto  sm:w-full sm:max-w-sm border px-7 py-4 rounded-2xl bg-gray-100">
        <h6 className="mt-5 ml-10 ps-44 text-gray-500">admin</h6>
        <h2 className=" text-center text-4xl font-bold text-red-600 hover:text-red-500 ">
          {"<EchoBlog/>"}
        </h2>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your Admin account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6 mb-5"
            method="POST"
            onSubmit={formik.handleSubmit}
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-red-600 hover:text-red-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
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
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

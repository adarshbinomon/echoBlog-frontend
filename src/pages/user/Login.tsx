import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { loginValidation } from "../../helper/validate";
import axios from "axios";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth ,provider} from "../../../firebase/firebaseConfig";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { addUser } from "../../redux/slices/userSlices";
import { useDispatch } from "react-redux";
import GoogleButton from "react-google-button";


const Login = () => {
  const baseUrl: string = "http://localhost:4000/api/auth/user";

  const navigate = useNavigate();
  const dispatch = useDispatch()


  const formik = useFormik({
    initialValues: {
      email: "adarsh@echoblog.com",
      password: "a@1234",
    },
    validate: loginValidation,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log("form values submitted", values);
      if (formik.isValid) {
        axios
          .post(`${baseUrl}/login`, values, { withCredentials: true })
          .then((res) => {
            if(res.status){
              console.log({status: true, message: "User login successful"});
              localStorage.setItem('accessToken',res.data?.accessToken)
              dispatch(addUser(res.data.user));
              navigate('/')
            }
          })
          .catch((error)=>{
            console.log("error", error);
            toast.error(error.message)
            
          })
      }
    },
  });

  useEffect(()=>{
   const token = localStorage.getItem('accessToken')
   if(token){
    navigate('/')
   }
  },[navigate])

  const handleGoogle = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      const userData = {
        profilePicture: data.user.photoURL,
        email: data.user.email,
        name: data.user.displayName,
        uid: data.user.uid,
        isGoogle: true,
        isFacebook: false,
      };

      axios
        .post(`${baseUrl}/google-login`, userData, { withCredentials: true })
        .then((res) => {
          console.log("res");
          console.log(res);
          if (res.data.status) {
            navigate("/");
            localStorage.setItem("accessToken", res.data?.accessToken);
            dispatch(addUser(res.data.user));

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
    <div className="flex items-center justify-center h-screen">
      <Toaster position="top-right" reverseOrder={false}></Toaster>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm border px-7 py-4 rounded-2xl bg-white">
        <h2 className="mt-10 text-center text-4xl font-bold text-indigo-600 hover:text-indigo-500">
          {"<EchoBlog/>"}
        </h2>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
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
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
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
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="mt-2 flex justify-center">

          <GoogleButton onClick={handleGoogle} />
          </div>


          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

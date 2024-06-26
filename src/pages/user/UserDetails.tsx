import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import axios from "axios";
import { userDetailsValidation } from "../../helper/validate";
import { GenderEnum, AccountTypeEnum } from "../../helper/enum";
import { useSelector } from "react-redux";
import { UserData } from "../../utils/interfaces/inteface";
const userServiceBaseUrl = import.meta.env.VITE_USER_SERVICE_BASEURL;


const UserDetails: React.FC = () => {

  const { userId } = useParams();

  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: "",
      phone: userData.phone,
      bio: "",
      gender: "",
      dateOfBirth: "",
      accountType: "",
      _id: userId,
    },
    validate: userDetailsValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      if (formik.isValid) {
        axios
          .post(`${userServiceBaseUrl}/user-details`, values, { withCredentials: true })
          .then((res) => {
            if (res.data.status) {
              navigate("/");
            }
          })
          .catch(() => {
            navigate("/404");
          });
      }
    },
  });

  return (
    <div className="flex items-center justify-center h-screen max-w-screen">
      <Toaster position="top-right" reverseOrder={true}></Toaster>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm border px-7  rounded-2xl bg-white">
        <h2 className="mt-5 text-center text-4xl font-bold text-indigo-600 hover:text-indigo-500">
          {"<EchoBlog/>"}
        </h2>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-5 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
            One more step 😜
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
                htmlFor="userName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User name*
              </label>
              <div className="">
                <input
                  id="userName"
                  name="userName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userName}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></input>
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Phone*
              </label>
              <div className="">
                <input
                  id="phone"
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></input>
              </div>
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Bio*
              </label>
              <div className="">
                <input
                  id="bio"
                  name="bio"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.bio}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></input>
              </div>
            </div>

            <div className="hidden">
              <label
                htmlFor="_id"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                _id*
              </label>
              <div className="">
                <input
                  id="_id"
                  name="_id"
                  value={userId}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Gender*
              </label>
              <div className="">
                <select
                  id="gender"
                  name="gender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Select Gender</option>
                  {Object.values(GenderEnum).map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date of Birth*
              </label>
              <div className="">
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dateOfBirth}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="accountType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Account Type*
              </label>
              <div className="">
                <select
                  id="accountType"
                  name="accountType"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.accountType}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Select Account Type</option>
                  {Object.values(AccountTypeEnum).map((accountType) => (
                    <option key={accountType} value={accountType}>
                      {accountType}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="mb-7 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

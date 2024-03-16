import { GenderEnum } from "../../helper/enum";
import { useDispatch, useSelector } from "react-redux";
import { UserData } from "../../utils/interfaces/inteface";
import { useFormik } from "formik";
import { dateParser } from "../../helper/dateParser";
import axios from "axios";
import { editAccountValidation } from "../../helper/validate";
import toast from "react-hot-toast";
import { addUser } from "../../redux/slices/userSlices";

const EditProfileAccountTab = () => {
  const userServiceBaseUrl: string = "http://localhost:4001/api/user";

  const dispatch = useDispatch();

  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );

  const dateOfBirth = dateParser(userData.dateOfBirth);
  const createdOn = dateParser(userData.createdOn);

  const formik = useFormik({
    initialValues: {
      userName: userData.userName,
      phone: userData.phone,
      gender: userData.gender,
      dateOfBirth: userData.dateOfBirth,
      _id: userData._id,
    },
    validate: editAccountValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      if (formik.isValid) {
        console.log(values);
        axios
          .put(`${userServiceBaseUrl}/edit-profile`, values, {
            withCredentials: true,
          })
          .then((res) => {
            dispatch(addUser(res.data.user));
            toast.success("User Details Updated!");
          })
          .catch((error) => {
            toast.error("User Data Update Failed!");
            console.log(error, "error");
          });
      }
    },
  });

  return (
    <>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6"
          method="post"
          noValidate
        >
          <div className="flex flex-row ">
            <div className="w-1/3 flex justify-start">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                User name:
              </label>
            </div>
            <div className="w-2/3 ms-[50px]">
              <input
                id="userName"
                name="userName"
                type="userName"
                autoComplete="userName"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.userName}
                className="px-3  block w-full  rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="flex flex-row ">
            <div className="w-1/3 flex justify-start">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                Phone Number:
              </label>
            </div>
            <div className="w-2/3 ms-[50px]">
              <input
                id="phone"
                name="phone"
                type="phone"
                autoComplete="phone"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className="px-3  block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="flex flex-row ">
            <div className="w-1/3 flex justify-start">
              {" "}
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Gender:
              </label>
            </div>
            <div className="w-2/3 ms-[50px]">
              <select
                id="gender"
                name="gender"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

          <div className="flex flex-row items-center ">
            <div className="w-1/3 flex justify-start">
              {" "}
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date of Birth:
              </label>
            </div>
            <div className="w-1/3 ms-[50px]">
              <p>{dateOfBirth}</p>
            </div>
            <div className="w-1/3 ms-[50px]">
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dateOfBirth}
                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <button
            type="submit"
            className="float-right w-auto px-2 ms-24 mb-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
          >
            Save Changes
          </button>
        </form>{" "}
      </div>

      <div className="w-full pt-[80px]">
        <hr className="w-full mb-10" />
      </div>

      <div className="flex flex-row mt-10">
        <div className="w-1/3 flex justify-start">
          <label
            htmlFor="verifiedBadge"
            className="block text-sm font-medium leading-6 text-gray-900 "
          >
            Verified Badge:
          </label>
        </div>
        <div className="w-2/3 ms-[50px]">
          <p>
            Non Active{" "}
            <span className="text-indigo-600 font-bold hover:text-indigo-500 hover:cursor-pointer">
              Become a Member
            </span>{" "}
            to receive a verified badge.
          </p>
        </div>
      </div>

      <div className="flex flex-row mt-10">
        <div className="w-1/3 flex justify-start">
          <label
            htmlFor="interestedTopics"
            className="block text-sm font-medium leading-6 text-gray-900 "
          >
            Interested Topics:
          </label>
        </div>
        <div className="flex w-2/3 justify-end ms-[50px]">
          <p>0</p>
        </div>
      </div>

      <div className="flex flex-row mt-10">
        <div className="w-1/3 flex justify-start">
          <label
            htmlFor="blockedProfiles"
            className="block text-sm font-medium leading-6 text-gray-900 "
          >
            Blocked Accounts:
          </label>
        </div>
        <div className="flex w-2/3 justify-end ms-[50px]">
          <p>0</p>
        </div>
      </div>

      <div className="flex flex-row mt-10">
        <div className="w-1/3 flex justify-start">
          <label
            htmlFor="accountCreatedOn"
            className="block text-sm font-medium leading-6 text-gray-900 "
          >
            Account Created on:
          </label>
        </div>
        <div className="flex w-2/3 justify-end ms-[50px]">
          <p>{createdOn}</p>
        </div>
      </div>
    </>
  );
};

export default EditProfileAccountTab;

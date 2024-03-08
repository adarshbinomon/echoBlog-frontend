import { AccountTypeEnum } from "../helper/enum";
import { useSelector } from "react-redux";
import { UserData } from "../utils/interfaces/inteface";
import { useFormik } from "formik";
import { editProfileValidation } from "../helper/validate";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { addUser } from "../redux/slices/userSlices";
import { useDispatch } from "react-redux";

const EditProfileProfileTab = () => {
  const userServiceBaseUrl: string = "http://localhost:4001/api/user";
  const dispatch = useDispatch();

  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );

  const [profilePicture, setProfilePicture] = useState(userData.profilePicture);
  const [coverPicture, setCoverPicture] = useState(userData.CoverPicture);
  const userId = userData._id;

  const handleProfileUpload = () => {
    const formData = new FormData();
    formData.append("profilePicture", profilePicture);
    formData.append("_id", userId);

    console.log(Array.from(formData.entries()));

    axios
      .post(`${userServiceBaseUrl}/upload-profile-picture`, formData)
      .then((res) => {
        toast.success("Profile Picture Updated!");
        dispatch(addUser(res.data.user));
      })
      .catch((err) => console.error("Upload error:", err));
  };

  const handleCoverUpload = () => {
    const formData = new FormData();
    formData.append("coverPicture", coverPicture);
    formData.append("_id", userId);

    console.log(Array.from(formData.entries()));

    axios
      .post(`${userServiceBaseUrl}/upload-cover-picture`, formData)
      .then((res) => {
        toast.success("Cover Picture Updated!");
        dispatch(addUser(res.data.user));
      })
      .catch((err) => console.error("Upload error:", err));
  };

  const formik = useFormik({
    initialValues: {
      accountType: userData.accountType,
      name: userData.name,
      bio: userData.bio,
      _id: userData._id,
    },
    validate: editProfileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      if (formik.isValid) {
        axios
          .put(`${userServiceBaseUrl}/edit-profile`, values, {
            withCredentials: true,
          })
          .then((res) => {
            toast.success("User Details Updated!");
            dispatch(addUser(res.data.user));
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
          className="space-y-6"
          onSubmit={formik.handleSubmit}
          method="post"
          noValidate
        >
          <div className="flex flex-row items-center ">
            <div className="w-1/3 flex justify-start">
              {" "}
              <label
                htmlFor="accountType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Account Privacy:
              </label>
            </div>
            <div className="w-2/3 ms-[50px]">
              <select
                id="accountType"
                name="accountType"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.accountType}
                className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Select Type</option>
                {Object.values(AccountTypeEnum).map((accountType) => (
                  <option key={accountType} value={accountType}>
                    {accountType}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-row items-center ">
            <div className="w-1/3 flex justify-start">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                Name:
              </label>
            </div>
            <div className="w-2/3 ms-[50px]">
              <input
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="px-1  block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="flex flex-row items-center ">
            <div className="w-1/3 flex justify-start">
              <label
                htmlFor="bio"
                className="block text-sm font-medium leading-6 text-gray-900 "
              >
                Bio:
              </label>
            </div>
            <div className="w-2/3 ms-[50px]">
              <input
                id="bio"
                name="bio"
                type="bio"
                autoComplete="bio"
                required
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bio}
                className="px-1  block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="">
            <button
              type="submit"
              className="float-right w-auto px-2 ms-24 mb-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
            >
              Save Changes
            </button>{" "}
          </div>
        </form>
        <hr className="w-full " />
        <form method="post" encType="multipart/form-data">
          <div className="flex flex-row items-center mt-10">
            <div className="w-1/3 flex justify-start">
              <label
                htmlFor="profilePicture"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Profile Picture:
              </label>
            </div>
            <div className="w-1/3 ms-[50px]">
              <img src={userData.profilePicture} alt={userData.userName} />
            </div>
            <div className="w-1/3 ms-[50px]">
              <input
                id="profilePicture"
                name="profilePicture"
                type="file"
                onChange={(e: any) => setProfilePicture(e.target.files[0])}
                className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </form>

        <button
          onClick={handleProfileUpload}
          className="float-right w-auto px-2 ms-24 mb-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
        >
          Upload Profile Picture{" "}
        </button>
        <hr className="mt-10 w-full mb-10" />
        <form method="post" encType="multipart/form-data">
          <div className="flex flex-row items-center ">
            <div className="w-1/3 flex justify-start">
              {" "}
              <label
                htmlFor="coverPicture"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cover Picture:
              </label>
            </div>
            <div className="w-2/3 space-y-3">
              <div className=" ms-[50px]">
                <input
                  id="coverPicture"
                  name="coverPicture"
                  type="file"
                  onChange={(e: any) => setCoverPicture(e.target.files[0])}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className=" ms-[50px]">
                <img src={userData.coverPicture} alt={userData.userName} />
              </div>
            </div>
          </div>
        </form>
        <button
          onClick={handleCoverUpload}
          className="float-right w-auto px-2 ms-24 mt-5 mb-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
        >
          Upload Cover Photo{" "}
        </button>
      </div>
    </>
  );
};

export default EditProfileProfileTab;

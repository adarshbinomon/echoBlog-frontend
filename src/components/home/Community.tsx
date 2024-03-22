import { Users } from "lucide-react";
import { useFormik } from "formik";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { communityValidation } from "../../helper/validate";
import { useSelector } from "react-redux";
import { UserData } from "../../utils/interfaces/inteface";
import { useNavigate } from "react-router-dom";


const Community = () => {
  const baseUrl: string = "http://localhost:4003/api/group";
  const navigate = useNavigate();


  const userData = useSelector(
    (state: UserData) => state.persisted.user.userData
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      about: "",
    },
    validate: communityValidation,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log("form values submitted", values);
      if (formik.isValid) {
        values = { ...values, createdBy: userData._id };
        axios
          .post(`${baseUrl}/create-community`, values, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res);
            if (res.status) {
                navigate(`/community-profile/${res.data.community._id}`);
            }
          })
          .catch((error) => {
            console.log("error", error);
            toast.error(error.message);
          });
      }
    },
  });

  return (
    <div>
      <div className="border p-10  m-4 relative rounded-lg shadow-md  text-gray-600 bg-white">
        <div className="justify-start">
          <div className="flex">
            <h2 className="text-3xl font-bold">Community</h2>
            <div className="items-center p-2 ms-2 ">
              <Users size={29} className="items-center" />
            </div>
          </div>
          <div>
            <p className="pt-2 font-semibold">
              Community helps you expand your connections to a whole new level.
              Ask your questions and get answered!
            </p>
          </div>
        </div>
        <div>
          <form
            className="space-y-6 pt-8"
            method="POST"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name:
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About:
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="about"
                  name="about"
                  type="text"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.about}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Community
              </button>
            </div>
          </form>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Community;

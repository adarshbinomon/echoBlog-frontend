import { AccountTypeEnum } from "../helper/enum";

const EditProfileProfileTab = () => {
  return (
    <>
      <div>
        <form action="" className="space-y-6" method="post" noValidate>
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
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.accountType}
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
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.userName}
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
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.bio}
                className="px-1  block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="flex flex-row items-center ">
            <div className="w-1/3 flex justify-start">
              {" "}
              <label
                htmlFor="profilePicture"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ProfilePicture:
              </label>
            </div>
            <div className="w-1/3 ms-[50px]">
              <img src="/dummy-profile.png" alt="" />
            </div>
            <div className="w-1/3 ms-[50px]">
              <input
                id="profilePicture"
                name="profilePicture"
                type="file"
                required
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.dateOfBirth}
                className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

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
                  required
                  // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  // value={formik.values.coverPicture}
                  className="px-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className=" ms-[50px]">
                <img src="/9ae8fc22197c56c5e5b0c2c22b05186e .jpeg" alt="" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfileProfileTab;

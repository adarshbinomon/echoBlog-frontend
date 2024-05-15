import DataTable, { TableColumn } from "react-data-table-component";
import { UserData } from "../../utils/interfaces/inteface";
import { useEffect, useState } from "react";
import axios from "axios";
const userServiceBaseUrl = import.meta.env.VITE_USER_SERVICE_BASEURL;

const PremiumManagement = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`${userServiceBaseUrl}/find-all-users`, { withCredentials: true })
      .then((res) => {
        setData(res.data.users);
        console.log(res.data.users);

        setReload(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [reload]);

  const premiumUsers = data.filter((user) => user.isPremium);

  const columns: TableColumn<UserData>[] = [
    {
      name: "No",
      cell: (_row: UserData, index: number) => index + 1,
    },
    {
      name: "Name",
      selector: (row: UserData) => row.name,
    },
    {
      name: "Email",
      selector: (row: UserData) => row.email,
    },
    {
      name: "isPremium",
      selector: (row: UserData) => (row.isPremium ? "Premium" : "Not Premium"), // Display "Premium" for true, "Not Premium" for false
    },
    // {
    //   name: "Actions",
    //   cell: (row: UserData) => (
    //     <div>
    //       {row.isActive ? (
    //         <button
    //           className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-300"
    //           //   onClick={() => handleStatusChange(row._id)}
    //         >
    //           Block
    //         </button>
    //       ) : (
    //         <button
    //           className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-300"
    //           //   onClick={() => handleStatusChange(row._id)}
    //         >
    //           Unblock
    //         </button>
    //       )}
    //     </div>
    //   ),
    // },
  ];
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">Premium Members</h1>
      <div className="flex space-x-5 mt-5">
        <div className="card w-52 bg-white shadow-xl">
          <figure className="px-10 pt-10"></figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Total Premium Users</h2>
            <h2 className="text-3xl font-extrabold text-red-500 mt-5">
              {premiumUsers.length}
            </h2>
          </div>
        </div>
        <div className="card w-52 bg-white shadow-xl">
          <figure className="px-10 pt-10"></figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Total Revenue generated</h2>
            <h2 className="text-3xl font-extrabold text-red-500 mt-5">
              ₹{premiumUsers.length * 1999}
            </h2>
          </div>
        </div>
      </div>
      <div className="w-4/5 mt-16 border justify-center">
        <DataTable columns={columns} data={data} pagination highlightOnHover />
      </div>
    </div>
  );
};

export default PremiumManagement;

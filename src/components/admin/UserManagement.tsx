import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import toast from "react-hot-toast";
import { UserData } from "../../utils/interfaces/inteface";
import { confirmAlert } from "react-confirm-alert";
const userServiceBaseUrl = import.meta.env.VITE_USER_SERVICE_BASEURL;
const authServiceBaseUrl = import.meta.env.VITE_AUTH_SERVICE_ADMIN_BASEURL;



const UserManagement: React.FC = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [reload, setReload] = useState<boolean>(false);

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
      name: "Actions",
      cell: (row: UserData) => (
        <div>
          {row.isActive ? (
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-300"
              onClick={() => handleStatusChange(row._id)}
            >
              Block
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-300"
              onClick={() => handleStatusChange(row._id)}
            >
              Unblock
            </button>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    axios
      .get(`${userServiceBaseUrl}/find-all-users`, { withCredentials: true })
      .then((res) => {
        setData(res.data.users);
        setReload(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [reload]);

  const handleStatusChange = (userId: string) => {
    confirmAlert({
      title: "Confirm to change Status",
      message: "Are you sure to Change the Status of this User?",
      buttons: [
        {
          label: "Change",
          onClick: () => {
            axios
              .put(
                `${authServiceBaseUrl}/change-user-status/${userId}`,
                {},
                { withCredentials: true }
              )
              .then((res) => {
                setReload(true);
                if (res.data.user.isActive) {
                  toast.success(`${res.data.user.name} unblocked`);
                } else {
                  toast.success(`${res.data.user.name} blocked`);
                }
              });
          },
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">User Management</h1>
      <div className="w-4/5 mt-16 border justify-center">
        <DataTable columns={columns} data={data} pagination highlightOnHover />
      </div>
    </div>
  );
};

export default UserManagement;

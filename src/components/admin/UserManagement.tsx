import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";

const UserManagement: React.FC = () => {
  const userServiceBaseUrl: string = "http://localhost:4001/api/user";
  const [users, setUsers] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [reload,setReload] = useState('false')
  const columns = [
    {
      name: "ID",
      selector: (row: any) => row._id,
    },
    {
      name: "Name",
      selector: (row: any) => row.name,
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
    },
    {
      name: "Actions",
      cell: (row: any) => (
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
        setUsers(res.data.users);
        const mappedData = res.data.users.map((user: any) => ({
          _id: user._id,
          name: user.name,
          email: user.email,
          isActive: user.isActive,
        }));
        setData(mappedData);
        setReload('false')
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [reload]);

  const handleStatusChange = (userId: string) => {
    try {
      axios
        .put(`${userServiceBaseUrl}/change-user-status/${userId}`, {
          withCredentials: true,
        })
        .then((res) => {
            setReload('true')
          if (res.data.user.isActive) {
            toast.success(`${res.data.user.name} unblocked`);
          } else {
            toast.success(`${res.data.user.name} blocked`);
          }
        });
    } catch (error) {
      console.log("error in status change:", error);
    }
  };


  return (
    <div className="flex">
      <h1>User Management</h1>
      <div className="w-4/5 mt-16 border justify-center">
        <DataTable columns={columns} data={data} pagination highlightOnHover />
      </div>
    </div>
  );
};

export default UserManagement;

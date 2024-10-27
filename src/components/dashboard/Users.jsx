import axiosInstance from "@/services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    const response = await axiosInstance.get("users");
    return response.data;
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      const allUsers = await getAllUsers();
      if (allUsers.users) {
        setUsers(allUsers.users);
      }
    };
    fetchAllUsers();
  }, []);
  console.log(users);
  return (
    <div className="mt-8 overflow-x-auto">
      <h2 className="text-lg">Products</h2>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {users.map((item) => (
            <tr key={item?._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={item?.photoUrl}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{item?.name}</div>
                  </div>
                </div>
              </td>
              <td>{item?.email}</td>
              <td>
                {" "}
                <select
                  className="input input-bordered w-full max-w-xs rounded-none text-sm bg-white"
                  value={item?.role}
                >
                  <option disabled value="">
                    select category
                  </option>
                  <option disabled value="admin">
                    Admin
                  </option>
                  <option disabled value="user">
                    User
                  </option>
                 
                </select>
              </td>
              <td>{item?.phone}</td>
              <th className="space-x-1">
                <Link
                  className="btn btn-ghost bg-pink-600 btn-xs"
                  to={`/dashboard/editProduct/${item?._id}`}
                >
                  Edit
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

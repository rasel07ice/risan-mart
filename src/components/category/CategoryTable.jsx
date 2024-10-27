import axiosInstance from "@/services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CategoryTable = () => {
  const [categories, setategories] = useState([]);

  const getAllCategories = async () => {
    const response = await axiosInstance.get("categories");
    return response.data;
  };

  useEffect(() => {
    const fetchAllCategories = async () => {
      const allCategories = await getAllCategories();
      if (allCategories.categories) {
        setategories(allCategories.categories);
      }
    };
    fetchAllCategories();
  }, []);
  

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
          {categories.map((item) => (
            <tr key={item?._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={item?.coverImage}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{item?.name}</div>
                  </div>
                </div>
              </td>
              <td>{item?.description}</td>
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

export default CategoryTable;
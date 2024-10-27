import axiosInstance from "@/services/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ProductsTable = () => {
  const [furnitures, setFurnitures] = useState([]);

  const getAllProducts = async () => {
    const response = await axiosInstance.get("products");
    return response.data;
  };

  const handleDelete = async (id) => {
    const response = await axiosInstance.delete(`products/${id}`);
    toast.success("Product Status", {
      description: ` ${response.data.message}`,
      action: {
        label: "Close",
        onClick: () => console.log("Undo"),
      },
    });
  };

  useEffect(() => {
    const getAllFurnitures = async () => {
      const allFurnitures = await getAllProducts();
      if (allFurnitures.products) {
        const topSellFurniture = allFurnitures.products;
        setFurnitures(topSellFurniture);
      }
    };
    getAllFurnitures();
  }, [furnitures]);
  console.log(furnitures);
  return (
    <div className="mt-8 overflow-x-auto">
      <h2 className="text-lg">Products</h2>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Old Price</th>
            <th>New Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {furnitures.map((item) => (
            <tr key={item?._id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
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
                    <div className="font-bold">{item?.title}</div>
                  </div>
                </div>
              </td>
              <td>{item?.category}</td>
              <td>{item?.newPrice}</td>
              <td>{item?.oldPrice}</td>
              <th className="space-x-1">
                <Link
                  className="btn btn-ghost bg-pink-600 btn-xs"
                  to={`/dashboard/editProduct/${item?._id}`}
                >
                  Edit
                </Link>
                <Link
                  className="btn btn-ghost btn-xs bg-primary"
                  onClick={() => handleDelete(item?._id)}
                >
                  Delete
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;

import axiosInstance from "@/services/api";
import { useEffect, useState } from "react";
import FurnitureCard from "./FurnitureCard";

const Furniture = ({ categoryName }) => {
  const [furnitures, setFurnitures] = useState([]);
  console.log("category: ", categoryName.name);

  const getAllProductsByCategory = async () => {
    let response;
    if (categoryName?.name) {
      console.log("from if block");
      response = await axiosInstance.get(
        `products/category/${categoryName?.name}`
      );
    } else {
      console.log("from else block");
      response = await axiosInstance.get("products");
      console.log(response.data);
    }

    return response.data;
  };

  useEffect(() => {
    const getAllFurnitures = async () => {
      const allFurnitures = await getAllProductsByCategory();
      if (allFurnitures.products) setFurnitures(allFurnitures.products);
    };
    getAllFurnitures();
  }, [furnitures]);
  console.log(furnitures);
  return (
    <div className="container mt-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold text-left">Furnitures</h2>
        <span className="font-light  hover:border-b-2 border-primary underline-offset-4 ">
          View All
        </span>
      </div>
      <div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-2">
          {furnitures?.map((item) => (
            <FurnitureCard key={item._id} furniture={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Furniture;

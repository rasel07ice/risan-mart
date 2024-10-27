import { useEffect, useState } from "react";
import FurnitureCard from "./FurnitureCard";
// import { useFetchAllProductsQuery } from "@/redux/features/products/productsApi";
// import { getProducts } from "@/services/api";
// import axios from "axios";
import axiosInstance from "@/services/api";

const TopSeller = () => {
  const [furnitures, setFurnitures] = useState([]);

  const getAllProducts = async () => {
    const response = await axiosInstance.get("products");
    return response.data;
  };

  useEffect(() => {
    const getAllFurnitures = async () => {
      const allFurnitures = await getAllProducts();
      if (allFurnitures.products) {
        const topSellFurniture = allFurnitures.products.filter(
          (item) => item.trending === true
        );
        setFurnitures(topSellFurniture);
      }
    };
    getAllFurnitures();
  }, []);
  console.log(furnitures);

  return (
    <div className="my-8 container">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold text-left">Top New Furniture</h2>
        <span className="font-light  hover:border-b-2 border-primary underline-offset-4 ">
          View All
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-2">
        {furnitures?.map((item) => (
          <FurnitureCard key={item._id} furniture={item} />
        ))}
      </div>
    </div>
  );
};

export default TopSeller;

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axiosInstance from "@/services/api";
import CategoryCard from "./CategoryCard";

const ShopByCategory = () => {
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    const response = await axiosInstance.get("categories");
    return response.data;
  };

  useEffect(() => {
    const fetchAllCategories = async () => {
      const allCategories = await getAllCategories();
      console.log(allCategories)
      if (allCategories.categories) {
        setCategories(allCategories.categories);
      }
    };
    fetchAllCategories();
  }, []);

  return (
    <div className="container">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold text-left">Shop By Category</h2>
        <span className="font-light  hover:border-b-2 border-primary underline-offset-4 ">
          View All
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 items-center">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;

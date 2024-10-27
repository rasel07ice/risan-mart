import ShopByCategory from "@/components/category/ShopByCategory";
import Furniture from "@/components/products/Furniture";
import { useAuth } from "@/context/AuthProvider";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const categoryName = useParams();
  const { user, sayHello } = useAuth();
  console.log("user from product:", user);
  return (
    <div className="mt-6">
      <ShopByCategory />
      <Furniture categoryName={categoryName} />
    </div>
  );
};

export default ProductPage;

import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const CategoryCard = ({ category }) => {
  return (
    <div className="relative group">
      <img
        className="opacity-75 w-full h-32 object-cover group-hover:opacity-100"
        src={category?.coverImage}
        alt=""
      />
      <div className="absolute inset-0 flex items-center justify-center ">
        <span className="group-hover:hidden text-white border-b-2 border-primary underline-offset-4">
          {category?.name}
        </span>
        <Link to={`/products/category/${category?.name}`}>
          <Button size="sm" className="hidden group-hover:block">
            View Products
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;

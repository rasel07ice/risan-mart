import { addToCart } from "@/redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const FurnitureCard = ({ furniture }) => {
  const dispatch = useDispatch();
  const handleCart = (item) => {
    console.log("item:", item.furniture);
    dispatch(addToCart(item.furniture));
  };
  return (
    <div className="">
      <div className="h-full rounded-sm shadow-cla-pink bg-gradient-to-r from-fuchsia-50 to-pink-50 overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover scale-110 transition-all duration-400 hover:scale-100"
          src={furniture?.coverImage}
          alt="blog"
        />
        <div className="p-6 text-left">
          <Link to={`/products/${furniture._id}`}>
            <h2 className="text-xl font-semibold text-secondary">
              {furniture?.title.length > 25
                ? `${furniture?.title.slice(0, 25)} .....`
                : furniture?.title}
            </h2>
          </Link>

          <h1 className="text-lg font-semibold text-primary mb-3">
            ${furniture?.newPrice}&nbsp;&nbsp;&nbsp;
            <span className="text-gray-500 line-through text-sm">
              ${furniture?.oldPrice}
            </span>
          </h1>
        </div>
        <div className="flex items-center flex-wrap ">
          <button
            onClick={() => {
              handleCart({ furniture });
            }}
            className="w-full bg-primary text-primary-foreground px-3 py-2"
          >
            Add to card
          </button>
        </div>
      </div>
    </div>
  );
};

export default FurnitureCard;

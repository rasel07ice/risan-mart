import { FaBagShopping, FaRegUser } from "react-icons/fa6";
import { IoMdHeartEmpty, IoMdSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UpperNavber = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);
  return (
    <div className="container flex flex-row items-center pb-4 justify-between text-black">
      <div>
        <h2 className="uppercase text-2xl font-semibold">
          <span className="text-primary">Risan </span>Mart
        </h2>
      </div>
      <div>
        <div className="flex flex-row items-center group">
          <IoMdSearch className="absolute ml-2 text-lg text-slate-400" />
          <input
            className="border border-primary p-1 rounded-ss-md rounded-bl-md pl-7 focus:outline focus:outline-primary"
            type="text"
            placeholder="search"
            name="inSearch"
          ></input>
          <span className="bg-primary border border-primary py-1 px-2 rounded-br-md rounded-tr-md text-primary-foreground font-light">
            Search
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-3">
        <div className="relative flex flex-col items-center">
          <span className="absolute -top-1 right-0 bg-primary py-[1px] px-[4px] rounded-full text-xs">
            8
          </span>
          <IoMdHeartEmpty className="text-2xl" />
          <p className="text-xs font-light">Wishlist</p>
        </div>
        <Link to="/cart">
          <div className="relative flex flex-col items-center">
            <span className="absolute -top-1 -right-2 bg-primary py-[1px] px-[4px] rounded-full text-xs">
              {cartItems && cartItems.length}
            </span>
            <FaBagShopping className="text-2xl" />
            <p className="text-xs font-light">Cart</p>
          </div>
        </Link>

        <div className="relative flex flex-col items-center">
          <FaRegUser className="text-2xl" />
          <p className="text-xs font-light">Account</p>
        </div>
      </div>
    </div>
  );
};

export default UpperNavber;

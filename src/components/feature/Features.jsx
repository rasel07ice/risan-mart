import { FaHandHoldingDollar } from "react-icons/fa6";
import { FiTruck } from "react-icons/fi";
import { Ri24HoursLine } from "react-icons/ri";

const Features = () => {
  return (
    <div className="my-8">
      <div className="px-10 flex items-center justify-center gap-6">
        <div className="flex border border-primary rounded-sm px-16 py-8 gap-3">
          <FiTruck className="text-5xl text-primary" />
          <div>
            <p className="text-lg font-semibold">Free Shipping</p>
            <p className="font-light">Order over $200</p>
          </div>
        </div>

        <div className="flex border border-primary rounded-sm px-16 py-8 gap-3">
          <FaHandHoldingDollar className="text-5xl text-primary" />
          <div>
            <p className="text-lg font-semibold">Free Shipping</p>
            <p className="font-light">Order over $200</p>
          </div>
        </div>
        <div className="flex border border-primary rounded-sm px-16 py-8 gap-3">
          <Ri24HoursLine className="text-5xl text-primary" />
          <div>
            <p className="text-lg font-semibold">Free Shipping</p>
            <p className="font-light">Order over $200</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;

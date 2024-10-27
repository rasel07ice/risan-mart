import { useAuth } from "@/context/AuthProvider";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CartPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems.reduce((accumulator, item) => {
    return (accumulator += item.newPrice);
  }, 0);

  const handlePurchase = () => {
    toast.success("Product Status", {
      description: ` Your order is submitted! check your email for details`,
      action: {
        label: "Close",
        onClick: () => console.log("Undo"),
      },
    });
    navigate("/products");
  };
  const handleDelete = () => {
    console.log("deleted");
  };

  return (
    <div className="container mt-8 overflow-x-auto">
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
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {cartItems.map((item) => (
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
              <th className="space-x-1">
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
        <tfoot>
          <tr>
            <th></th>
            <th></th>
            <th>Sub Total</th>
            <th>{totalPrice}</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
      <div className="flex justify-end">
        <button
          className="px-3 py-2 bg-secondary rounded-md text-white"
          type="button"
          onClick={() => document.getElementById("order_modal").showModal()}
        >
          {" "}
          Buy Now
        </button>
      </div>
      <dialog id="order_modal" className="modal">
        <div className="modal-box max-w-none w-3/6">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-secondary">
              ✕
            </button>
          </form>
          <div className="p-4">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Number of Products</th>
                  <th>Total Price</th>
                  <th>Adress</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}

                <tr>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{cartItems.length}</td>
                  <td>{totalPrice}</td>
                  <td>
                    <input
                      type="text"
                      name="address"
                      placeholder="enter address"
                      id="address"
                    />
                  </td>
                  <th className="space-x-1">
                    <Link
                      className="btn btn-ghost btn-xs bg-primary"
                      onClick={handlePurchase}
                    >
                      Purchase
                    </Link>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CartPage;

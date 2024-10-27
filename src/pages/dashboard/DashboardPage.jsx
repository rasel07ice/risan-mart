import { useAuth } from "@/context/AuthProvider";
import { FaUser } from "react-icons/fa";
import { MdSystemSecurityUpdateGood } from "react-icons/md";
import { Link, Navigate, Outlet } from "react-router-dom";

const DashboardPage = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  // } return <Navigate to="/login" />;
  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 justify-center md:grid-cols-5">
        <div className="col-span-1">
          <div className="flex flex-col items-center">
            <img
              className="size-24 rounded-full"
              src={user?.photoUrl}
              alt="image"
            />
            <p className="text-sm">Faiya Karim Sarkar Risan</p>
            <p className="text-sm">
              <span>Email:</span>risan@gmail.com
            </p>
          </div>
          <ul className="menu menu-xs bg-base-200 rounded-lg w-full max-w-xs text-lg">
            <li>
              <details open>
                <summary>
                  <MdSystemSecurityUpdateGood />
                  Category
                </summary>
                <ul>
                  <li>
                    <Link to="/dashboard/category">Categories</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/addCategory">Add Category</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details open>
                <summary>
                  <MdSystemSecurityUpdateGood />
                  Products
                </summary>
                <ul>
                  <li>
                    <Link to="/dashboard/products">Products</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/AddProduct">Add Product</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details open>
                <summary>
                  <FaUser />
                  Users
                </summary>
                <ul>
                  <li>
                    <Link to="/dashboard/users">Users</Link>
                  </li>
                  <li>
                    <a>Customer</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>@sareng Tech.com</a>
            </li>
          </ul>
        </div>
        <div className="col-span-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

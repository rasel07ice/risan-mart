import { FiLogIn } from "react-icons/fi";
import {
  MdBorderColor,
  MdOutlineAppSettingsAlt,
  MdOutlineShoppingCartCheckout,
} from "react-icons/md";
import { TiShoppingCart, TiThMenu } from "react-icons/ti";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthProvider";
import { Button } from "../ui/button";

const Navbar = () => {
  const { user, userLogOut } = useAuth();
  const navigate = useNavigate();

  // const currentUser = {
  //   displayName: "rasel",
  //   email: "rasel@gmail.com",
  //   photoURL:
  //     "https://yt3.ggpht.com/yti/ANjgQV-SzNXqRTJKqehLjTkt3oG1KCsyJiLWjNTGSJ4EADdRcA=s88-c-k-c0x00ffffff-no-rj",
  // };

  const handleSignOut = () => {
    userLogOut().then(() => {
      toast.success("log out Status", {
        description: `User log out successfully `,
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });
      navigate("/");
    });
  };
  return (
    <header className="bg-secondary sticky top-0 z-10">
      <div className="container navbar text-primary-foreground z-10 py-0 md:px-8 lg:px-24 xl:px-32">
        <div className="navbar-start max-w-60 h-16 mr-12 bg-primary flex items-center justify-center">
          <div className="hidden md:flex w-full  items-center justify-center gap-2 text-primary-foreground">
            <TiThMenu className="text-xl" />
            <span className="text-xl">All Categories</span>
          </div>
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle  md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-[1] bg-secondary mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Products</Link>
              </li>

              <li>
                <Link to="/contactus">Contact Us</Link>
              </li>
              <li className="bg-secondary">
                <details>
                  <summary>More</summary>
                  <ul className="p-2 z-10">
                    <li>
                      <Link to="/howitworks">How it Works</Link>
                    </li>
                    <li>
                      <Link to="/imagegallery">Image Gallary</Link>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
        <div className="hidden md:flex navbar-center">
          <ul className="menu menu-horizontal px-1 space-x-1 text-[12px]">
            <li id="idHome">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active" : "hover:bg-primary"
                }
              >
                Home
              </NavLink>
            </li>
            <li id="idCourses">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? "active" : "hover:bg-primary"
                }
              >
                Products
              </NavLink>
            </li>

            <li id="idContact">
              <NavLink
                to="/contactus"
                className={({ isActive }) =>
                  isActive ? "active" : "hover:bg-primary"
                }
              >
                Contact Us
              </NavLink>
            </li>
            <li>
              <details>
                <summary>More</summary>
                <ul className="p-2 z-10">
                  <li id="idHow">
                    <NavLink
                      to="/howitworks"
                      className={({ isActive }) =>
                        isActive ? "active " : "hover:bg-primary"
                      }
                    >
                      How it Works
                    </NavLink>
                  </li>

                  <li id="idImage">
                    <NavLink
                      to="/imagegallery"
                      className={({ isActive }) =>
                        isActive ? "active" : "hover:bg-primary"
                      }
                    >
                      Image Gallary
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col -space-y-2">
                <span className="text-primary text-sm">Hi!</span>
                <span className="text-lg font-semibold text-secondary">
                  {user?.displayName}
                </span>
              </div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle flex flex-row avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user?.photoURL}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-secondary rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link className="justify-between" to="/">
                      Dashboard
                      <span className="badge">
                        <MdOutlineAppSettingsAlt className="text-primary" />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link className="justify-between" to="/">
                      Orders
                      <span className="badge">
                        <MdBorderColor className="text-primary" />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link className="justify-between" to="/cart">
                      Cart Pages
                      <span className="badge">
                        <TiShoppingCart className="text-primary" />
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link className="justify-between" to="/">
                      Check out
                      <span className="badge">
                        <MdOutlineShoppingCartCheckout className="text-primary" />
                      </span>
                    </Link>
                  </li>
                  <li className="">
                    <div>
                      <Link to="/">
                        <Button
                          className="w-4/5 mx-auto"
                          onClick={handleSignOut}
                        >
                          Sign Out
                        </Button>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-x-1 flex flex-row">
              <Link to="/login">
                <Button className="" variant="outline">
                  Login{" "}
                  <span className="ml-1 text-sm">
                    <FiLogIn />
                  </span>
                </Button>
              </Link>

              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

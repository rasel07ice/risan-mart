import axiosInstance from "@/services/api";
import { GoogleAuthProvider } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthProvider";

const Login = () => {
  const { setUser, signIn, loginWithGmail } = useAuth();
  const googleAuthProvider = new GoogleAuthProvider();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password).then((result) => {
      console.log("email:", result);
      axiosInstance.get(`users/user/${result.user.email}`).then((res) => {
        const retriveduser = res.data.user;
        console.log(retriveduser.role);
        if (retriveduser.role === "admin") {
          navigate("/dashboard");
        }
      });
      toast.success("Login Status", {
        description: "User Login Successful!",
        action: {
          label: "Close",
          onClick: () => console.log("Undo"),
        },
      });
      navigate("/");
    });
  };

  // const handleSubmitEvent = (e) => {
  //   e.preventDefault();
  //   signIn(input.email, input.password)
  //     .then((result) => {
  //       console.log(result.user);
  //       toast.success("Login Status", {
  //         description: "User Login Successful!",
  //         action: {
  //           label: "Close",
  //           onClick: () => console.log("Undo"),
  //         },
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       toast.error("Login Status", {
  //         description: `User Login failled! ${error.message}`,
  //         action: {
  //           label: "Close",
  //           onClick: () => console.log("Undo"),
  //         },
  //       });
  //     });
  // };

  const handleLoginWithGoogle = () => {
    loginWithGmail(googleAuthProvider)
      .then((result) => {
        toast.success("Login Status", {
          description: "User Login Successful!",
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
        navigate("/");
      })
      .catch((error) => {
        toast.error("Login Status", {
          description: `User Login failled! ${error.message}`,
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
      });
  };

  return (
    <div className="text-gray-900 flex justify-center mt-6">
      <div className="max-w-6xl bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src="https://img.freepik.com/premium-vector/gray-user-icon-inside-circular-frame-simple-head-shoulders-silhouette-representsa_213497-5015.jpg?semt=ais_hybrid"
              className="w-32 mx-auto"
            />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign In</h1>
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <button
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                  onClick={handleLoginWithGoogle}
                >
                  <div className="bg-white p-2 rounded-full">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                  </div>
                  <span className="ml-4">Sign In with Google</span>
                </button>

                {/* <button
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5"
                  onClick={handleLoginWithGithub}
                >
                  <div className=""></div>
                  <span className="border-2 border-gray-100 rounded-full">
                    <i className="fa-brands text-xl fa-github"></i>
                  </span>

                  <span className="ml-4">Sign In with GitHub</span>
                </button> */}
              </div>

              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign in with e-mail
                </div>
              </div>

              <div className="mx-auto max-w-xs">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    name="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />
                  {errors.email?.type === "required" && (
                    <p
                      role="alert"
                      className="text-left text-primary text-sm italic"
                    >
                      * email is required
                    </p>
                  )}
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    name="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  {errors.password?.type === "required" && (
                    <p
                      role="alert"
                      className="text-left text-primary text-sm italic"
                    >
                      * password is required
                    </p>
                  )}
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <span className="ml-3">Sign In</span>
                  </button>
                </form>
                <p className="mt-6 text-xs  text-gray-600 text-center">
                  Not register yet?{" "}
                  <Link
                    className="italic text-primary underline"
                    to="/register"
                  >
                    Create new Account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full rounded-md bg-contain bg-center bg-no-repeat bg-[url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')]"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;

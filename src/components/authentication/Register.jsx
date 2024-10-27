import { useAuth } from "@/context/AuthProvider";
import axiosInstance from "@/services/api";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const imageHostKey = "56ee418a5ebf12871c85f1cf09692847";

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        console.log(user.uid);
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((imgData) => {
            if (imgData.success) {
              console.log(imgData);
              const newUser = {
                firebaseUid: user.uid,
                name: data.fullName,
                email: data.email,
                password: data.password,
                photoUrl: imgData.data.url,
                phone: data.phone,
              };
              axiosInstance.post("/users", newUser).then((res) => {
                if (res.data.status === "success") {
                  toast.success("Registration Status", {
                    description: ` ${res.data.message}`,
                    action: {
                      label: "Close",
                      onClick: () => console.log("Undo"),
                    },
                  });
                  navigate("/login");
                } else {
                  toast.error("Registration Status", {
                    description: ` ${res.data.message}`,
                    action: {
                      label: "Close",
                      onClick: () => console.log("Undo"),
                    },
                  });
                }
              });
            }
          });
      })
      .catch((error) => {
        toast.error("Registration Status", {
          description: `User Login failled! ${error.message}`,
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
      });
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
          Or
          <a
            href="#"
            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            login to your account
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-left text-sm font-medium leading-5 text-gray-700">
                Full name
              </label>
              <div>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex h-10 items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-secondary text-primary-foreground sm:text-sm">
                    <FaUser />
                  </span>
                  <input
                    id="fullName"
                    name="fullName"
                    placeholder="risan"
                    type="text"
                    {...register("fullName", { required: true })}
                    className="flex-1  border border-gray-300 form-input pl-3 block w-full rounded-none rounded-r-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out  sm:text-sm sm:leading-5"
                  />
                </div>
                {errors.fullName?.type === "required" && (
                  <p
                    role="alert"
                    className="text-left text-primary text-sm italic"
                  >
                    * full name is required
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-left text-sm font-medium leading-5 text-gray-700">
                Email
              </label>
              <div>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex h-10 items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-secondary text-primary-foreground sm:text-sm">
                    <MdEmail />
                  </span>
                  <input
                    id="email"
                    name="email"
                    placeholder="example@gmail.com"
                    type="text"
                    {...register("email", { required: true })}
                    className="flex-1  border border-gray-300 form-input pl-3 block w-full rounded-none rounded-r-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out  sm:text-sm sm:leading-5"
                  />
                </div>
                {errors.email?.type === "required" && (
                  <p
                    role="alert"
                    className="text-left text-primary text-sm italic"
                  >
                    * email is required
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-left text-sm font-medium leading-5 text-gray-700">
                Phone
              </label>
              <div>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex h-10 items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-secondary text-primary-foreground sm:text-sm">
                    <FaPhoneFlip />
                  </span>
                  <input
                    id="phone"
                    name="phone"
                    placeholder="01767326285"
                    type="text"
                    {...register("phone", { required: true })}
                    className="flex-1  border border-gray-300 form-input pl-3 block w-full rounded-none rounded-r-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out  sm:text-sm sm:leading-5"
                  />
                </div>
                {errors.phone?.type === "required" && (
                  <p
                    role="alert"
                    className="text-left text-primary text-sm italic"
                  >
                    * phone is required
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-left text-sm font-medium leading-5 text-gray-700">
                Phone
              </label>
              <div>
                <div className="mt-1 flex items-center rounded-md shadow-sm">
                  <span className="inline-flex h-10 items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-secondary text-primary-foreground sm:text-sm">
                    Photo
                  </span>
                  <input
                    type="file"
                    {...register("image", {
                      required: "Photo is Required",
                    })}
                    className="flex-1 p-1  border border-gray-300 form-input pl-3 block w-full rounded-none rounded-r-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out  sm:text-sm sm:leading-5"
                  />
                </div>
                {errors.image?.type === "required" && (
                  <p
                    role="alert"
                    className="text-left text-primary text-sm italic"
                  >
                    * phone is required
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-left text-sm font-medium leading-5 text-gray-700">
                Password
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  {...register("password", {
                    required: true,
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                {errors.password?.type === "required" && (
                  <p
                    role="alert"
                    className="text-left text-primary text-sm italic"
                  >
                    * password is required
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-left text-sm font-medium leading-5 text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  {...register("password_confirmation", {
                    required: true,
                    validate: (val) => {
                      if (watch("password") != val) {
                        return "Your passwords do no match";
                      }
                    },
                  })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                {errors.password_confirmation && (
                  <p className="text-left text-primary text-sm italic">
                    *{" "}
                    {errors.password_confirmation.message
                      ? errors.password_confirmation.message
                      : "confirm password is required"}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary  focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  Create account
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

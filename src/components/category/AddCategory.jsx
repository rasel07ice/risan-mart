import axiosInstance from "@/services/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { category: "" },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const imageHostKey = "56ee418a5ebf12871c85f1cf09692847";
  const handleAddCategory = (data) => {
    setIsSubmitting(true);
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
          // console.log(data);
          const category = {
            name: data.name,
            description: data.description,   
            coverImage: imgData.data.url,
          };

          axiosInstance.post("/categories", category).then((res) => {
            if (res.data.category) {
              toast.success("category Status", {
                description: ` ${res.data.message}`,
                action: {
                  label: "Close",
                  onClick: () => console.log("Undo"),
                },
              });
              reset();
              setIsSubmitting(false);
            } else {
              toast.error("category Status", {
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
  };
  return (
    <div>
      <div className="w-10/12 p-7 mx-auto">
        <h2 className="text-2xl text-[#FF652E] md:text-center text-left font-bold">
          Add a Category
        </h2>
        <form
          onSubmit={handleSubmit(handleAddCategory)}
          className="border shadow-lg py-2 px-6 mt-3 flex flex-col md:flex-row"
        >
          <div>
            <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
              <div className="flex input-bordered rounded-none">
                <label className="label">
                  {" "}
                  <span className="label-text ">Category Name:</span>
                </label>

                <input
                  type="text"
                  {...register("name", {
                    required: "Category Name is Required",
                  })}
                  className="flex-1  border border-gray-300 form-input pl-3 block w-full rounded-none rounded-r-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out  sm:text-sm sm:leading-5"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
              <div className="flex justify-center items-center  max-w-xs">
                <label className="label">
                  {" "}
                  <span className="label-text">Upload Photo:</span>
                </label>
                <input
                  type="file"
                  {...register("image", {
                    required: "Photo is Required",
                  })}
                  className="flex-1  border border-gray-300 form-input pl-3 block w-full rounded-none rounded-r-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out  sm:text-sm sm:leading-5"
                />
                {errors.image && (
                  <p className="text-red-500 text-xs">{errors.image.message}</p>
                )}
              </div>
            </div>
            <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
              <div className="flex input-bordered rounded-none">
                <label className="label">
                  {" "}
                  <span className="label-text ">Description:</span>
                </label>

                <input
                  type="text"
                  {...register("description", {
                    required: false,
                  })}
                  className="flex-1  border border-gray-300 form-input pl-3 block w-full rounded-none rounded-r-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out  sm:text-sm sm:leading-5"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <input
                className="bg-secondary px-5 py-2 text-white rounded-none mt-1"
                disabled={isSubmitting}
                value={isSubmitting ? "Adding Category" : "Add Category"}
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;

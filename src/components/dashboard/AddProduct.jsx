import axiosInstance from "@/services/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddProduct = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { category: "" },
  });
  const [categories, setCategories] = useState([]);
  const [categoryObject, setCategoryObject] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const imageHostKey = "56ee418a5ebf12871c85f1cf09692847";

  const getAllCategories = async () => {
    const response = await axiosInstance.get("categories");
    return response.data;
  };

  useEffect(() => {
    const fetchAllCategories = async () => {
      const allCategories = await getAllCategories();
      if (allCategories.categories) {
        setCategories(allCategories.categories);
        // Create category object after fetching categories
        // as we need to insert category._id while adding product into DB.
        const tempCategoryObject = {};
        allCategories.categories.forEach((category) => {
          tempCategoryObject[category.name] = category._id;
        });
        setCategoryObject(tempCategoryObject);
      }
    };
    fetchAllCategories();
  }, []);

  console.log(categories);

  const handleAddProduct = (data) => {
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
          const product = {
            title: data.name,
            description: data.description,
            category: data.category,
            trending: data.trending,
            coverImage: imgData.data.url,
            oldPrice: data.oldPrice,
            newPrice: data.newPrice,
          };

          axiosInstance.post("/products", product).then((res) => {
            if (res.data.product) {
              toast.success("Product Status", {
                description: ` ${res.data.message}`,
                action: {
                  label: "Close",
                  onClick: () => console.log("Undo"),
                },
              });
              reset();
              setIsSubmitting(false);
            } else {
              toast.error("Product Status", {
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
          Add a Product
        </h2>
        <form
          onSubmit={handleSubmit(handleAddProduct)}
          className="border shadow-lg py-2 px-6 mt-3 flex flex-col md:flex-row"
        >
          <div>
            <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
              <div className="flex input-bordered rounded-none">
                <label className="label">
                  {" "}
                  <span className="label-text ">Product Name:</span>
                </label>

                <input
                  type="text"
                  {...register("name", {
                    required: "Product Name is Required",
                  })}
                  className="flex-1  border border-gray-300 form-input pl-3 block w-full rounded-none rounded-r-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out  sm:text-sm sm:leading-5"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            <div className="flex justify-center w-full max-w-xs items-center border p-2 border-indigo-400 mb-3">
              <div className="flex form-control w-11/12 max-w-xs mr-4 mt-1">
                <label className="label">
                  {" "}
                  <span className="label-text ">Old Price</span>
                </label>

                <input
                  type="text"
                  {...register("oldPrice", {
                    required: "Old Price Required",
                  })}
                  className="flex-1 py-2 border border-gray-300 form-input pl-3 block w-full rounded-none rounded-r-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out  sm:text-sm sm:leading-5"
                />
                {errors.oldPrice && (
                  <p className="text-red-600 text-xs">
                    {errors.oldPrice.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center w-full max-w-xs items-center border p-2 border-indigo-400 mb-3">
              <div className="form-control w-11/12 max-w-xs mr-4 mt-1">
                <label className="label">
                  {" "}
                  <span className="label-text ">New Price</span>
                </label>

                <input
                  type="text"
                  {...register("newPrice", {
                    required: "New Price Required",
                  })}
                  className="flex-1 py-2 border border-gray-300 form-input pl-3 block w-full rounded-none rounded-r-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out  sm:text-sm sm:leading-5"
                />
                {errors.newPrice && (
                  <p className="text-red-600 text-xs">
                    {errors.newPrice.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-center w-full max-w-xs items-center border p-2 border-indigo-400 mb-3">
              <div className="flex gap-2 w-11/12 max-w-xs mr-4 mt-1">
                <label className="label">
                  {" "}
                  <span className="label-text ">Trending</span>
                </label>

                <input type="checkbox" {...register("trending")} className="" />
              </div>
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
          </div>

          <div className="ml-0 md:ml-12">
            <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
              <div className="flex justify-center items-center  max-w-xs">
                <label className="label">
                  {" "}
                  <span className="label-text">Product Category:</span>
                </label>
                <select
                  {...register("category", {
                    required: "Category is Required",
                  })}
                  className="flex-1 py-3  border border-gray-300 form-input pl-3 block w-full rounded-none rounded-r-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out  sm:text-sm sm:leading-5"
                >
                  <option disabled value="">
                    select category
                  </option>
                  {Object.keys(categoryObject)?.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              {errors.category && (
                <p className="text-red-500 text-xs">
                  {errors.category.message}
                </p>
              )}
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
                value={isSubmitting ? "Adding Product" : "Add Product"}
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

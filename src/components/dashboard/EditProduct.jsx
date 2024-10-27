import axiosInstance from "@/services/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditProduct = () => {
  const { id } = useParams();
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { category: "" },
  });

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState("");
  const [categoryObject, setCategoryObject] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const getAllCategories = async () => {
    const response = await axiosInstance.get("categories");
    return response.data;
  };

  const getProduct = async () => {
    const response = await axiosInstance.get(`products/${id}`);
    return response.data;
  };

  useEffect(() => {
    const getOriginalProduct = async () => {
      const originalProduct = await getProduct();
      console.log(originalProduct.product);
      if (originalProduct.product) {
        setProduct(originalProduct.product);
        setValue("name", originalProduct.product.title);
        setValue("oldPrice", originalProduct.product.oldPrice);
        setValue("newPrice", originalProduct.product.newPrice);
        setValue("trending", originalProduct.product.trending);
        setValue("description", originalProduct.product.description);
        setValue("category", originalProduct.product.category);
      }
    };
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
    getOriginalProduct();
  }, []);

  const handleAddProduct = (data) => {
    setIsSubmitting(true);
    const newProduct = {
      title: data.name,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: data.oldPrice,
      newPrice: data.newPrice,
    };

    axiosInstance.put(`/products/${product._id}`, newProduct).then((res) => {
    
      if (res.data.updatedProduct) {
        toast.success("Product Status", {
          description: ` ${res.data.message}`,
          action: {
            label: "Close",
            onClick: () => console.log("Undo"),
          },
        });
        setIsSubmitting(false);
        console.log("submit:", isSubmitting);
        navigate("/dashboard/products");
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
    // const image = data.image[0];
    // const formData = new FormData();
    // formData.append("image", image);
    // const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    // fetch(url, {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((imgData) => {
    //     if (imgData.success) {

    //       const newProduct = {
    //         title: data.name,
    //         description: data.description,
    //         category: data.category,
    //         trending: data.trending,
    //         oldPrice: data.oldPrice,
    //         newPrice: data.newPrice,
    //       };

    //       axiosInstance
    //         .put(`/products/${product._id}`, newProduct)
    //         .then((res) => {
    //           if (res.data.product) {
    //             toast.success("Product Status", {
    //               description: ` ${res.data.message}`,
    //               action: {
    //                 label: "Close",
    //                 onClick: () => console.log("Undo"),
    //               },
    //             });
    //             reset();
    //             setIsSubmitting(false);
    //           } else {
    //             toast.error("Product Status", {
    //               description: ` ${res.data.message}`,
    //               action: {
    //                 label: "Close",
    //                 onClick: () => console.log("Undo"),
    //               },
    //             });
    //           }
    //         });
    //     }
    //   });
  };
  return (
    <div>
      <div className="w-10/12 p-7">
        <h2 className="text-2xl text-[#FF652E] md:text-center text-left font-bold">
          Update Product
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
              <div className="form-control w-11/12 max-w-xs mr-4 mt-1">
                <label className="label">
                  {" "}
                  <span className="label-text ">Old Price</span>
                </label>

                <input
                  type="text"
                  {...register("oldPrice", {
                    required: "Old Price Required",
                  })}
                  className="flex-1  border border-gray-300 form-input pl-3 block w-full rounded-none rounded-r-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out  sm:text-sm sm:leading-5"
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
                  className="flex-1  border border-gray-300 form-input pl-3 block w-full rounded-none rounded-r-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out  sm:text-sm sm:leading-5"
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

                <input
                  type="checkbox"
                  {...register("trending")}
                  className="items-center justify-center"
                />
              </div>
            </div>

            {/* <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
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
                  className="input input-bordered w-full max-w-xs p-1 rounded-none bg-white"
                />
                {errors.image && (
                  <p className="text-red-500 text-xs">{errors.image.message}</p>
                )}
              </div>
            </div> */}
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
                  className="input input-bordered w-full max-w-xs rounded-none text-sm bg-white"
                  value={product.category}
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
                  className="input input-bordered w-full max-w-xs rounded-none bg-white"
                />
              </div>
            </div>
            <input
              className="btn btn-info md:w-80 w-64 rounded-none mt-1"
              disabled={isSubmitting}
              value={isSubmitting ? "Updating Product" : "Update Product"}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;

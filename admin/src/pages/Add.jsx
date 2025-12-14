import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [brand, setBrand] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Color options for Abasi products
  const colorOptions = [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Black & White", hex: "linear-gradient(90deg, #000000 50%, #FFFFFF 50%)" },
    { name: "White & Black", hex: "linear-gradient(90deg, #FFFFFF 50%, #000000 50%)" },
    { name: "Black & Baby Pink", hex: "linear-gradient(90deg, #000000 50%, #FFB6C1 50%)" },
    { name: "White & Baby Pink", hex: "linear-gradient(90deg, #FFFFFF 50%, #FFB6C1 50%)" },
    { name: "White & Lilac", hex: "linear-gradient(90deg, #FFFFFF 50%, #C8A2C8 50%)" },
  ];

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("brand", brand);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("colors", JSON.stringify(colors));
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setSizes([]);
        setColors([]);
        setBestSeller(false);
        setBrand("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-bold text-black text-3xl">Add New Product</h1>
          <p className="mt-2 text-gray-600">
            Fill in the details below to add a new product to your inventory
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-8">
          {/* Product Images Section */}
          <div className="bg-white shadow-lg p-6 border border-gray-200 rounded-xl">
            <div className="flex items-center gap-2 mb-6">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h2 className="font-bold text-black text-xl">Product Images</h2>
            </div>
            <p className="mb-4 text-gray-600 text-sm">Upload up to 4 images of your product</p>
            <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
              {[
                { img: image1, setter: setImage1, id: "image1" },
                { img: image2, setter: setImage2, id: "image2" },
                { img: image3, setter: setImage3, id: "image3" },
                { img: image4, setter: setImage4, id: "image4" },
              ].map(({ img, setter, id }, i) => (
                <label
                  htmlFor={id}
                  key={i}
                  className="group relative border-2 border-gray-300 hover:border-blue-400 border-dashed rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
                >
                  <div className="flex justify-center items-center bg-gray-50 group-hover:bg-blue-50 w-full h-40 transition-colors">
                    {!img ? (
                      <div className="flex flex-col items-center">
                        <svg
                          className="mb-2 w-10 h-10 text-gray-400 group-hover:text-blue-400 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        <span className="text-gray-500 text-xs">Upload</span>
                      </div>
                    ) : (
                      <img
                        className="w-full h-full object-cover"
                        src={URL.createObjectURL(img)}
                        alt={`upload-${i}`}
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    id={id}
                    hidden
                    accept="image/*"
                    onChange={(e) => setter(e.target.files[0])}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Basic Information Section */}
          <div className="bg-white shadow-lg p-6 border border-gray-200 rounded-xl">
            <div className="flex items-center gap-2 mb-6">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="font-bold text-black text-xl">Basic Information</h2>
            </div>

            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block mb-2 font-medium text-black text-sm">
                  Product Name *
                </label>
                <input
                  className="px-4 py-3 border-2 border-gray-300 focus:border-blue-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 w-full transition-all"
                  type="text"
                  placeholder="e.g., Men's Cotton T-Shirt"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Product Description */}
              <div>
                <label className="block mb-2 font-medium text-black text-sm">
                  Product Description *
                </label>
                <textarea
                  className="px-4 py-3 border-2 border-gray-300 focus:border-blue-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 w-full min-h-[120px] transition-all resize-none"
                  placeholder="Describe your product in detail..."
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Category & Pricing Section */}
          <div className="bg-white shadow-lg p-6 border border-gray-200 rounded-xl">
            <div className="flex items-center gap-2 mb-6">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              <h2 className="font-bold text-black text-xl">Category & Pricing</h2>
            </div>

            <div className="gap-4 grid grid-cols-1 sm:grid-cols-4">
              <div>
                <label className="block mb-2 font-medium text-black text-sm">
                  Category *
                </label>
                <select
                  className="px-4 py-3 border-2 border-gray-300 focus:border-blue-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 w-full transition-all cursor-pointer"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium text-black text-sm">
                  Subcategory *
                </label>
                <select
                  className="px-4 py-3 border-2 border-gray-300 focus:border-blue-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 w-full transition-all cursor-pointer"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                >
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  <option value="Winterwear">Winterwear</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium text-black text-sm">
                  Brand / Collection
                </label>
                <input
                  type="text"
                  placeholder="e.g., Dove Collection"
                  className="px-4 py-3 border-2 border-gray-300 focus:border-blue-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 w-full transition-all"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-black text-sm">
                  Price (₦) *
                </label>
                <input
                  type="number"
                  placeholder="e.g., 5000"
                  className="px-4 py-3 border-2 border-gray-300 focus:border-blue-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 w-full transition-all"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Sizes, Colors & Options Section */}
          <div className="bg-white shadow-lg p-6 border border-gray-200 rounded-xl">
            <div className="flex items-center gap-2 mb-6">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              <h2 className="font-bold text-black text-xl">Sizes, Colors & Options</h2>
            </div>

            <div className="space-y-6">
              {/* Product Sizes */}
              <div>
                <label className="block mb-3 font-medium text-black text-sm">
                  Available Sizes *
                </label>
                <div className="flex flex-wrap gap-3">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() =>
                        setSizes((prev) =>
                          prev.includes(size)
                            ? prev.filter((s) => s !== size)
                            : [...prev, size]
                        )
                      }
                      className={`px-6 py-3 border-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                        sizes.includes(size)
                          ? "bg-blue-400 text-white border-blue-400 scale-105 shadow-lg"
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Colors */}
              <div>
                <label className="block mb-3 font-medium text-black text-sm">
                  Available Colors *
                </label>
                <div className="gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                  {colorOptions.map((color) => (
                    <button
                      type="button"
                      key={color.name}
                      onClick={() =>
                        setColors((prev) =>
                          prev.includes(color.name)
                            ? prev.filter((c) => c !== color.name)
                            : [...prev, color.name]
                        )
                      }
                      className={`flex items-center gap-3 px-4 py-3 border-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                        colors.includes(color.name)
                          ? "bg-blue-50 text-blue-600 border-blue-400 scale-105 shadow-lg"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border-2 ${
                          color.name === "White" ? "border-gray-300" : "border-transparent"
                        }`}
                        style={{
                          background: color.hex.includes("gradient")
                            ? color.hex
                            : color.hex,
                        }}
                      />
                      <span className="flex-1 text-left">{color.name}</span>
                      {colors.includes(color.name) && (
                        <svg
                          className="w-5 h-5 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-gray-500 text-xs">
                  Select all available color variations for this product (e.g., "Black & Baby Pink" for raglan sleeves)
                </p>
              </div>

              {/* Best Seller Checkbox */}
              <div className="flex items-center gap-3 bg-blue-50 p-4 border-2 border-blue-200 rounded-lg">
                <input
                  type="checkbox"
                  id="bestSeller"
                  checked={bestSeller}
                  onChange={() => setBestSeller((prev) => !prev)}
                  className="border-gray-300 rounded focus:ring-2 focus:ring-blue-400 w-5 h-5 text-blue-400 cursor-pointer"
                />
                <label
                  htmlFor="bestSeller"
                  className="flex items-center gap-2 font-medium text-black cursor-pointer"
                >
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                  Add to Best Seller Collection
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setName("");
                setDescription("");
                setPrice("");
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setSizes([]);
                setColors([]);
                setBestSeller(false);
                setBrand("");
              }}
              className="bg-white hover:bg-gray-100 shadow-md px-8 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 transition-all"
            >
              Reset Form
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-black hover:bg-gray-800 disabled:opacity-50 shadow-lg hover:shadow-xl px-8 py-3 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300 disabled:cursor-not-allowed transform"
            >
              {loading ? (
                <>
                  <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></div>
                  Adding Product...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
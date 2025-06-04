import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
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
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));
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
        setName('');
        setDescription('');
        setPrice('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col gap-5 mx-auto p-4 sm:p-6 w-full max-w-screen-md"
    >
      {/* Upload Images */}
      <div>
        <p className="mb-2 font-medium">Upload Images</p>
        <div className="flex flex-wrap gap-3">
          {[image1, image2, image3, image4].map((img, i) => (
            <label htmlFor={`image${i + 1}`} key={i}>
              <img
                className="border rounded w-20 h-20 object-cover cursor-pointer"
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt={`upload-${i}`}
              />
              <input
                type="file"
                id={`image${i + 1}`}
                hidden
                onChange={(e) => {
                  const setImage = [setImage1, setImage2, setImage3, setImage4][i];
                  setImage(e.target.files[0]);
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div>
        <p className="mb-1 font-medium">Product Name</p>
        <input
          className="px-3 py-2 border rounded w-full"
          type="text"
          placeholder="Enter product name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Product Description */}
      <div>
        <p className="mb-1 font-medium">Product Description</p>
        <textarea
          className="px-3 py-2 border rounded w-full min-h-[100px] resize-none"
          placeholder="Write description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Category, Subcategory, Price */}
      <div className="flex sm:flex-row flex-col gap-4">
        <div className="flex-1">
          <p className="mb-1 font-medium">Category</p>
          <select
            className="px-3 py-2 border rounded w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="flex-1">
          <p className="mb-1 font-medium">Subcategory</p>
          <select
            className="px-3 py-2 border rounded w-full"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div className="flex-1">
          <p className="mb-1 font-medium">Price</p>
          <input
            type="number"
            placeholder="25"
            className="px-3 py-2 border rounded w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Product Sizes */}
      <div>
        <p className="mb-2 font-medium">Product Sizes</p>
        <div className="flex flex-wrap gap-2">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size]
                )
              }
              className={`px-4 py-1 border rounded cursor-pointer ${
                sizes.includes(size) ? "bg-pink-200 border-pink-400" : "bg-slate-100"
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Best Seller Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="bestSeller"
          checked={bestSeller}
          onChange={() => setBestSeller((prev) => !prev)}
        />
        <label htmlFor="bestSeller" className="cursor-pointer">
          Add to Best Seller
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-black hover:bg-gray-800 py-2 rounded w-32 text-white"
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;

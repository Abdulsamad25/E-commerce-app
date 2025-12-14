/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Edit = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    bestSeller: false,
  });

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  // FETCH SINGLE PRODUCT
  const fetchProduct = async () => {
    try {
      const res = await axios.post(backendUrl + "/api/product/single", {
        productId: id,
      });

      if (res.data.success) {
        const p = res.data.product;

        setFormData({
          name: p.name,
          description: p.description,
          price: p.price,
          category: p.category,
          brand: p.brand,
          sizes: p.sizes,
          colors: p.colors,
          bestSeller: p.bestSeller,
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // SUBMIT UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updating) return;

    try {
      setUpdating(true);

      const data = new FormData();
      data.append("id", id);

      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          data.append(key, JSON.stringify(value));
        } else {
          data.append(key, value);
        }
      });

      Object.entries(images).forEach(([key, file]) => {
        if (file) {
          data.append(key, file);
        }
      });

      const res = await axios.post(
        backendUrl + "/api/product/update",
        data,
        {
          headers: {
            token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Product updated successfully");
        navigate("/list");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow mx-auto p-6 rounded-xl max-w-3xl"
    >
      <h2 className="mb-6 font-bold text-2xl">Edit Product</h2>

      {/* NAME */}
      <input
        className="mb-4 p-3 border rounded w-full"
        placeholder="Product name"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
        required
      />

      {/* DESCRIPTION */}
      <textarea
        className="mb-4 p-3 border rounded w-full"
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        required
      />

      {/* PRICE */}
      <input
        type="number"
        className="mb-4 p-3 border rounded w-full"
        placeholder="Price"
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: e.target.value })
        }
        required
      />

      {/* IMAGES */}
      <div className="mb-6">
        <p className="mb-2 font-semibold text-sm">
          Update Images (optional)
        </p>

        {["image1", "image2", "image3", "image4"].map((key) => (
          <input
            key={key}
            type="file"
            accept="image/*"
            className="block mb-3"
            onChange={(e) =>
              setImages({ ...images, [key]: e.target.files[0] })
            }
          />
        ))}
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={updating}
        className={`px-6 py-3 rounded-lg w-full text-white transition
          ${
            updating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }
        `}
      >
        {updating ? (
          <span className="flex justify-center items-center gap-2">
            <span className="border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></span>
            Updating...
          </span>
        ) : (
          "Update Product"
        )}
      </button>
    </form>
  );
};

export default Edit;

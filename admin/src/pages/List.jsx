import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({token}) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
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

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        {id},
        {headers:{token}}
      );

      if(response.data.success){
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-4 border-black border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="font-bold text-black text-3xl">Product Inventory</h1>
              <p className="mt-2 text-gray-600">
                Manage and organize your products
              </p>
            </div>
            <div className="flex items-center gap-3 bg-blue-50 shadow-sm px-6 py-3 border border-blue-200 rounded-xl">
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
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <span className="font-semibold text-black text-lg">
                {list.length} {list.length === 1 ? 'Product' : 'Products'}
              </span>
            </div>
          </div>
        </div>

        {list.length === 0 ? (
          <div className="flex flex-col justify-center items-center bg-gray-50 py-16 border-2 border-gray-200 border-dashed rounded-xl">
            <svg
              className="mb-4 w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="font-medium text-gray-600 text-lg">No products found</p>
            <p className="mt-1 text-gray-500 text-sm">Add your first product to get started</p>
          </div>
        ) : (
          /* Card Grid Layout */
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white shadow-lg hover:shadow-2xl border border-gray-200 hover:border-blue-400 rounded-xl overflow-hidden transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative bg-gray-50 p-4 w-full h-64 overflow-hidden">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="rounded-lg w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Category Badge */}
                  <div className="top-4 left-4 absolute">
                    <span className="bg-white shadow-md px-3 py-1.5 rounded-full font-medium text-black text-xs">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="mb-3 font-semibold text-black text-lg line-clamp-2">
                    {item.name}
                  </h3>

                  {/* Price */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-gray-500 text-xs">Price</p>
                      <p className="font-bold text-black text-2xl">
                        {currency}{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button 
                    onClick={() => removeProduct(item._id)}
                    className="flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 shadow-md hover:shadow-lg px-4 py-3 rounded-lg w-full font-semibold text-white hover:scale-105 transition-all duration-300 cursor-pointer transform"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
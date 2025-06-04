import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  const removeProduct = async (id) =>{
    try {
      
      const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers:{token}})

      if(response.data.success){
        toast.success(response.data.message)
        await fetchList();
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
     toast.error(error.data.message)
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full">
      <p className="mb-4 font-semibold text-lg">All Products List</p>

      <div className="flex flex-col gap-4">
        {/* Desktop Table Header */}
        <div className="hidden gap-x-4 md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-gray-100 shadow-sm px-4 py-3 rounded-md font-medium text-sm">
          <p className="text-center">Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p className="text-center">Action</p>
        </div>

        {/* Desktop Product Rows */}
        {list.map((item, index) => (
          <div
            key={index}
            className="hidden items-center gap-x-4 md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-white shadow-md px-4 py-3 rounded-md text-sm"
          >
            <div className="flex justify-center">
              <img
                src={item.image[0]}
                alt={item.name}
                className="rounded w-15 object-cover"
              />
            </div>
            <p className="truncate">{item.name}</p>
            <p className="truncate">{item.category}</p>
            <p className="whitespace-nowrap">{currency}{item.price}</p>
            <div className="text-center">
              <button onClick={()=>removeProduct(item._id)} className="text-red-500 cursor-pointer">X</button>
            </div>
          </div>
        ))}

        {/* Mobile Layout */}
        {list.map((item, index) => (
          <div
            key={index}
            className="md:hidden gap-2 grid bg-white shadow-md p-4 rounded-md text-sm gi"
          >
            <img
              src={item.image[0]}
              alt={item.name}
              className="mb-2 rounded w-full object-contain"
            />
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Price:</strong> {currency}{item.price}</p>
            <button onClick={()=>removeProduct(item._id)} className="mt-2 w-fit text-red-500">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

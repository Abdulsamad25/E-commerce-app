/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios"
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₦";
  const delivery_fee = 3000;
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const [token, setToken] = useState("")
  const [products, setProducts] = useState([])


  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if(token) {
      try {
        await axios.post(backendUrl + '/api/cart/add',{itemId,size}, {headers:{token}} )
      } catch (error) {
       
        toast.error(error.message)
      }
    }

    
  };


  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch {
          // Intentionally ignore errors
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
    if (token) {

      try {
        await axios.post(backendUrl + '/api/cart/update',{itemId, size, quantity}, {headers:{token}} )
      } catch (error) {
       
        toast.error(error.message)
      }

      
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for(const items in cartItems){
      let itemInfor = products.find((product) => product._id === items);
      for (const item in cartItems[items]){
        try {
          if (cartItems [items][item] > 0){
            totalAmount += itemInfor.price * cartItems[items][item]
          }
        } catch {
          // Intentionally ignore errors
        }
      }
    }
    return totalAmount
  }


  const getProductsData = async () =>{
    try {

     const response = await axios.get(backendUrl + '/api/product/list')
     if(response.data.success){
      setProducts(response.data.products)
     }else{
      toast.error(response.data.message)
     }
      
    } catch (error) {
    
      toast.error(error.message)
    }
  }

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers:{token}})
      if (response.data.success) {
        setCartItems(response.data.cartData)
      }
    } catch (error) {
    
      toast.error(error.message)
    }
  }

  // Auto-logout after 1 hour of inactivity
  useEffect(() => {
    const checkTokenExpiry = () => {
      const loginTime = localStorage.getItem('loginTime');
      const storedToken = localStorage.getItem('token');
      
      if (storedToken && loginTime) {
        const currentTime = Date.now();
        const timeElapsed = currentTime - parseInt(loginTime);
        const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
        
        if (timeElapsed > oneHour) {
          // Token expired - logout user
          localStorage.removeItem('token');
          localStorage.removeItem('loginTime');
          setToken('');
          setCartItems({});
          toast.info('Session expired. Please login again.');
          navigate('/login');
        }
      }
    };

    // Check immediately on mount
    checkTokenExpiry();

    // Check every 5 minutes
    const interval = setInterval(checkTokenExpiry, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  // Reset timer on user activity
  useEffect(() => {
    const resetLoginTime = () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        localStorage.setItem('loginTime', Date.now().toString());
      }
    };

    // Reset timer on user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      window.addEventListener(event, resetLoginTime);
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetLoginTime);
      });
    };
  }, []);

  useEffect(()=>{
    getProductsData()
  },[])

  useEffect(()=>{
    if (!token && localStorage.getItem('token')) {
      setToken( localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
    }
  },[])

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    setCartItems
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};


export default ShopContextProvider;

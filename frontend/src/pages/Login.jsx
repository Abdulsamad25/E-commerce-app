import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() =>{
    if(token){
      navigate("/");
    }
  },[token])

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center gap-4 m-auto mt-14 w-[90%] sm:max-w-96 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">{currentState}</p>
        <hr className="bg-gray-800 border-none w-8 h-[1.5px]" />
      </div>

      {currentState === "Login" ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="px-3 py-2 border border-gray-900 w-full"
          placeholder="Name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="px-3 py-2 border border-gray-900 w-full"
        placeholder="Email"
        required
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="px-3 py-2 border border-gray-900 w-full"
        placeholder="Password"
        required
      />

      <div className="flex justify-between mt-[8px] w-full text-sm">
        <p className="cursor-pointer">Forgot your Password</p>
        <p
          className="cursor-pointer"
          onClick={() =>
            setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
          }
        >
          {currentState === "Login" ? "Create account" : "Login Here"}
        </p>
      </div>

      <button className="bg-black mt-4 px-8 py-2 font-light text-white cursor-pointer">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;

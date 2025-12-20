import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const { backendUrl, navigate } = useContext(ShopContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${backendUrl}/api/user/reset-password/${token}`,
        { password }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 m-auto mt-0 mb-20 w-[90%] sm:max-w-md text-gray-800">
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">Reset Password</p>
        <hr className="bg-gray-800 border-none w-8 h-[1.5px]" />
      </div>

      <p className="text-gray-600 text-sm text-center">
        Enter your new password below.
      </p>

      <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 mt-6 w-full">
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className="px-3 py-2 border border-gray-900 w-full"
          placeholder="New Password"
          required
        />

        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          type="password"
          className="px-3 py-2 border border-gray-900 w-full"
          placeholder="Confirm New Password"
          required
        />

        <p className="text-gray-600 text-xs">
          Password must be at least 8 characters long.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="bg-black disabled:opacity-50 mt-4 px-8 py-2 font-light text-white cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        <p
          onClick={() => navigate("/login")}
          className="mt-2 text-blue-600 text-sm text-center hover:underline cursor-pointer"
        >
          Back to Login
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const { backendUrl, navigate } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLink, setResetLink] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/api/user/forgot-password`, {
        email,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setResetLink(response.data.resetUrl);
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
        <p className="text-3xl prata-regular">Forgot Password</p>
        <hr className="bg-gray-800 border-none w-8 h-[1.5px]" />
      </div>

      <p className="text-gray-600 text-sm text-center">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      {!resetLink ? (
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 mt-6 w-full">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="px-3 py-2 border border-gray-900 w-full"
            placeholder="Your email address"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-black disabled:opacity-50 mt-4 px-8 py-2 font-light text-white cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p
            onClick={() => navigate("/login")}
            className="mt-2 text-blue-600 text-sm text-center hover:underline cursor-pointer"
          >
            Back to Login
          </p>
        </form>
      ) : (
        <div className="bg-green-50 mt-6 p-6 border border-green-200 rounded-lg w-full">
          <p className="mb-4 font-semibold text-green-800">Reset Link Generated!</p>
          <p className="mb-4 text-gray-700 text-sm">
            Copy the link below and paste it in your browser to reset your password:
          </p>
          <div className="bg-white p-3 border border-gray-300 rounded text-sm break-all">
            {resetLink}
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(resetLink);
              toast.success("Link copied to clipboard!");
            }}
            className="bg-black hover:bg-gray-800 mt-4 px-6 py-2 rounded w-full font-light text-white transition-colors"
          >
            Copy Link
          </button>
          <p className="mt-4 text-gray-600 text-xs text-center">
            Note: This link is valid for 1 hour only.
          </p>
          <p
            onClick={() => navigate("/login")}
            className="mt-4 text-blue-600 text-sm text-center hover:underline cursor-pointer"
          >
            Back to Login
          </p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
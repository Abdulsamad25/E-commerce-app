import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Settings = ({ token, setToken }) => {
  const [activeTab, setActiveTab] = useState("password");
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState({ name: "", email: "" });

  // Password state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Email state
  const [emailForm, setEmailForm] = useState({
    newEmail: "",
    password: "",
  });

  // Name state
  const [nameForm, setNameForm] = useState({
    newName: "",
  });

  // Fetch admin profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(
          backendUrl + "/api/admin/profile",
          {},
          { headers: { token } }
        );

        if (response.data.success) {
          setAdminData(response.data.admin);
          setNameForm({ newName: response.data.admin.name });
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [token]);

  // Handle password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        backendUrl + "/api/admin/update-password",
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Password updated successfully! Please login again.");
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        
        // Auto logout after 2 seconds
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("loginTime");
          setToken("");
        }, 2000);
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

  // Handle email update
  const handleEmailUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        backendUrl + "/api/admin/update-email",
        {
          newEmail: emailForm.newEmail,
          password: emailForm.password,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Email updated successfully! Please login again.");
        setEmailForm({ newEmail: "", password: "" });
        
        // Update token if provided
        if (response.data.token) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        }
        
        // Refresh admin data
        setAdminData({ ...adminData, email: emailForm.newEmail });
        
        // Auto logout after 2 seconds
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("loginTime");
          setToken("");
        }, 2000);
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

  // Handle name update
  const handleNameUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        backendUrl + "/api/admin/update-name",
        { newName: nameForm.newName },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Name updated successfully!");
        setAdminData({ ...adminData, name: nameForm.newName });
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
          <h1 className="font-bold text-black text-3xl">Account Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your admin account settings and preferences
          </p>
        </div>

        {/* Admin Info Card */}
        <div className="bg-gradient-to-r from-black to-gray-800 shadow-xl mb-8 p-6 rounded-xl">
          <div className="flex items-center gap-4">
            <div className="flex flex-shrink-0 justify-center items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-full w-16 h-16">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <h2 className="font-bold text-white text-xl">{adminData.name}</h2>
              <p className="text-gray-300">{adminData.email}</p>
              <span className="inline-block bg-blue-400 mt-2 px-3 py-1 rounded-full font-semibold text-white text-xs">
                Administrator
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-gray-200 border-b">
          <button
            onClick={() => setActiveTab("password")}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-all duration-300 ${
              activeTab === "password"
                ? "border-black border-b-2 text-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Password
          </button>
          <button
            onClick={() => setActiveTab("email")}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-all duration-300 ${
              activeTab === "email"
                ? "border-black border-b-2 text-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Email
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-all duration-300 ${
              activeTab === "profile"
                ? "border-black border-b-2 text-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Profile
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow-lg p-6 border-2 border-gray-200 rounded-xl">
          {/* Password Tab */}
          {activeTab === "password" && (
            <div>
              <div className="mb-6">
                <h3 className="mb-2 font-bold text-black text-xl">
                  Change Password
                </h3>
                <p className="text-gray-600 text-sm">
                  Update your password to keep your account secure. You'll be
                  logged out after changing your password.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block mb-2 font-semibold text-black text-sm">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value,
                      })
                    }
                    className="px-4 py-3 border-2 border-gray-200 focus:border-blue-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 w-full transition-all"
                    placeholder="Enter current password"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-black text-sm">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    className="px-4 py-3 border-2 border-gray-200 focus:border-blue-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 w-full transition-all"
                    placeholder="Enter new password (min 8 characters)"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-black text-sm">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="px-4 py-3 border-2 border-gray-200 focus:border-blue-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 w-full transition-all"
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <button
                  onClick={handlePasswordUpdate}
                  disabled={loading}
                  className="flex justify-center items-center gap-2 bg-black hover:bg-gray-800 disabled:hover:bg-black disabled:opacity-50 shadow-lg hover:shadow-xl px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></div>
                      Updating...
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Update Password
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Email Tab */}
          {activeTab === "email" && (
            <div>
              <div className="mb-6">
                <h3 className="mb-2 font-bold text-black text-xl">
                  Change Email Address
                </h3>
                <p className="text-gray-600 text-sm">
                  Update your email address. You'll need to confirm with your
                  password. You'll be logged out after changing your email.
                </p>
              </div>

              <div className="bg-blue-50 mb-6 p-4 border-2 border-blue-200 rounded-lg">
                <p className="text-blue-700 text-sm">
                  <strong>Current Email:</strong> {adminData.email}
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block mb-2 font-semibold text-black text-sm">
                    New Email Address
                  </label>
                  <input
                    type="email"
                    value={emailForm.newEmail}
                    onChange={(e) =>
                      setEmailForm({ ...emailForm, newEmail: e.target.value })
                    }
                    className="px-4 py-3 border-2 border-gray-200 focus:border-blue-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 w-full transition-all"
                    placeholder="Enter new email address"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-black text-sm">
                    Confirm with Password
                  </label>
                  <input
                    type="password"
                    value={emailForm.password}
                    onChange={(e) =>
                      setEmailForm({ ...emailForm, password: e.target.value })
                    }
                    className="px-4 py-3 border-2 border-gray-200 focus:border-blue-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 w-full transition-all"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <button
                  onClick={handleEmailUpdate}
                  disabled={loading}
                  className="flex justify-center items-center gap-2 bg-black hover:bg-gray-800 disabled:hover:bg-black disabled:opacity-50 shadow-lg hover:shadow-xl px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></div>
                      Updating...
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Update Email
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div>
              <div className="mb-6">
                <h3 className="mb-2 font-bold text-black text-xl">
                  Profile Information
                </h3>
                <p className="text-gray-600 text-sm">
                  Update your profile information and display name.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block mb-2 font-semibold text-black text-sm">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={nameForm.newName}
                    onChange={(e) =>
                      setNameForm({ newName: e.target.value })
                    }
                    className="px-4 py-3 border-2 border-gray-200 focus:border-blue-400 rounded-lg outline-none focus:ring-2 focus:ring-blue-100 w-full transition-all"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="bg-gray-50 p-4 border-2 border-gray-200 rounded-lg">
                  <h4 className="mb-2 font-semibold text-black text-sm">
                    Account Information
                  </h4>
                  <div className="space-y-2 text-gray-600 text-sm">
                    <p>
                      <strong>Email:</strong> {adminData.email}
                    </p>
                    <p>
                      <strong>Role:</strong> Administrator
                    </p>
                    <p>
                      <strong>Account Created:</strong>{" "}
                      {new Date(adminData.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNameUpdate}
                  disabled={loading}
                  className="flex justify-center items-center gap-2 bg-black hover:bg-gray-800 disabled:hover:bg-black disabled:opacity-50 shadow-lg hover:shadow-xl px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></div>
                      Updating...
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Update Name
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="flex items-start gap-3 bg-yellow-50 mt-6 p-4 border-2 border-yellow-200 rounded-lg">
          <svg
            className="flex-shrink-0 mt-0.5 w-5 h-5 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <h4 className="mb-1 font-semibold text-yellow-800 text-sm">
              Security Notice
            </h4>
            <p className="text-yellow-700 text-xs">
              After changing your password or email, you'll be automatically
              logged out. Please login again with your new credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
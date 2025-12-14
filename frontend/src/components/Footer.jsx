import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="bg-black text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl">
        <div className="flex flex-col gap-14 sm:grid sm:grid-cols-[3fr_1fr_1fr] text-sm">
          {/* Brand Section */}
          <div>
            <img
              src={assets.abasi}
              className="brightness-0 invert mb-5 w-32"
              alt="Abasi Logo"
            />
            <p className="w-full md:w-2/3 text-gray-300 leading-relaxed">
              Elevating your style with premium fashion pieces. Discover
              timeless elegance and modern trends in every collection.
            </p>
            {/* Social Media Links */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.tiktok.com/@shopabasi"
                className="flex justify-center items-center bg-white/10 hover:bg-blue-400 rounded-full w-10 h-10 hover:scale-110 transition-all duration-300"
              >
                <svg
  className="w-6 h-6"
  fill="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.75 2.9 2.9 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.15 6.15 0 0 0-1-.08A6.59 6.59 0 0 0 5 20.1a6.6 6.6 0 0 0 10.86-4.43v-7a8.42 8.42 0 0 0 4.86 1.44V9.75a4.87 4.87 0 0 1-.41-.025Z" />
</svg>
              </a>
              <a
                href="https://www.instagram.com/shopabasi?igsh=MTZvcnJ5dnAyOHhmcw=="
                className="flex justify-center items-center bg-white/10 hover:bg-blue-400 rounded-full w-10 h-10 hover:scale-110 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="flex justify-center items-center bg-white/10 hover:bg-blue-400 rounded-full w-10 h-10 hover:scale-110 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.207-6.81-5.974 6.81H2.882l7.732-8.835L1.227 2.25h6.802l4.721 6.237 5.462-6.237zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <p className="mb-5 font-semibold text-white text-xl">COMPANY</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="/"
                  className="inline-block text-gray-300 hover:text-blue-400 transition-colors hover:translate-x-1 duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="inline-block text-gray-300 hover:text-blue-400 transition-colors hover:translate-x-1 duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/collection"
                  className="inline-block text-gray-300 hover:text-blue-400 transition-colors hover:translate-x-1 duration-300"
                >
                  Collection
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="inline-block text-gray-300 hover:text-blue-400 transition-colors hover:translate-x-1 duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <p className="mb-5 font-semibold text-white text-xl">
              GET IN TOUCH
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="tel:+2348162421557"
                  className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300"
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +234 816 242 1557
                </a>
              </li>
              <li>
                <a
                  href="mailto:abasiszn@gmail.com"
                  className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300"
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                 abasiszn@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-white/10 border-t">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <p className="py-6 text-gray-400 text-sm text-center">
            Copyright 2025 ©{" "}
            <span className="font-medium text-white">Shopabasi.com</span> - All
            Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

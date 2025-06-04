import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
      <div className="pt-10 border-t text-2xl text-center">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="flex md:flex-row flex-col justify-center gap-10 my-10 mb-28">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-[480px]"
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="text-gray-700 text-xl semi-bold">Our Store</p>
          <p className="text-gray-500">
            54709 Willims Station <br /> Suite 350, Washignton, USA
          </p>
          <p className="text-gray-500">
            Tel: (415) 555-0132 <br /> Email: admin@forever.com
          </p>
          <p className="font-semibold text-gray-600 text-xl">
            Careers at Forever
          </p>
          <p className="text-gray-500">
            Learn more about our team and job openings
          </p>
          <button className="hover:bg-black px-8 py-4 border border-black hover:text-white text-sm transition-all duration-500 cursor-pointer">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  );
};

export default Contact;

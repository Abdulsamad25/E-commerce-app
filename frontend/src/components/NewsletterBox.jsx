import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  }
  return (
    <div className="text-center">
      <p className="font-medium text-gray-800 text-2xl">
        Subscribe Now & 20% off
      </p>
      <p className="mt-3 text-gray-400">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, vitae.
      </p>
      <form onSubmit={onSubmitHandler} className="flex items-center gap-3 mx-auto my-6 pl-3 border w-full sm:w-1/2">
        <input type="email" placeholder="Enter Your Email" className="flex-1 outline-none w-full" required />
        <button type="submit" className="bg-black px-10 py-4 text-white text-xs">Subscribe</button>
      </form>
    </div>
  );
};

export default NewsletterBox;

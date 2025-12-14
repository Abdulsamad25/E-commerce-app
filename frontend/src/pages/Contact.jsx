import React, { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to Formspree
      const response = await axios.post(
        "https://formspree.io/f/xldqvlak",
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
        },
        {
          headers: {
            'Accept': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: ""
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-black px-4 py-16 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-3 font-bold text-4xl md:text-5xl">GET IN TOUCH</h1>
          <div className="bg-blue-400 mx-auto mb-4 w-24 h-1"></div>
          <p className="mx-auto max-w-2xl text-gray-300">
            We'd love to hear from you. Reach out to the Abasi team for any questions or assistance
          </p>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-7xl">
        {/* Main Content */}
        <div className="flex lg:flex-row flex-col gap-12 mb-16">
          {/* Image Section */}
          <div className="lg:w-1/2">
            <img
              src={assets.brand_shoot_third}
              className="shadow-2xl rounded-2xl w-full h-full object-cover"
              alt="Contact Abasi"
            />
          </div>

          {/* Contact Info Section */}
          <div className="flex flex-col justify-center gap-8 lg:w-1/2">
            {/* Contact Details */}
            <div className="bg-white shadow-lg p-6 border-blue-400 border-l-4 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="flex flex-shrink-0 justify-center items-center bg-blue-400 rounded-lg w-12 h-12">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 font-bold text-gray-900 text-xl">Contact Information</h3>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href="tel:+2341234567890" className="hover:text-blue-400 transition-colors">
                        +234 816 242 1557
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href="mailto:abasiszn@gmail.com" className="hover:text-blue-400 transition-colors">
                        abasiszn@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white shadow-lg p-6 border-blue-400 border-l-4 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="flex flex-shrink-0 justify-center items-center bg-blue-400 rounded-lg w-12 h-12">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 font-bold text-gray-900 text-xl">Business Hours</h3>
                  <div className="space-y-1 text-gray-600">
                    <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                    <p>Saturday: 10:00 AM - 6:00 PM</p>
                    <p>Sunday: 12:00 PM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white shadow-xl mt-16 p-8 lg:p-12 rounded-2xl">
          <div className="mb-8 text-center">
            <h2 className="mb-3 font-bold text-3xl">Send Us a Message</h2>
            <p className="text-gray-600">Have a question? Fill out the form below and we'll get back to you shortly</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 mx-auto max-w-2xl">
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              <div>
                <label className="block mb-2 font-semibold text-gray-700 text-sm">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-400 w-full transition-all"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold text-gray-700 text-sm">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-400 w-full transition-all"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-2 font-semibold text-gray-700 text-sm">
                Email <span className="text-red-500">*</span>
              </label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-400 w-full transition-all"
                placeholder="john.doe@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold text-gray-700 text-sm">
                Subject <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-400 w-full transition-all"
                placeholder="How can we help you?"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2 font-semibold text-gray-700 text-sm">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea 
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="px-4 py-3 border border-gray-300 focus:border-transparent rounded-lg focus:ring-2 focus:ring-blue-400 w-full transition-all resize-none"
                placeholder="Tell us more about your inquiry..."
                required
              ></textarea>
            </div>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`bg-black hover:bg-blue-400 shadow-lg py-4 rounded-lg w-full font-semibold text-white hover:scale-105 transition-all duration-300 transform ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span className="flex justify-center items-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
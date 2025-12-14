// app/reviews/page.js
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Reviews() {
  const [activeTab, setActiveTab] = useState("how-it-works");

  const tabs = [
    { id: "how-it-works", label: "How It Works" },
    { id: "sample-reviews", label: "Sample Reviews" },
    { id: "testimonials", label: "Testimonials" }
  ];

  const HowItWorksContent = () => (
    <div className="space-y-8">
      <motion.h3
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold text-gray-800">
        How Our Review System Works
      </motion.h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {[
            {
              step: "1. Setup",
              title: "Create Your Account",
              desc: "Sign up in minutes and configure your business profile with your logo, contact info, and branding."
            },
            {
              step: "2. Generate", 
              title: "Create QR Codes",
              desc: "Generate unique QR codes for locations, tables, or events. Customize the review form to match your needs."
            },
            {
              step: "3. Collect",
              title: "Gather Feedback",
              desc: "Place QR codes where customers can easily scan them. They submit reviews directly from their phones—no apps needed."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                {item.step}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="space-y-6">
          {[
            {
              step: "4. Analyze",
              title: "Monitor Dashboard",
              desc: "View real-time analytics, sentiment trends, and response tools in your intuitive dashboard."
            },
            {
              step: "5. Respond",
              title: "Engage Customers",
              desc: "Reply to reviews publicly or privately. Send thank-yous or address concerns to build loyalty."
            },
            {
              step: "6. Integrate",
              title: "Boost Visibility",
              desc: "Automatically direct positive reviewers to Google, Facebook, and other platforms for more 5-star ratings."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm mt-0.5">
                {item.step}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center mt-8 p-6 bg-white rounded-2xl shadow-lg"
      >
        <svg className="w-16 h-16 mx-auto mb-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h4 className="text-xl font-bold text-gray-800 mb-2">95% Faster Setup</h4>
        <p className="text-gray-600">Most businesses are collecting reviews within 10 minutes of signing up.</p>
      </motion.div>
    </div>
  );

  const SampleReviewsContent = () => (
    <div className="space-y-6">
      <motion.h3
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold text-gray-800"
      >
        Sample Customer Reviews
      </motion.h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            rating: 5,
            author: "Sarah M.",
            text: "This QR code system is a game-changer for our restaurant! Customers love how easy it is to leave feedback right at the table.",
            date: "Oct 15, 2025"
          },
          {
            rating: 4,
            author: "Mike R.",
            text: "Great dashboard for tracking reviews across multiple locations. The analytics helped us improve our service scores by 20%.",
            date: "Nov 01, 2025"
          },
          {
            rating: 5,
            author: "Emily T.",
            text: "Seamless integration with Google Reviews. We've seen a 150% increase in positive online mentions since implementing this.",
            date: "Nov 05, 2025"
          },
          {
            rating: 5,
            author: "David K.",
            text: "Simple, affordable, and effective. The notification system keeps us on top of every review instantly.",
            date: "Nov 08, 2025"
          },
          {
            rating: 4,
            author: "Lisa P.",
            text: "Love the customizable forms. Adding photo uploads was perfect for our retail business to see product feedback visually.",
            date: "Nov 09, 2025"
          },
          {
            rating: 5,
            author: "Tom H.",
            text: "As a small business owner, this has been invaluable. Genuine feedback that's easy to act on—highly recommend!",
            date: "Nov 09, 2025"
          }
        ].map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
          >
            <div className="flex items-center mb-3">
              {[...Array(review.rating)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              {[...Array(5 - review.rating)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 mb-4">"{review.text}"</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{review.author}</span>
              <span>{review.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const TestimonialsContent = () => (
    <div className="space-y-8">
      <motion.h3
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold text-gray-800"
      >
        What Our Customers Say
      </motion.h3>
      <div className="grid md:grid-cols-2 gap-8">
        {[
          {
            quote: "Review Us has transformed how we handle customer feedback. The QR codes are genius, and the analytics are spot-on. Our response times have improved dramatically, leading to happier customers and better reviews.",
            author: "Jennifer L., Cafe Owner",
            company: "Brew Haven Coffee",
            avatar: "☕"
          },
          {
            quote: "As a multi-location retailer, managing reviews was a nightmare. Now with Review Us, we have centralized control, real-time alerts, and tools to encourage more positive Google reviews. ROI was immediate!",
            author: "Mark S., Retail Manager",
            company: "Urban Outfitters Chain",
            avatar: "🛍️",
          },
          {
            quote: "The ease of setup and the beautiful dashboard make this a no-brainer for any service business. We've collected over 500 reviews in the first month, and our Net Promoter Score jumped from 45 to 78.",
            author: "Rachel K., Salon Owner",
            company: "Glamour Cuts",
            avatar: "💇‍♀️"
          },
          {
            quote: "Integration with our POS system and the spam detection features saved us hours of manual work. Highly customizable and scales perfectly as we expand to new cities.",
            author: "Alex T., Franchise Director",
            company: "Quick Bites",
            avatar: "🍔"
          }
        ].map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100"
          >
            <div className="text-6xl mb-4">{testimonial.avatar}</div>
            <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
            <div className="text-right">
              <p className="font-semibold text-gray-800">{testimonial.author}</p>
              <p className="text-sm text-purple-600">{testimonial.company}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "how-it-works":
        return <HowItWorksContent />;
      case "sample-reviews":
        return <SampleReviewsContent />;
      case "testimonials":
        return <TestimonialsContent />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Reviews & Feedback</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover how our intelligent review system works and see real examples from satisfied customers.
          </p>
        </motion.div>
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 bg-white rounded-lg p-1 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-md font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
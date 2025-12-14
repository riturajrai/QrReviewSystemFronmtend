"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <style jsx global>{`
        html, body {
          font-size: 14px;
        }
        @media (min-width: 768px) {
          html, body {
            font-size: 16px;
          }
        }
      `}</style>
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-purple-50 via-pink-100 to-purple-100 overflow-hidden px-4 sm:px-6">
        {/* Background Glow Effects */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-purple-300 rounded-full blur-3xl opacity-30"
        ></motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] bg-pink-300 rounded-full blur-3xl opacity-20 -bottom-20 -left-20"
        ></motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto z-10">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-800 mb-6 leading-tight"
          >
            Transform Customer Feedback into <span className="text-purple-600">Business Growth</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-gray-600 text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8 px-2"
          >
            Streamline your review collection process with QR codes, manage customer feedback effectively, 
            and build a powerful online reputation that drives more business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          >
            <motion.a
              href="#features"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="px-8 py-4 bg-purple-600 text-white font-semibold rounded-full shadow-lg hover:bg-purple-700 transition-all text-base sm:text-lg w-full sm:w-auto text-center"
            >
              Explore Features
            </motion.a>
            <motion.a
              href="#demo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="px-8 py-4 border-2 border-purple-600 text-purple-600 font-semibold rounded-full hover:bg-purple-600 hover:text-white transition-all text-base sm:text-lg w-full sm:w-auto text-center"
            >
              Live Demo
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: "95%", label: "Faster Review Collection" },
              { number: "4.8★", label: "Average Rating" },
              { number: "200%", label: "More Google Reviews" },
              { number: "24/7", label: "Feedback Monitoring" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm sm:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Powerful Features for Modern Businesses
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
              Everything you need to collect, manage, and leverage customer reviews to grow your business
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Smart QR Code Review System",
                desc: "Generate unique QR codes for each location or table. Customers simply scan to access your review page instantly on their mobile devices. No apps to download, no complicated links to type.",
                icon: (
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
                features: ["Mobile-optimized", "Instant access", "No app required"]
              },
              {
                title: "Comprehensive Feedback Collection",
                desc: "Capture detailed customer insights with customizable forms including star ratings, comments, photos, and contact information. Understand exactly what your customers love and where you can improve.",
                icon: (
                  <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ),
                features: ["Star ratings", "Photo uploads", "Custom fields"]
              },
              {
                title: "Multi-Platform Review Integration",
                desc: "Seamlessly redirect satisfied customers to post reviews on Google, Facebook, Yelp, and other platforms with a single click. Boost your online presence across all major review sites.",
                icon: (
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                features: ["Google Reviews", "Facebook Reviews", "Multiple platforms"]
              },
              {
                title: "Advanced Admin Dashboard",
                desc: "Gain valuable insights with our comprehensive dashboard featuring real-time analytics, review trends, sentiment analysis, and export capabilities. Make data-driven decisions to improve your business.",
                icon: (
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                features: ["Real-time analytics", "Sentiment analysis", "Export data"]
              },
              {
                title: "Instant Notification System",
                desc: "Stay informed immediately when new reviews come in. Receive email or SMS notifications with review details so you can respond promptly and show customers you care.",
                icon: (
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                ),
                features: ["Email alerts", "SMS notifications", "Quick response"]
              },
              {
                title: "Enterprise-Grade Management",
                desc: "Manage multiple business locations with separate QR codes and review streams. Advanced spam protection with reCAPTCHA ensures you only get genuine customer feedback.",
                icon: (
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                features: ["Multi-location", "Spam protection", "Role-based access"]
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4 text-purple-600">{feature.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.features.map((item, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              How It Works in 4 Simple Steps
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
              Get started with our review management system in minutes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Create Your Account & Business Profile",
                  desc: "Sign up and set up your business profile in minutes. Add your logo, business information, and customize your review page."
                },
                {
                  step: "02",
                  title: "Generate & Display QR Codes",
                  desc: "Generate unique QR codes for different locations, tables, or service points. Print and display them where customers can easily scan."
                },
                {
                  step: "03",
                  title: "Collect Customer Feedback",
                  desc: "Customers scan the QR code and submit their reviews directly from their phones. The process takes less than a minute."
                },
                {
                  step: "04",
                  title: "Manage & Respond to Reviews",
                  desc: "Monitor all incoming reviews from your dashboard, analyze feedback, and respond to customers to build loyalty."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 text-white"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="mb-6 opacity-90">Join thousands of businesses already transforming their customer feedback into growth</p>
                <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                  Start Free Trial
                </button>
                <p className="text-sm opacity-75 mt-4">No credit card required • 14-day free trial</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-16 sm:py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
          >
            See It in Action
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
          >
            Experience our review system firsthand. Scan the QR code below to try the customer review flow on your phone.
          </motion.p>
  
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl inline-block"
          >
            <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 mb-4">
              [QR Code Placeholder]
            </div>
            <p className="text-gray-600">Scan with your phone camera</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="space-y-6">
            {[
              {
                question: "How long does it take to set up?",
                answer: "You can have your review system up and running in under 10 minutes. Simply create an account, customize your review page, and generate your QR codes."
              },
              {
                question: "Can I use this for multiple business locations?",
                answer: "Yes! Our platform supports multiple locations with separate QR codes and review tracking for each branch. You can manage everything from a single dashboard."
              },
              {
                question: "Is there a limit to the number of reviews I can collect?",
                answer: "We offer unlimited review collection on all plans. Your pricing is based on the number of locations and advanced features you need."
              },
              {
                question: "Can customers review without creating an account?",
                answer: "Absolutely! Customers can submit reviews instantly without any registration or app download. They simply scan the QR code and start reviewing."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to Revolutionize Your Review Management?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
          >
            Join thousands of businesses already collecting more reviews, understanding their customers better, and growing faster.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
              Start Your Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors">
              Schedule a Demo
            </button>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-sm opacity-75 mt-6"
          >
            No credit card required • Free 14-day trial • Cancel anytime
          </motion.p>
        </div>
      </section>

    </>
  );
}
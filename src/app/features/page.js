"use client";
import { motion } from "framer-motion";


export default function Features() {
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

      {/* Hero Section for Features */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 overflow-hidden px-4 sm:px-6">
        {/* Background Glow Effects */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-indigo-300 rounded-full blur-3xl opacity-30 top-20 left-10"
        ></motion.div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] bg-purple-300 rounded-full blur-3xl opacity-20 -bottom-20 -right-20"
        ></motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto z-10">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-800 mb-6 leading-tight"
          >
            Discover Our <span className="text-blue-600">Powerful Features</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-gray-600 text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8 px-2"
          >
            Explore the comprehensive tools designed to streamline your review collection, 
            enhance customer engagement, and supercharge your business growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          >
            <motion.a
              href="#get-started"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all text-base sm:text-lg w-full sm:w-auto text-center"
            >
              Start Free Trial
            </motion.a>
            <motion.a
              href="#demo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all text-base sm:text-lg w-full sm:w-auto text-center"
            >
              Watch Demo
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Feature Overview */}
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
              Everything You Need to Master Customer Reviews
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
              From seamless QR code scanning to advanced analytics, our platform empowers businesses of all sizes to thrive.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Smart QR Code Review System",
                desc: "Effortless review collection starts with a simple scan. Customize QR codes for locations, events, or products.",
                icon: (
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: "Comprehensive Feedback Collection",
                desc: "Gather rich insights with ratings, comments, photos, and more. Tailor forms to fit your unique needs.",
                icon: (
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )
              },
              {
                title: "Multi-Platform Review Integration",
                desc: "Direct customers to Google, Facebook, Yelp, and beyond. Amplify your presence with one-tap reviews.",
                icon: (
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "Advanced Admin Dashboard",
                desc: "Real-time metrics, trends, and AI-powered sentiment analysis. Export data for deeper insights.",
                icon: (
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: "Instant Notification System",
                desc: "Get alerts via email or SMS for new reviews. Respond quickly to build stronger customer relationships.",
                icon: (
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                )
              },
              {
                title: "Enterprise-Grade Management",
                desc: "Scale effortlessly with multi-location support, role-based access, and robust spam protection.",
                icon: (
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 sm:p-8 rounded-2xl text-center hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4 text-blue-600 mx-auto">{feature.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features Sections */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {[
            {
              title: "Smart QR Code Review System",
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              ),
              desc: "Generate unique QR codes for each location or table. Customers simply scan to access your review page instantly on their mobile devices. No apps to download, no complicated links to type.",
              features: ["Mobile-optimized", "Instant access", "No app required", "Customizable designs"],
              details: "Our QR system integrates seamlessly with your existing workflows. Place codes on tables, receipts, or digital displays. Track scan analytics to understand customer engagement patterns."
            },
            {
              title: "Comprehensive Feedback Collection",
              icon: (
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ),
              desc: "Capture detailed customer insights with customizable forms including star ratings, comments, photos, and contact information. Understand exactly what your customers love and where you can improve.",
              features: ["Star ratings", "Photo uploads", "Custom fields", "Multi-language support"],
              details: "Build forms that resonate with your audience. Collect structured data for easy analysis while allowing open-ended feedback for qualitative insights."
            },
            {
              title: "Multi-Platform Review Integration",
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              desc: "Seamlessly redirect satisfied customers to post reviews on Google, Facebook, Yelp, and other platforms with a single click. Boost your online presence across all major review sites.",
              features: ["Google Reviews", "Facebook Reviews", "Multiple platforms", "One-click redirects"],
              details: "Consolidate your reputation management. Positive feedback flows directly to the platforms that matter most to your business."
            },
            {
              title: "Advanced Admin Dashboard",
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
              desc: "Gain valuable insights with our comprehensive dashboard featuring real-time analytics, review trends, sentiment analysis, and export capabilities. Make data-driven decisions to improve your business.",
              features: ["Real-time analytics", "Sentiment analysis", "Export data", "Custom reports"],
              details: "Visualize your review performance with interactive charts. Identify trends and act on them before they impact your business."
            },
            {
              title: "Instant Notification System",
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              ),
              desc: "Stay informed immediately when new reviews come in. Receive email or SMS notifications with review details so you can respond promptly and show customers you care.",
              features: ["Email alerts", "SMS notifications", "Quick response", "Automated workflows"],
              details: "Never miss a review. Set up rules to notify specific team members based on review sentiment or location."
            },
            {
              title: "Enterprise-Grade Management",
              icon: (
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              ),
              desc: "Manage multiple business locations with separate QR codes and review streams. Advanced spam protection with reCAPTCHA ensures you only get genuine customer feedback.",
              features: ["Multi-location", "Spam protection", "Role-based access", "API integrations"],
              details: "Secure and scalable for growing enterprises. Integrate with your CRM, POS, or other tools via our robust API."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8 mb-12 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="text-3xl text-blue-600 mr-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800">{feature.title}</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">{feature.desc}</p>
              <p className="text-gray-500 mb-6 italic">{feature.details}</p>
              <div className="flex flex-wrap gap-2">
                {feature.features.map((item, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-16 sm:py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Ready to See These Features in Action?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience how our platform transforms feedback into actionable growth. Start with a free trial today.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <motion.a
              href="#get-started"
              whileHover={{ scale: 1.05 }}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all text-lg"
            >
              Start Free Trial
            </motion.a>
            <div className="bg-white p-8 rounded-3xl inline-block text-gray-900">
              <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 mb-4">
                [QR Code Placeholder]
              </div>
              <p className="text-sm">Scan for instant demo access</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="get-started" className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
          >
            Unlock the Power of Customer Feedback Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl mb-8 opacity-90 max-w-2xl mx-auto"
          >
            Join leading businesses leveraging our features to collect more reviews and drive sustainable growth.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
              Get Started Free
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors">
              Contact Sales
            </button>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-sm opacity-75 mt-6"
          >
            No credit card required • 14-day free trial • Easy setup
          </motion.p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Review Us Software</h3>
              <p className="text-gray-400">
                Transforming customer feedback into business growth through innovative review management solutions.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Review Us Software. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
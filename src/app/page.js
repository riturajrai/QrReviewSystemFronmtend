"use client";

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
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center bg-indigo-600 text-white overflow-hidden px-4 sm:px-6">
        <div className="absolute inset-0 bg-indigo-700 opacity-50"></div>
        <div className="max-w-6xl mx-auto z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 leading-tight">
            Transform Customer Feedback into <span className="text-indigo-200">Business Growth</span>
          </h1>

          <p className="text-indigo-100 text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed mb-8 px-2">
            Streamline your review collection process with QR codes, manage customer feedback effectively, 
            and build a powerful online reputation that drives more business.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <a
              href="#features"
              className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-all text-base sm:text-lg w-full sm:w-auto text-center"
            >
              Explore Features
            </a>
            <a
              href="#demo"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-indigo-600 transition-all text-base sm:text-lg w-full sm:w-auto text-center"
            >
              Live Demo
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: "95%", label: "Faster Review Collection" },
              { number: "4.8★", label: "Average Google Rating" },
              { number: "200%", label: "More Google Reviews" },
              { number: "24/7", label: "Feedback Monitoring" }
            ].map((stat, index) => (
              <div key={index} className="p-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Powerful Features for Modern Businesses
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
              Everything you need to collect, manage, and leverage customer reviews to grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Google Review QR System",
                desc: "Generate unique QR codes linked directly to your Google Business review page. Customers can quickly leave reviews using their phones.",
                features: ["Instant access", "No app required", "Direct to Google"],
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                    <path d="M3 3h6v6H3V3zm12 0h6v6h-6V3zm-12 12h6v6H3v-6zm12 0h2v2h-2v2h2v2h-2v-2h-2v2h-2v-2h2v-2h-2v-2h2v-2h2v2z"/>
                    <path fill="#fff" d="M5 5h2v2H5V5zm12 0h2v2h-2V5zm-12 12h2v2H5v-2zm4 0h2v2H9v-2zm4 0h2v2h-2v-2z"/>
                  </svg>
                )
              },
              {
                title: "Detailed Feedback Collection",
                desc: "Capture star ratings, comments, and optional photos to gain valuable insights about your services and customer satisfaction.",
                features: ["Star ratings", "Photo uploads", "Custom fields"],
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>
                )
              },
              {
                title: "Multi-Platform Sharing",
                desc: "Redirect happy customers to Google, Facebook, and other platforms to maximize your online presence effortlessly.",
                features: ["Google Reviews", "Facebook Reviews", "Multiple platforms"],
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.115 5.19a9.75 9.75 0 0111.77 0m.76 12.62a9.75 9.75 0 01-11.77 0M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zM9.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z" />
                  </svg>
                )
              },
              {
                title: "Admin Dashboard",
                desc: "Track reviews, analyze trends, and export reports from one central dashboard. Make data-driven decisions to improve business performance.",
                features: ["Analytics", "Trends", "Export data"],
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h8V3H3v10zm0 8h8v-10H3v10zm10 0h8V11h-8v10zm0-18v2h8V3h-8z" />
                  </svg>
                )
              },
              {
                title: "Instant Notifications",
                desc: "Receive alerts whenever a new review is submitted so you can respond promptly and maintain a great reputation.",
                features: ["Email alerts", "SMS notifications", "Quick response"],
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                )
              },
              {
                title: "Enterprise Management",
                desc: "Manage multiple locations, QR codes, and review streams with advanced spam protection for authentic customer feedback.",
                features: ["Multi-location", "Spam protection", "Role-based access"],
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m7.5-18v18m-10.5 0h4.5" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
                <div className="text-indigo-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{feature.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.features.map((item, idx) => (
                    <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              How It Works in 4 Simple Steps
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl max-w-3xl mx-auto">
              Collect and manage Google Reviews quickly and efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                { step: "01", title: "Create Your Account & Business Profile", desc: "Sign up and set up your Google Business profile for review collection." },
                { step: "02", title: "Generate QR Codes", desc: "Create QR codes for locations or products linking directly to your Google review page." },
                { step: "03", title: "Collect Customer Reviews", desc: "Customers scan QR codes and submit reviews instantly from their devices." },
                { step: "04", title: "Analyze & Respond", desc: "Monitor reviews, respond promptly, and leverage insights to improve business." }
              ].map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Optional: Add an illustration here if needed */}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-16 sm:py-20 bg-indigo-900 text-white text-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">See It in Action</h2>
          <p className="text-xl text-indigo-200 mb-12 max-w-3xl mx-auto">
            Scan the QR code below to submit a Google review as a customer.
          </p>
          <div className="bg-white p-8 rounded-3xl inline-block">
            <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 mb-4">
              [QR Code Placeholder]
            </div>
            <p className="text-gray-600">Scan with your phone camera</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          Ready to Boost Your Google Reviews?
        </h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Join thousands of businesses already collecting more Google reviews and improving their online reputation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
            Start Your Free Trial
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-indigo-600 transition-colors">
            Schedule a Demo
          </button>
        </div>
        <p className="text-sm opacity-75 mt-6">
          No credit card required • Free 14-day trial • Cancel anytime
        </p>
      </section>
    </>
  );
}
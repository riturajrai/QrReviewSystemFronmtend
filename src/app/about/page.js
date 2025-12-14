// app/about/page.js
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 to-pink-600 text-white py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            About Review Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-purple-100 max-w-3xl mx-auto mb-8"
          >
            We're on a mission to empower businesses with the tools they need to turn customer feedback into actionable insights and sustainable growth.
          </motion.p>
          <Link
            href="/signup"
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                Founded in 2023, Review Us was born from the frustration of small business owners who struggled to collect and manage customer feedback effectively. Traditional review systems were either too complicated, too expensive, or simply didn't work well for mobile-first customers.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We set out to create a simple, powerful solution that combines QR code technology with intelligent feedback collection. Today, thousands of businesses—from local cafes to global chains—use Review Us to build stronger customer relationships and drive growth.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">10K+</div>
                  <div className="text-sm text-gray-600">Businesses</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">1M+</div>
                  <div className="text-sm text-gray-600">Reviews Collected</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 text-white text-center">
                <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 10a2 2 0 002 2h-3m-4 0v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3m0 0a1 1 0 001 1h1a1 1 0 001-1m-3 0h3" />
                </svg>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="opacity-90">A world where every business thrives on genuine customer feedback.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-800 mb-12"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alice Johnson",
                role: "CEO & Founder",
                avatar: "👩‍💼",
                bio: "Visionary leader with 15+ years in SaaS and customer experience."
              },
              {
                name: "Bob Smith",
                role: "CTO",
                avatar: "👨‍💻",
                bio: "Tech wizard specializing in scalable web applications and AI."
              },
              {
                name: "Carol Davis",
                role: "Head of Product",
                avatar: "👩‍🎨",
                bio: "Design thinker passionate about creating intuitive user experiences."
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-md"
              >
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-purple-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-800 text-center mb-12"
          >
            Our Core Values
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Innovation",
                desc: "We constantly push the boundaries of what's possible in customer feedback management."
              },
              {
                icon: "🤝",
                title: "Customer First",
                desc: "Every decision we make is centered around making our users' lives easier and more successful."
              },
              {
                icon: "🌟",
                title: "Integrity",
                desc: "We build trust through transparency, honesty, and delivering on our promises."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
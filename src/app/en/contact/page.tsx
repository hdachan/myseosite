// src/app/en/contact/page.tsx
"use client";

import { Phone, Mail, MapPin, Clock, Globe, Printer } from "lucide-react";
import { motion } from "framer-motion";

interface ContactItem {
  label: string;
  value: string;
  flag?: string;
}

interface ContactSection {
  icon: any;
  title: string;
  items: ContactItem[];
  color: string;
}

export default function ContactPage() {
  const contactInfo: ContactSection[] = [
    {
      icon: Phone,
      title: "24 Hour Reservation",
      items: [
        { label: "Main Line", value: "02-774-3345" },
        { label: "Office", value: "82-2-774-8222 / 82-2-720-0335" },
      ],
      color: "from-[#8B1E26] to-[#6E0D0D]",
    },
    {
      icon: Globe,
      title: "Language Support",
      items: [
        { label: "English", value: "010-4082-7451", flag: "US" },
        { label: "Chinese", value: "010-5617-9039", flag: "CN" },
        { label: "Japanese", value: "010-4082-7451", flag: "JP" },
      ],
      color: "from-[#D4A017] to-[#8B1E26]",
    },
    {
      icon: Phone,
      title: "Specialized Services",
      items: [
        { label: "International Convention", value: "02-733-2520" },
        { label: "Out-Bound Travel Center", value: "02-733-5510" },
      ],
      color: "from-[#6E0D0D] to-[#8B1E26]",
    },
    {
      icon: Printer, // Fax → Printer (lucide-react에 Fax 없음)
      title: "Fax & Email",
      items: [
        { label: "Fax", value: "02-774-8223" },
        { label: "Email", value: "mail@seoulcitytour.net" },
      ],
      color: "from-[#8B1E26] to-[#D4A017]",
    },
  ];

  const operatingHours = [
    { day: "Monday - Friday", hours: "09:00 - 18:00" },
    { day: "Saturday", hours: "09:00 - 14:00" },
    { day: "Sunday & Holidays", hours: "Closed" },
    { day: "24H Reservation", hours: "Available Anytime" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F8F1E7]/30 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#8B1E26] to-[#6E0D0D] text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#D4A017] text-sm uppercase tracking-widest font-medium mb-4">
              Get in Touch
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              We're here to help you 24/7. Reach out to us anytime!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group hover:-translate-y-1"
              >
                <div
                  className={`bg-gradient-to-r ${section.color} p-4 flex items-center justify-center`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {section.title}
                  </h3>
                  <div className="space-y-3">
                    {section.items.map((item, idx) => (
                      <div key={idx} className="text-sm">
                        <p className="text-gray-600 mb-1 flex items-center gap-2">
                          {item.flag && <span>{item.flag}</span>}
                          {item.label}
                        </p>
                        <p className="text-[#8B1E26] font-semibold">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Operating Hours & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Operating Hours */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8B1E26] to-[#D4A017] flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Operating Hours
                </h2>
              </div>
              <div className="space-y-4">
                {operatingHours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-gray-700 font-medium">
                      {schedule.day}
                    </span>
                    <span className="text-[#8B1E26] font-bold">
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-[#F8F1E7] rounded-xl">
                <p className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-[#D4A017] text-lg">Tip</span>
                  <span>
                    <strong>24H Reservation Line:</strong> For urgent bookings
                    outside office hours, call our 24-hour hotline.
                  </span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8B1E26] to-[#D4A017] flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Send Us a Message
                </h2>
              </div>

              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E26] focus:border-transparent outline-none transition"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E26] focus:border-transparent outline-none transition"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E26] focus:border-transparent outline-none transition"
                      placeholder="+82 10-1234-5678"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E26] focus:border-transparent outline-none transition">
                      <option>General Inquiry</option>
                      <option>Tour Reservation</option>
                      <option>Group Booking</option>
                      <option>Custom Tour Request</option>
                      <option>Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E26] focus:border-transparent outline-none transition resize-none"
                    placeholder="Tell us about your inquiry or tour requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#8B1E26] hover:bg-[#6E0D0D] text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8B1E26] to-[#D4A017] flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Visit Our Office
                </h2>
                <p className="text-gray-600 text-sm">
                  Seoul City Tour Headquarters
                </p>
              </div>
            </div>

            <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.8359606065384!2d126.97796931531584!3d37.566535779802916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2eb8b5e8b8b%3A0x5e0e9e9e9e9e9e9e!2sSeoul%2C%20South%20Korea!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

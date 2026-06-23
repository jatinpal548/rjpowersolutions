'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle, Send } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import { SITE, whatsappLink } from '@/lib/constants';

const CONTACT_INFO = [
  {
    icon: Phone,
    label: 'Phone / WhatsApp',
    value: SITE.phone,
    sub: 'Mon–Sat, 9 AM – 6 PM',
    href: `tel:${SITE.phone}`,
    color: 'bg-solar-orange-tint text-solar-orange',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat with us',
    sub: 'Instant response',
    href: whatsappLink('Hello RJ Power Solutions! I want to get in touch.'),
    color: 'bg-green-50 text-green-600',
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    value: SITE.email,
    sub: 'We reply within 24 hrs',
    href: `mailto:${SITE.email}`,
    color: 'bg-solar-sky text-solar-blue',
  },
  {
    icon: MapPin,
    label: 'Office Address',
    value: SITE.address,
    sub: 'Visit us for consultation',
    href: '#',
    color: 'bg-purple-50 text-purple-600',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', location: '', bill: '', propertyType: 'Residential', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello RJ Power Solutions! 🌞\n\n📋 New Contact Form Inquiry:\n\n👤 Name: ${form.name}\n📱 Phone: ${form.phone}\n📧 Email: ${form.email || 'Not provided'}\n📍 Location: ${form.location || 'Not provided'}\n🏠 Property Type: ${form.propertyType}\n💡 Monthly Bill: ${form.bill ? '₹' + form.bill : 'Not provided'}\n\n💬 Message:\n${form.message || 'No additional message'}\n\nPlease get back to me at your earliest convenience. Thank you!`;
    window.open(whatsappLink(msg), '_blank');
    setSubmitted(true);
  };

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-blue text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-solar-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="badge bg-white/10 text-white border-white/20 mb-6">Contact Us</div>
            <h1 className="section-title text-white mb-4">Get in Touch with<br /><span className="text-solar-orange">Our Solar Experts</span></h1>
            <p className="text-blue-100 max-w-xl mx-auto text-lg">
              Ready to go solar? Have questions? Our team in Indore is here to help. We respond within 30 minutes on WhatsApp.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CONTACT_INFO.map(({ icon: Icon, label, value, sub, href, color, external }, i) => (
              <motion.a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-solar-grey rounded-2xl p-6 card-hover text-center group block"
              >
                <div className={`w-14 h-14 rounded-full ${color} mx-auto mb-4 flex items-center justify-center`}>
                  <Icon size={22} />
                </div>
                <div className="text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wide">{label}</div>
                <div className="font-poppins font-bold text-solar-dark text-sm mb-1 break-all group-hover:text-solar-orange transition-colors">{value}</div>
                <div className="text-xs text-gray-400">{sub}</div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Office Hours */}
      <section className="section-padding bg-solar-grey">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-card"
          >
            <h2 className="font-poppins font-bold text-2xl text-solar-dark mb-2">Send Us a Message</h2>
            <p className="text-gray-500 text-sm mb-7">Fill in the form and we&apos;ll send your message directly via WhatsApp for fastest response.</p>

            {submitted ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-5">🎉</div>
                <h3 className="font-poppins font-bold text-2xl text-solar-dark mb-3">Message Sent!</h3>
                <p className="text-gray-500 mb-6">Your inquiry has been sent via WhatsApp. Our team will get back to you within 30 minutes.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', location: '', bill: '', propertyType: 'Residential', message: '' }); }}
                  className="btn-secondary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-solar-dark mb-2 font-poppins">Full Name *</label>
                    <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Rajesh Sharma" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-solar-dark mb-2 font-poppins">Phone Number *</label>
                    <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className="input-field" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-solar-dark mb-2 font-poppins">Email Address</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="rajesh@example.com" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-solar-dark mb-2 font-poppins">Your Location</label>
                    <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="e.g. Vijay Nagar, Indore" className="input-field" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-solar-dark mb-2 font-poppins">Monthly Electricity Bill (₹)</label>
                    <input type="number" name="bill" value={form.bill} onChange={handleChange} placeholder="e.g. 3000" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-solar-dark mb-2 font-poppins">Property Type</label>
                    <select name="propertyType" value={form.propertyType} onChange={handleChange} className="input-field">
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Industrial</option>
                      <option>School/Hospital</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-solar-dark mb-2 font-poppins">Message / Requirements</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your requirements, any questions, or how we can help you..."
                    className="input-field resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center text-base py-3.5">
                  <Send size={18} /> Send via WhatsApp
                </button>
                <p className="text-center text-xs text-gray-400">
                  Clicking &ldquo;Send via WhatsApp&rdquo; will open WhatsApp with your message pre-filled.
                </p>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Office Hours */}
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-solar-orange-tint flex items-center justify-center">
                  <Clock size={18} className="text-solar-orange" />
                </div>
                <h3 className="font-poppins font-bold text-solar-dark">Office Hours</h3>
              </div>
              <div className="space-y-3 text-sm">
                {[
                  { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
                  { day: 'Saturday', time: '9:00 AM – 2:00 PM' },
                  { day: 'Sunday', time: 'Closed' },
                ].map(({ day, time }) => (
                  <div key={day} className="flex justify-between">
                    <span className="text-gray-500">{day}</span>
                    <span className="font-semibold font-poppins text-solar-dark">{time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-gray-100 text-xs text-gray-400">
                📱 WhatsApp is available 24/7 for urgent queries
              </div>
            </div>

            {/* Quick WhatsApp */}
            <div className="bg-green-600 rounded-2xl p-6 text-white">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-poppins font-bold text-lg mb-2">Prefer WhatsApp?</h3>
              <p className="text-green-100 text-sm mb-5">Chat directly with our solar expert and get answers in minutes.</p>
              <a
                href={whatsappLink('Hello! I want to inquire about solar installation.')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-green-600 font-poppins font-bold px-5 py-3 rounded-xl hover:bg-green-50 transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <MessageCircle size={16} /> Start WhatsApp Chat
              </a>
            </div>

            {/* Why Contact Us */}
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <h3 className="font-poppins font-bold text-solar-dark mb-4">Why Reach Out?</h3>
              <ul className="space-y-3">
                {[
                  'Free site survey & consultation',
                  'Instant WhatsApp quotes',
                  'Subsidy application help',
                  'EMI and financing guidance',
                  'Maintenance & AMC support',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <CheckCircle size={15} className="text-solar-orange flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  emailjs.send(
    'service_608dj5o',     // ✅ Replace with your actual Service ID
    'template_awnng0g',    // ✅ Replace with your Template ID
    formData,
    'qa0E16x8vliCpZJEL'      // ✅ Replace with your Public Key
  ).then(
    (result) => {
      console.log('Email sent:', result.text);
      alert('Message sent successfully!');
    },
    (error) => {
      console.error('Email send failed:', error.text);
      alert('Failed to send message. Please try again.');
    }
  );

  setFormData({ name: '', email: '', subject: '', message: '' });
};

  const contactInfo = [
    {
      icon: <Mail className="text-blue-600" size={24} />,
      title: 'Email',
      value: 'lokeshsridhara2005@gmail.com',
      link: 'mailto:lokeshsridhara2005@gmail.com',
    },
    {
      icon: <Phone className="text-green-600" size={24} />,
      title: 'Phone',
      value: '+91 80745 19845',
      link: 'tel:+91 8074519845',
    },
    {
      icon: <MapPin className="text-red-600" size={24} />,
      title: 'Location',
      value: 'Akividu, India',
      link: '#',
    },
  ];

  const socialLinks = [
    {
      icon: <Github size={24} />,
      name: 'GitHub',
      url: 'https://github.com/lokesh2707',
      color: 'hover:text-gray-800',
    },
    {
      icon: <Linkedin size={24} />,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/lokesh-prasanth-6784022a7/',
      color: 'hover:text-blue-600',
    },
    {
      icon: <Instagram size={24} />,
      name: 'Instagram',
      url: 'https://www.instagram.com/sl_prasanth/',
      color: 'hover:text-pink-500',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Work Together
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Have a project in mind? I'd love to hear about it. Send me a message 
            and let's discuss how we can bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-center gap-4 p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors group"
                  >
                    <div className="flex-shrink-0">{info.icon}</div>
                    <div>
                      <p className="text-slate-400 text-sm">{info.title}</p>
                      <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={`p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-all transform hover:scale-110 ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-2">Quick Response</h4>
              <p className="text-slate-300">
                I typically respond to messages within 24 hours. Looking forward 
                to hearing from you!
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-800 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 transform hover:scale-105"
              >
                <Send size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
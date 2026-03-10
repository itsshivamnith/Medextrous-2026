// Contact.tsx
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const pageTransition = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.05 },
  transition: { duration: 0.5 },
};

const Contact = () => {
  return (
    <motion.div {...pageTransition} className="pt-6 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* PageHeading */}
        <motion.div
          className="flex flex-col items-center gap-3 mb-16"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-blue-500/50" />
            <span className="text-xs tracking-[0.35em] uppercase font-semibold" style={{ color: '#60a5fa' }}>
              Medextrous
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-blue-500/50" />
          </div>
          <h1
            className="text-4xl md:text-6xl font-black tracking-tight text-center"
            style={{
              WebkitTextStroke: '1.5px #1d4ed8',
              color: '#60a5fa',
              textShadow: '0 0 30px rgba(96,165,250,0.25), 0 2px 8px rgba(0,0,0,0.8)',
            }}
          >
            Contact Us
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-blue-400/40 rounded" />
            <div className="w-2 h-2 rounded-full bg-blue-400/60" />
            <div className="w-16 h-px bg-gradient-to-r from-blue-400/60 to-cyan-400/60 rounded" />
            <div className="w-2 h-2 rounded-full bg-cyan-400/60" />
            <div className="w-8 h-px bg-cyan-400/40 rounded" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Get in touch */}
            <div className="rounded-3xl border border-slate-700/40 bg-gradient-to-br from-slate-900/95 via-slate-800/60 to-slate-950/90 backdrop-blur-xl p-7 relative overflow-hidden">
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
              <div className="absolute top-6 bottom-6 left-0 w-0.5 bg-gradient-to-b from-transparent via-blue-500/35 to-transparent rounded-full" />

              <h2
                className="font-black text-2xl mb-1 tracking-tight"
                style={{
                  WebkitTextStroke: '0.5px #1d4ed8',
                  color: '#93c5fd',
                  textShadow: '0 0 16px rgba(96,165,250,0.2)',
                }}
              >
                Get in Touch
              </h2>
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded mb-4" />
              <p className="text-sm text-slate-400 leading-relaxed text-justify">
                Have a question about Medextrous or want to collaborate? We'd love to hear from you. Reach out and we'll get back within 24 hours.
              </p>
            </div>

            {/* Contact info cards */}
            <div className="flex flex-col gap-3">
              {[
                { icon: Mail,   label: 'Email',    value: 'medextrous@nith.ac.in' },
                { icon: Phone,  label: 'Phone',    value: '+91 98765 43210' },
                { icon: MapPin, label: 'Location', value: 'NIT Hamirpur, Himachal Pradesh 177005' },
              ].map(({ icon: Icon, label, value }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-4 rounded-2xl border border-slate-700/40
                    bg-gradient-to-br from-slate-900/90 to-slate-950/80
                    backdrop-blur-xl px-5 py-4 group hover:border-blue-400/30
                    hover:shadow-lg hover:shadow-blue-500/8 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-400/25 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-all duration-300">
                    <Icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 tracking-wider uppercase font-medium mb-0.5">{label}</p>
                    <p className="text-sm text-slate-300 font-medium">{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="rounded-3xl overflow-hidden border border-slate-700/40 shadow-xl"
              style={{ height: 200 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.7!2d76.527!3d31.708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904d5487e12c4a1%3A0x395dbf25ce001a41!2sNIT%20Hamirpur!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                title="NIT Hamirpur location"
              />
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
// ContactForm.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

    try {
      const res = await fetch('https://formspree.io/f/xwvrprdw', { // 👈 Replace YOUR_FORM_ID
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setIsError(true);
      }
    } catch (err) {
      setIsError(true);
    }

    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-slate-700/40 bg-gradient-to-br from-slate-900/95 via-slate-800/60 to-slate-950/90 backdrop-blur-xl p-10 text-center relative overflow-hidden h-full flex flex-col items-center justify-center"
      >
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

        <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-400/25 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-7 h-7 text-blue-400" />
        </div>

        <h3
          className="font-black text-2xl mb-2"
          style={{
            WebkitTextStroke: '0.5px #1d4ed8',
            color: '#93c5fd',
            textShadow: '0 0 16px rgba(96,165,250,0.3)',
          }}
        >
          Message Sent!
        </h3>
        <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded mx-auto mb-3" />
        <p className="text-slate-400 text-sm mb-6">We'll reply within 24 hours.</p>

        <button
          onClick={() => setIsSuccess(false)}
          className="px-6 py-2 rounded-xl text-sm font-semibold border border-blue-400/30
            bg-blue-500/15 text-blue-300 hover:bg-blue-500/25 hover:text-white
            transition-all duration-300"
        >
          Send Another
        </button>
      </motion.div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-700/40 bg-gradient-to-br from-slate-900/95 via-slate-800/60 to-slate-950/90 backdrop-blur-xl p-7 relative overflow-hidden h-full">
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
      <div className="absolute top-6 bottom-6 left-0 w-0.5 bg-gradient-to-b from-transparent via-blue-500/35 to-transparent rounded-full" />

      <h3
        className="font-black text-2xl mb-1 tracking-tight"
        style={{
          WebkitTextStroke: '0.5px #1d4ed8',
          color: '#93c5fd',
          textShadow: '0 0 16px rgba(96,165,250,0.2)',
        }}
      >
        Send a Message
      </h3>
      <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded mb-6" />

      {/* Error banner */}
      {isError && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-4 px-4 py-3 rounded-xl border border-red-400/30 bg-red-500/10 text-red-400 text-sm"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Something went wrong. Please try again.
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {(['name', 'email', 'subject'] as const).map((field, i) => (
          <motion.div
            key={field}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
          >
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
              {field}
            </label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              required
              value={formData[field]}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              placeholder={`Your ${field}`}
              className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-slate-600
                bg-slate-800/60 border border-slate-700/50
                focus:outline-none focus:border-blue-400/50 focus:bg-slate-800/80
                transition-all duration-300"
            />
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34 }}
        >
          <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
            Message
          </label>
          <textarea
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Your message..."
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-slate-600
              bg-slate-800/60 border border-slate-700/50
              focus:outline-none focus:border-blue-400/50 focus:bg-slate-800/80
              transition-all duration-300 resize-none"
          />
        </motion.div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2
            bg-blue-500/20 border border-blue-400/35 text-blue-300
            hover:bg-blue-500/30 hover:border-blue-400/55 hover:text-white
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-300 shadow-lg hover:shadow-blue-500/20 mt-1"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default ContactForm;
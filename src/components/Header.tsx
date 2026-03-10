import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo1 from '../../public/assets/logo1.png';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/events', label: 'Events' },
  { to: '/projects', label: 'Projects' },
  { to: '/team', label: 'Team' },
  { to: '/contact', label: 'Contact' },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="h-20" />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'h-16 backdrop-blur-xl bg-slate-900/95 border-b border-white/10 shadow-2xl'
            : 'h-20 bg-transparent'
        }`}
      >
        {scrolled && (
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        )}

        <div className="container mx-auto px-6 h-full flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-all duration-400"
                style={{ background: 'radial-gradient(circle, #3b82f6, #6366f1)' }}
              />
              <div className="relative w-10 h-10 rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm flex items-center justify-center
                group-hover:border-blue-400/40 group-hover:bg-white/10 transition-all duration-300 shadow-lg"
              >
                <img
                  src={logo1}
                  alt="Medextrous"
                  className="w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span
                className="text-lg font-black tracking-widest leading-none"
                style={{
                  WebkitTextStroke: '1px #1d4ed8',
                  color: '#60a5fa',
                  textShadow: '0 0 10px rgba(96,165,250,0.4)',
                }}
              >
                MEDEXTROUS
              </span>
              <div className="h-px bg-gradient-to-r from-blue-400 to-cyan-400 mt-1 transition-all duration-500 w-0 group-hover:w-full" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                    ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}
                  `}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-lg bg-white/8 border border-white/10" />
                  )}
                  <span className="absolute inset-0 rounded-lg bg-white/0 hover:bg-white/5 transition-all duration-300" />
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-px rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <motion.button
            className="md:hidden w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/15 hover:border-white/25 flex items-center justify-center text-white transition-all duration-300"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.92 }}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0, 0, 1] }}
              className="md:hidden overflow-hidden bg-slate-900/98 backdrop-blur-2xl border-b border-white/8 shadow-2xl"
            >
              <div className="container mx-auto px-6 py-5">
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link, index) => {
                    const isActive = location.pathname === link.to;
                    return (
                      <motion.div
                        key={link.to}
                        initial={{ x: -16, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -16, opacity: 0 }}
                        transition={{ duration: 0.25, delay: index * 0.04 }}
                      >
                        <Link
                          to={link.to}
                          onClick={() => setMobileOpen(false)}
                          className={`
                            flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300
                            ${isActive
                              ? 'text-white bg-blue-500/10 border border-blue-400/25'
                              : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                            }
                          `}
                        >
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-sm shadow-blue-400/50" />
                          )}
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
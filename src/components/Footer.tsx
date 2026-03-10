import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Github } from 'lucide-react';
import logo1 from '../../public/assets/logo1.png';

const GlowLetter = ({ char, index }: { char: string; index: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className="inline-block cursor-pointer select-none"
      style={{
        transition: 'all 0.25s ease',
        transitionDelay: `${index * 20}ms`,
        fontWeight: 900,
        WebkitTextStroke: hovered ? '1.5px rgba(255,255,255,0.3)' : '1.5px #1d4ed8',
        color: hovered ? 'transparent' : '#60a5fa',
        textShadow: hovered
          ? 'none'
          : '0 0 12px rgba(96,165,250,0.5), 0 2px 4px rgba(0,0,0,0.8)',
        display: 'inline-block',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {char}
    </span>
  );
};

const Footer = () => {
  const text = 'MEDEXTROUS';

  return (
    <footer className="w-full border-t border-white/10 py-12 px-6">
      <div className="max-w-3xl mx-auto text-center space-y-8">

        {/* Logo */}
        <Link to="/" className="block w-20 h-20 mx-auto hover:scale-110 transition-all duration-300 group">
          <div className="w-full h-full rounded-xl border border-white/20 shadow-xl flex items-center justify-center bg-gradient-to-br from-white/10 to-transparent backdrop-blur hover:shadow-blue-500/30 hover:border-blue-400/50 hover:bg-white/20 p-2">
            <img
              src={logo1}
              alt="Medextrous Logo"
              className="w-16 h-16 object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* MEDEXTROUS */}
        <Link to="/" className="block">
          <div className="text-3xl md:text-5xl tracking-wide leading-none">
            {text.split('').map((char, i) => (
              <GlowLetter key={i} char={char} index={i} />
            ))}
          </div>
        </Link>

        {/* Line */}
        <div className="w-32 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded shadow-md" />

        {/* Social icons */}
        <div className="flex justify-center items-center gap-8">
          <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/40 shadow-md border border-white/20 hover:border-blue-400/50 group p-1">
            <Linkedin className="w-5 h-5 text-white drop-shadow group-hover:scale-110 transition-transform duration-300" />
          </a>
          <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur hover:bg-gradient-to-br hover:from-gray-600 hover:to-gray-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl shadow-md border border-white/20 group p-1">
            <Github className="w-5 h-5 text-white drop-shadow group-hover:scale-110 transition-transform duration-300" />
          </a>
          <a href="#" className="w-12 h-12 bg-white/10 backdrop-blur hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-pink-500/40 shadow-md border border-white/20 hover:border-pink-400/50 group p-1">
            <Instagram className="w-5 h-5 text-white drop-shadow group-hover:scale-110 transition-transform duration-300" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
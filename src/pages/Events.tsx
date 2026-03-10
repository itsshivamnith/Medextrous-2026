import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import eventSplashjet from '../../public/assets/event-splashjet.jpg';
import eventBhram from '../../public/assets/event-bhram.jpg';
import eventScavenger from '../../public/assets/event-scavenger.jpg';

interface EventCard {
  title: string;
  description: string;
  date: string;
  image: string;
  year: string;
}

const events: EventCard[] = [
  { title: 'Splash Jet', description: 'Water jet propulsion competition where teams design and race custom-built watercraft.', date: 'March 2026', year: '2026', image: eventSplashjet },
  { title: 'Bhram', description: 'High-intensity technical quiz challenge testing engineering knowledge across domains.', date: 'April 2026', year: '2026', image: eventBhram },
  { title: 'Scavenger Hunt', description: 'Campus-wide engineering treasure hunt with clues and technical challenges.', date: 'May 2026', year: '2026', image: eventScavenger },
  { title: 'Splash Jet', description: 'Water jet propulsion competition where teams design and race custom-built watercraft.', date: 'March 2025', year: '2025', image: eventSplashjet },
  { title: 'Bhram', description: 'High-intensity technical quiz challenge testing engineering knowledge across domains.', date: 'April 2025', year: '2025', image: eventBhram },
  { title: 'Scavenger Hunt', description: 'Campus-wide engineering treasure hunt with clues and technical challenges.', date: 'May 2025', year: '2025', image: eventScavenger },
];

const PageHeading = ({ title }: { title: string }) => (
  <motion.div
    className="flex flex-col items-center gap-3 mb-16"
    initial={{ opacity: 0, y: -16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="flex items-center gap-4 w-full max-w-xs">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-blue-500/50" />
      <span
        className="text-xs tracking-[0.35em] uppercase font-semibold"
        style={{ color: '#60a5fa' }}
      >
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
      {title}
    </h1>
    <div className="flex items-center gap-2">
      <div className="w-8 h-px bg-blue-400/40 rounded" />
      <div className="w-2 h-2 rounded-full bg-blue-400/60" />
      <div className="w-16 h-px bg-gradient-to-r from-blue-400/60 to-cyan-400/60 rounded" />
      <div className="w-2 h-2 rounded-full bg-cyan-400/60" />
      <div className="w-8 h-px bg-cyan-400/40 rounded" />
    </div>
  </motion.div>
);

const pageTransition = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.05 },
  transition: { duration: 0.5 },
};

const Events = () => {
  return (
    <motion.div {...pageTransition} className="pt-6 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">

        <PageHeading title="Events" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={`${event.title}-${event.year}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl overflow-hidden border border-slate-700/40
                bg-gradient-to-br from-slate-900/95 via-slate-800/60 to-slate-950/90
                backdrop-blur-xl shadow-xl hover:shadow-blue-500/10 hover:border-blue-400/30
                transition-all duration-400"
            >
              {/* Top shimmer */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent z-10" />

              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover brightness-70 group-hover:brightness-90 group-hover:scale-105 transition-all duration-600"
                  onError={(e) => { e.currentTarget.src = '/assets/image.png'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Year badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold
                  tracking-widest bg-black/40 border border-white/15 text-white/80 backdrop-blur-sm">
                  {event.year}
                </div>

                {/* Title over image */}
                <div className="absolute bottom-4 left-5 right-5">
                  <h3
                    className="font-black text-xl tracking-tight"
                    style={{
                      WebkitTextStroke: '0.5px #1d4ed8',
                      color: '#93c5fd',
                      textShadow: '0 0 20px rgba(96,165,250,0.4)',
                    }}
                  >
                    {event.title}
                  </h3>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded mt-1" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5 relative">
                {/* Left accent */}
                <div className="absolute top-4 bottom-4 left-0 w-0.5 bg-gradient-to-b from-transparent via-blue-500/35 to-transparent rounded-full" />

                <p className="text-sm text-slate-400 leading-relaxed text-justify mb-4">
                  {event.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <CalendarDays className="w-3.5 h-3.5 text-blue-400/60" />
                  <span>{event.date}</span>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-slate-600/20 to-transparent" />
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
};

export default Events;
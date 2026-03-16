import e1 from '../../public/assets/event/e1.jpg';
import e2 from '../../public/assets/event/e2.jpg';
import { motion } from 'framer-motion';
import { CalendarDays } from 'lucide-react';
import e3 from '../../public/assets/event/e3.jpg';
import e4 from '../../public/assets/event/e4.jpg';
import e5 from '../../public/assets/event/e5.jpg';
import e6 from '../../public/assets/event/e6.jpg';
import e7 from '../../public/assets/event/e7.jpg';
import e8 from '../../public/assets/event/e8.jpg';

interface EventCard {
  title: string;
  date: string;
  image: string;
}

const events: EventCard[] = [
  { title: 'Motion Gen', date: 'March 2026', image: e5},
  { title: 'Mech Day', date: 'March 2025', image: e2},
  { title: 'Escape The Hunt', date: 'April 2025', image: e1},
  { title: 'Clean The Peaks Drive', date: 'April 2025', image: e3},
  { title: 'Bingo Bash', date: 'April 2025', image: e6},
  { title: 'Exploring Robotics', date: 'March 2025', image: e7},
  { title: 'RC Car Race', date: 'April 2025', image: e8},
  { title: 'Treasure Hunt', date: 'March 2024', image: e4},
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
  exit: { opacity: 0 },
  transition: { duration: 0.4 },
};

const Events = () => {
  return (
    <motion.div {...pageTransition} className="pt-6 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">

        <PageHeading title="Events" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <motion.div
              key={`${event.title}-${event.date}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl overflow-hidden border border-slate-700/40
                bg-gradient-to-br from-slate-900/95 via-slate-800/60 to-slate-950/90
                backdrop-blur-xl shadow-2xl hover:shadow-blue-500/15 hover:border-blue-400/30
                transition-all duration-400"
              style={{ aspectRatio: '3 / 4' }}
            >
              {/* Top shimmer */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent z-10" />

              {/* Image — 80% of card, full image visible */}
              <div className="relative overflow-hidden bg-slate-950" style={{ height: '80%' }}>
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-all duration-700"
                  onError={(e) => { e.currentTarget.src = '/assets/image.png'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />

                {/* Title over image */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3
                    className="font-black text-3xl tracking-tight leading-tight"
                    style={{
                      WebkitTextStroke: '0.5px #1d4ed8',
                      color: '#93c5fd',
                      textShadow: '0 0 24px rgba(96,165,250,0.5)',
                    }}
                  >
                    {event.title}
                  </h3>
                  <div className="w-10 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded mt-2" />
                </div>
              </div>

              {/* Footer */}
              <div
                className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-6"
                style={{ height: '20%' }}
              >
                {/* Top border accent */}
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-slate-600/30 to-transparent" />
                {/* Left accent */}
                <div className="absolute top-3 bottom-3 left-0 w-0.5 bg-gradient-to-b from-transparent via-blue-500/40 to-transparent rounded-full" />

                <CalendarDays className="w-5 h-5 text-blue-400/70 shrink-0" />
                <span className="text-base text-slate-400 font-medium">{event.date}</span>
              </div>

              {/* Bottom shimmer */}
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-slate-600/20 to-transparent" />
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
};

export default Events;
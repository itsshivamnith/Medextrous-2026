import { motion } from 'framer-motion';
import p1 from '../../public/assets/project/p1.jpg';
import p2 from '../../public/assets/project/p2.jpg';
import p3 from '../../public/assets/project/p3.jpg';
import p4 from '../../public/assets/project/p4.jpg';
import p5 from '../../public/assets/project/p5.jpg';
import p6 from '../../public/assets/project/p6.jpg';
import p7 from '../../public/assets/project/p7.jpg';
import p8 from '../../public/assets/project/p8.jpg';
import p9 from '../../public/assets/project/p9.jpg';
import p10 from '../../public/assets/project/p10.jpg';
import p13 from '../../public/assets/project/p13.jpg';
import p11 from '../../public/assets/project/p11.jpg';
import p12 from '../../public/assets/project/p12.jpg';



interface Project {
  title: string;
  image: string;
  proposedBy: string;
}

const projects: Project[] = [
  { title: 'Flywheel Battery', image: p1, proposedBy: 'Vansh Aggarwal' },
  { title: 'Maglev Wind Turbine', image: p2, proposedBy: 'Harish Kumar' },
  { title: 'Automatic Dishwasher', image: p3, proposedBy: 'Asif Khan' },
  { title: 'Vertical Take Off and Landing', image: p5, proposedBy: 'Charu Chauhan' },
  { title: 'Vibration to Electrical Energy', image: p6, proposedBy: 'Nishant Prakhar' },
  { title: 'Ozzy Aura', image: p7, proposedBy: 'Saksham Sood' },
  { title: 'Autonomous Parking System', image: p8, proposedBy: 'Saloni Sharma' },
  { title: 'Circulation Aid', image: p9, proposedBy: 'Saloni Sharma' },
  { title: 'Emaluation (Electromagnetic Launcher)', image: p10, proposedBy: 'Saksham Sood' },
  { title: 'Unmanned Group Vehicle', image: p13, proposedBy: 'Peeyush, Prabhat, Sangam' },
  { title: 'Ionic Thruster', image: p11, proposedBy: 'Shwetansh, Sparsh' },
  { title: 'Tree Power', image: p12, proposedBy: 'Anjani, Sakshi' },
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

const Projects = () => {
  return (
    <motion.div {...pageTransition} className="pt-6 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">

        <PageHeading title="Projects" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title + i}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl overflow-hidden border border-slate-700/40
                bg-gradient-to-br from-slate-900/95 via-slate-800/60 to-slate-950/90
                backdrop-blur-xl shadow-xl hover:shadow-blue-500/10 hover:border-blue-400/30
                transition-all duration-400"
            >
              {/* Top shimmer */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent z-10" />

              {/* Image — increased height to fill space left by removed description */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover brightness-70 group-hover:brightness-90 group-hover:scale-105 transition-all duration-600"
                  onError={(e) => { e.currentTarget.src = '/assets/image.png'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Title over image */}
                <div className="absolute bottom-4 left-5 right-5">
                  <h3
                    className="font-black text-xl tracking-tight leading-tight"
                    style={{
                      WebkitTextStroke: '0.5px #1d4ed8',
                      color: '#93c5fd',
                      textShadow: '0 0 20px rgba(96,165,250,0.5)',
                    }}
                  >
                    {project.title}
                  </h3>
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded mt-1" />
                </div>
              </div>

              {/* Content */}
              <div className="p-5 relative">
                {/* Left accent */}
                <div className="absolute top-4 bottom-4 left-0 w-0.5 bg-gradient-to-b from-transparent via-blue-500/35 to-transparent rounded-full" />

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-700/40 to-transparent mb-3" />

                {/* Proposed by */}
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-500/15 border border-blue-400/25 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  </div>
                  <span className="text-xs text-slate-500">
                    Proposed by{' '}
                    <span className="text-blue-400/80 font-medium">{project.proposedBy}</span>
                  </span>
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

export default Projects;
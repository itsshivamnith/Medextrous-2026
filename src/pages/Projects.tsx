import { motion } from 'framer-motion';
import projectHybrid from '../../public/assets/project-hybrid.jpg';
import projectCad from '../../public/assets/project-cad.jpg';
import projectJet from '../../public/assets/project-jet.jpg';

interface Project {
  title: string;
  description: string;
  image: string;
  proposedBy: string;
}

const projects: Project[] = [
  { title: 'Hybrid Vehicle', description: 'A next-gen hybrid electric vehicle prototype for sustainable mobility.', image: projectHybrid, proposedBy: 'Dr. Rajesh Kumar' },
  { title: 'CAD Lab', description: 'Advanced 3D modeling and simulation research facility.', image: projectCad, proposedBy: 'Prof. Anil Sharma' },
  { title: 'Jet Propulsion', description: 'High-performance water jet propulsion system design.', image: projectJet, proposedBy: 'Dr. Suresh Mehta' },
  { title: 'Solar Powered Cart', description: 'An energy-efficient solar-powered transportation cart for campus use.', image: projectHybrid, proposedBy: 'Prof. Vikram Singh' },
  { title: 'Drone Prototype', description: 'Custom UAV built for aerial surveillance and payload delivery.', image: projectCad, proposedBy: 'Dr. Priya Nair' },
  { title: 'Smart Suspension', description: 'Adaptive suspension system using real-time sensor feedback.', image: projectJet, proposedBy: 'Prof. Manish Verma' },
  { title: 'Wind Turbine Model', description: 'Small-scale wind turbine optimized for low-wind regions.', image: projectHybrid, proposedBy: 'Dr. Ramesh Gupta' },
  { title: 'Robotic Arm', description: 'A 6-DOF robotic arm for industrial automation demonstrations.', image: projectCad, proposedBy: 'Prof. Sandeep Rao' },
  { title: 'Heat Exchanger', description: 'Compact heat exchanger design for improved thermal efficiency.', image: projectJet, proposedBy: 'Dr. Kavita Joshi' },
  { title: 'Pneumatic Press', description: 'High-force pneumatic press for manufacturing process simulation.', image: projectHybrid, proposedBy: 'Prof. Deepak Tiwari' },
  { title: 'Go-Kart Design', description: 'Custom-built go-kart chassis optimized for speed and handling.', image: projectCad, proposedBy: 'Dr. Amit Chauhan' },
  { title: 'Hydraulic Lifter', description: 'Portable hydraulic lifting mechanism for workshop applications.', image: projectJet, proposedBy: 'Prof. Neha Kulkarni' },
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
  exit: { opacity: 0, scale: 1.05 },
  transition: { duration: 0.5 },
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

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
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

                <p className="text-sm text-slate-400 leading-relaxed text-justify mb-4">
                  {project.description}
                </p>

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
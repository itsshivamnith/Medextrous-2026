// TeamCard.tsx — unchanged logic, styling improved
import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  linkedin?: string;
  instagram?: string;
  image: string;
}

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

const TeamCard = ({ member, index }: TeamCardProps) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl border border-slate-700/40
        bg-gradient-to-br from-slate-900/95 via-slate-800/60 to-slate-950/90
        shadow-xl hover:shadow-blue-500/15 hover:border-blue-400/30
        hover:-translate-y-4 transition-all duration-400 w-full max-w-sm mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Top shimmer */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent z-10" />

      {/* Image */}
      <div className="h-72 md:h-80 overflow-hidden rounded-t-3xl relative">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
      </div>

      {/* Name */}
      <div className="p-6 flex flex-col items-center gap-2">
        <h3
          className="font-black text-xl tracking-tight text-center leading-tight"
          style={{
            WebkitTextStroke: '0.5px #1d4ed8',
            color: '#93c5fd',
            textShadow: '0 0 16px rgba(96,165,250,0.3)',
          }}
        >
          {member.name}
        </h3>
        <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded" />
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-slate-600/20 to-transparent" />
    </motion.div>
  );
};

export default TeamCard;
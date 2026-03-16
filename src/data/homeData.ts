// data/homeData.ts
export const features = [
  { icon: 'Calendar', title: 'Events',   description: 'Competitions, hackathons and workshops that push engineering limits.', link: '/events',   num: '01' },
  { icon: 'Wrench',   title: 'Projects', description: 'Cutting-edge research and fabrication projects by our members.',        link: '/projects', num: '02' },
  { icon: 'Users',    title: 'Team',     description: 'A passionate community of future mechanical engineers.',                link: '/team',     num: '03' },
];

export const stats = [
  { value: 12,  suffix: '+', label: 'Projects' },
  { value: 70, suffix: '+', label: 'Members'  },
  { value: 5,   suffix: '',  label: 'Events'   },
  { value: 4,   suffix: '+', label: 'Years'    },
];


export const coordinators = [
  {
    name: 'Shwetansh', role: 'Club Coordinator',
    branch: 'Mechanical Engineering', year: 'Third Year',
    image: '../assets/cc1.jpg',
    linkedin: 'https://linkedin.com', instagram: 'https://www.instagram.com/shwetansh_024?igsh=NjJwM3Flczd1c3Yz',
  },
  {
    name: 'Sparsh Sharma', role: 'Club Coordinator',
    branch: 'Mechanical Engineering', year: 'Third Year',
    image: '../assets/cc2.jpg',
    linkedin: 'https://www.linkedin.com/in/sparsh-sharma-3b2216367?utm_source=share_via&utm_content=profile&utm_medium=member_android', instagram: 'https://www.instagram.com/sparshsharma_12/',
  },
];

export const facultyIncharge = {
  name: "Dr. Param Singh",
  designation: "Faculty In-charge",
  department: "Mechanical Engineering",
  email: "psingh@nith.ac.in",
  linkedin: "https://linkedin.com/in/",
  image: "../assets/param.jpg",
};


export interface Material {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'document' | 'tutorial';
  author: string;
  createdAt: string;
  youtubeUrl?: string;
  videoFile?: string;
  fileUrl?: string;
  thumbnail?: string;
}

export const materials: Material[] = [
  {
    id: '1',
    title: 'Introduction to CubeSat Design',
    description: 'Learn the fundamentals of CubeSat design, including mission planning, subsystem integration, and launch considerations.',
    type: 'video',
    author: 'Dr. Ahmed Hassan',
    createdAt: '2024-01-15',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: '/placeholder.svg'
  },
  {
    id: '2',
    title: 'Rover Navigation Systems',
    description: 'Complete guide to implementing autonomous navigation systems for planetary rovers using sensors and AI.',
    type: 'tutorial',
    author: 'Prof. Sarah Ahmed',
    createdAt: '2024-01-20',
    fileUrl: '/materials/rover-navigation.pdf'
  },
  {
    id: '3',
    title: 'Spacecraft Attitude Control',
    description: 'Advanced concepts in spacecraft attitude determination and control systems (ADCS) for satellite missions.',
    type: 'document',
    author: 'Dr. Mohamed Ali',
    createdAt: '2024-02-01',
    fileUrl: '/materials/adcs-manual.pdf'
  },
  {
    id: '4',
    title: 'CanSat Workshop Recording',
    description: 'Complete workshop recording covering CanSat design, construction, and testing procedures.',
    type: 'video',
    author: 'SST Lab Team',
    createdAt: '2024-02-10',
    videoFile: '/videos/cansat-workshop.mp4',
    thumbnail: '/placeholder.svg'
  },
  {
    id: '5',
    title: 'Drone Control Systems Tutorial',
    description: 'Step-by-step tutorial on implementing PID controllers and flight control systems for quadcopters.',
    type: 'tutorial',
    author: 'Eng. Omar Khalil',
    createdAt: '2024-02-15',
    fileUrl: '/materials/drone-control-tutorial.pdf'
  },
  {
    id: '6',
    title: 'Orbital Mechanics Fundamentals',
    description: 'Essential orbital mechanics concepts for satellite mission design and trajectory planning.',
    type: 'video',
    author: 'Dr. Fatma Ibrahim',
    createdAt: '2024-02-20',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
];
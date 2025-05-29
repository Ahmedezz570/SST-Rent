// Users data
export interface Users {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'student' | 'admin';
  studentId?: string;
  createdAt: string;
}

export const users: Users[] = [
  {
    _id: '1',
    name: 'Admin ',
    email: 'admin@cairo.edu',
    password: 'admin123',
    role: 'admin',
    createdAt: '2023-01-01'
  },
  {
    _id: '2',
    name: 'Ahmed Mohamed',
    email: 'ahmed@cairo.edu',
    password: 'student123',
    role: 'student',
    studentId: 'ENG-2023-001',
    createdAt: '2023-02-15'
  },
  {
    _id: '3',
    name: 'Fatima Ahmed',
    email: 'fatima@cairo.edu',
    password: 'student123',
    role: 'student',
    studentId: 'ENG-2023-002',
    createdAt: '2023-03-10'
  }
];

// Equipment data
export type EquipmentStatus = 'available' | 'rented' | 'maintenance';

export interface Equipment {
  _id: string;
  name: string;
  description: string;
  status: EquipmentStatus;
  category: string;
  imageUrl: string;
  quantity: number; // Add quantity field
  history: EquipmentHistory[];
}

export interface EquipmentHistory {
  id: string;
  userId: string;
  action: 'rented' | 'returned' | 'maintenance' | 'created';
  timestamp: string;
  notes?: string;
}

export const equipment: Equipment[] = [
  {
    _id: '1',
    name: 'Wind Tunnel Model',
    description: 'Small-scale wind tunnel for aerodynamic testing',
    status: 'available',
    category: 'Testing Equipment',
    imageUrl: '/placeholder.svg',
    quantity: 3,
    history: [
      {
        id: '101',
        userId: '1',
        action: 'created',
        timestamp: '2023-01-15',
        notes: 'Equipment added to inventory'
      }
    ]
  },
  {
    _id: '2',
    name: 'Aerospace Materials Testing Kit',
    description: 'Kit for testing properties of aerospace materials',
    status: 'available',
    category: 'Testing Equipment',
    imageUrl: '/placeholder.svg',
    quantity: 5,
    history: [
      {
        id: '201',
        userId: '1',
        action: 'created',
        timestamp: '2023-01-20',
        notes: 'Equipment added to inventory'
      }
    ]
  },
  {
    _id: '3',
    name: 'Flight Simulator',
    description: 'Desktop flight simulator with aerospace engineering modules',
    status: 'rented',
    category: 'Simulation Equipment',
    imageUrl: '/placeholder.svg',
    quantity: 2,
    history: [
      {
        id: '301',
        userId: '1',
        action: 'created',
        timestamp: '2023-01-25',
        notes: 'Equipment added to inventory'
      },
      {
        id: '302',
        userId: '2',
        action: 'rented',
        timestamp: '2023-03-01',
        notes: 'Rented for class project'
      }
    ]
  },
  {
    _id: '4',
    name: 'Drone Assembly Kit',
    description: 'Kit for assembling and testing small drones',
    status: 'available',
    category: 'Assembly Equipment',
    imageUrl: '/placeholder.svg',
    quantity: 2,
    history: [
      {
        id: '401',
        userId: '1',
        action: 'created',
        timestamp: '2023-02-05',
        notes: 'Equipment added to inventory'
      }
    ]
  },
  {
    _id: '5',
    name: 'Propulsion System Analyzer',
    description: 'Tool for analyzing propulsion systems',
    status: 'maintenance',
    category: 'Analysis Equipment',
    imageUrl: '/placeholder.svg',
    quantity: 2,
    history: [
      {
        id: '501',
        userId: '1',
        action: 'created',
        timestamp: '2023-02-10',
        notes: 'Equipment added to inventory'
      },
      {
        id: '502',
        userId: '1',
        action: 'maintenance',
        timestamp: '2023-04-01',
        notes: 'Scheduled maintenance'
      }
    ]
  },
  {
    _id: '6',
    name: 'Structural Analysis System',
    description: 'Equipment for structural analysis of aerospace components',
    status: 'available',
    category: 'Analysis Equipment',
    imageUrl: '/placeholder.svg',
    quantity: 2,
    history: [
      {
        id: '601',
        userId: '1',
        action: 'created',
        timestamp: '2023-02-15',
        notes: 'Equipment added to inventory'
      }
    ]
  },
  {
    _id: '7',
    name: 'Avionics Testing Kit',
    description: 'Kit for testing avionics systems',
    status: 'rented',
    category: 'Testing Equipment',
    imageUrl: '/placeholder.svg',
    quantity: 2,
    history: [
      {
        id: '701',
        userId: '1',
        action: 'created',
        timestamp: '2023-02-20',
        notes: 'Equipment added to inventory'
      },
      {
        id: '702',
        userId: '3',
        action: 'rented',
        timestamp: '2023-03-10',
        notes: 'Rented for research project'
      }
    ]
  },
  {
    _id: '8',
    name: 'Composite Materials Lab Kit',
    description: 'Kit for testing and analyzing composite materials',
    status: 'available',
    category: 'Testing Equipment',
    imageUrl: '/placeholder.svg',
    quantity: 2,
    history: [
      {
        id: '801',
        userId: '1',
        action: 'created',
        timestamp: '2023-02-25',
        notes: 'Equipment added to inventory'
      }
    ]
  }
];

// Rental requests data
export type RequestStatus = 'pending' | 'approved' | 'rejected';

export interface RentalRequest {
  _id: string;
  toolId: string;
  userId: string;
  startDate: string;
  expectedReturnDate: string;
  status: RequestStatus;
  requestDate: string;
  reason?: string;
  timeSlot?: string;
}

export const rentalRequests: RentalRequest[] = [
  {
    _id: '1',
    toolId: '3',
    userId: '2',
    startDate: '2023-03-01',
    expectedReturnDate: '2023-03-15',
    status: 'approved',
    requestDate: '2023-02-20',
    timeSlot: '9:00 AM - 5:00 PM'
  },
  {
    _id: '2',
    toolId: '7',
    userId: '3',
    startDate: '2023-03-10',
    expectedReturnDate: '2023-03-20',
    status: 'approved',
    requestDate: '2023-03-01',
    timeSlot: '10:00 AM - 2:00 PM'
  },
  {
    _id: '3',
    toolId: '1',
    userId: '2',
    startDate: '2023-04-01',
    expectedReturnDate: '2023-04-15',
    status: 'pending',
    requestDate: '2023-03-25',
    reason: 'Need for final year project',
    timeSlot: '1:00 PM - 4:00 PM'
  }
];

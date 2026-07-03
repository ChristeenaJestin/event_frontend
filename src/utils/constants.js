export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN:       'ADMIN',
  ORGANIZER:   'ORGANIZER',
  USER:        'USER',
};

// roles that can create/edit events and view participants
export const ORGANIZER_ROLES = [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.ORGANIZER];

export const EVENT_CATEGORIES = ['Tech fest', 'Cultural', 'Workshop', 'Sports', 'Guest lecture'];

export const VENUES = [
  'Main Auditorium',
  'Seminar Hall 1',
  'Seminar Hall 2',
  'Open Air Theatre',
  'Sports Complex',
];

export const ROLE_LABELS = {
  [ROLES.SUPER_ADMIN]: 'Super Admin',
  [ROLES.ADMIN]:       'Admin',
  [ROLES.ORGANIZER]:   'Organizer',
  [ROLES.USER]:        'Student',
};

// base URL used by vite proxy — change in .env if backend URL differs
export const API_BASE = import.meta.env.VITE_API_URL || '/api';

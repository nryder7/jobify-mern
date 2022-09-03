import { FaBug, FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa';

const defaultStats = [
  {
    id: 1,
    title: 'pending applications',
    // count: 0,
    // count: stats.pending || 0,
    icon: <FaSuitcaseRolling />,
    color: '#e9b949',
    bcg: '#fcefc7',
    status: 'pending',
  },
  {
    id: 2,
    title: 'interviews scheduled',
    // count: 0,
    // count: stats.interview || 0,
    icon: <FaCalendarCheck />,
    color: '#647acb',
    bcg: '#e0e8f9',
    status: 'interview',
  },
  {
    id: 3,
    title: 'jobs declined',
    // count: 0,
    // count: stats.declined || 0,
    icon: <FaBug />,
    color: '#d66a6a',
    bcg: '#ffeeee',
    status: 'declined',
  },
];
export default defaultStats;

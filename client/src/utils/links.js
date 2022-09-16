import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile, ImCalendar } from 'react-icons/im';

const links = [
  {
    id: 1,
    text: 'all jobs',
    path: '/',
    icon: <MdQueryStats />,
  },
  {
    id: 2,
    text: 'add job',
    path: 'add-job',
    icon: <FaWpforms />,
  },
  {
    id: 3,
    text: 'calendar',
    path: '/calendar',
    icon: <ImCalendar />,
  },
  {
    id: 4,
    text: 'profile',
    path: 'profile',
    icon: <ImProfile />,
  },
  {
    id: 5,
    text: 'stats',
    path: '/stats',
    icon: <IoBarChartSharp />,
  },
];

export default links;

import { IoBarChartSharp } from 'react-icons/io5';
import {
  MdOutlineFindInPage,
  MdAlarmAdd,
  MdQueryStats,
  MdOutlinePlaylistAdd,
  MdOutlineAddToQueue,
  MdOutlineScreenSearchDesktop,
} from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile, ImCalendar } from 'react-icons/im';
import {
  IoBagAddOutline,
  IoCalendarOutline,
  IoBarChartOutline,
  IoStatsChartOutline,
  IoSearchSharp,
} from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';

const links = [
  {
    id: 1,
    text: 'all jobs',
    path: '/',
    icon: <IoSearchSharp />,
    // icon: <IoSearchSharp transform='rotate(90)' />,
  },
  {
    id: 2,
    text: 'add job',
    path: 'add-job',
    icon: <IoBagAddOutline />,
  },
  {
    id: 3,
    text: 'calendar',
    path: '/calendar',
    icon: <IoCalendarOutline />,
  },
  {
    id: 4,
    text: 'profile',
    path: 'profile',
    icon: <CgProfile />,
  },
  {
    id: 5,
    text: 'stats',
    path: '/stats',
    // icon: <IoBarChartOutline />,
    icon: <IoStatsChartOutline />,
  },
];

export default links;

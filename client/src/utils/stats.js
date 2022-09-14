import { MdPendingActions } from 'react-icons/md';
import { TbClipboardOff, TbClipboardCheck } from 'react-icons/tb';
// import {
//   FcAddDatabase,
//   FcAcceptDatabase,
//   FcDeleteDatabase,
// } from 'react-icons/fc';

const defaultStats = [
  {
    id: 1,
    title: 'pending applications',
    icon: <MdPendingActions />,
    color: '#e9b949',
    bcg: '#fcefc7',
    status: 'pending',
  },
  {
    id: 2,
    title: 'interviews scheduled',
    icon: <TbClipboardCheck />,
    color: '#647acb',
    bcg: '#e0e8f9',
    status: 'interview',
  },
  {
    id: 3,
    title: 'jobs declined',
    icon: <TbClipboardOff />,
    color: '#d66a6a',
    bcg: '#ffeeee',
    status: 'declined',
  },
];
export default defaultStats;

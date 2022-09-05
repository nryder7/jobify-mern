const searchFormOptions = [
  { id: 1, name: 'company' },
  { id: 2, name: 'position' },
  { id: 3, name: 'officeLocation' },
  // { id: 3, name: 'jobLocation' },
  {
    id: 4,
    name: 'jobSetting',
    type: 'select',
    options: [
      { id: 0, value: 'all' },
      { id: 1, value: 'office' },
      { id: 2, value: 'hybrid' },
      { id: 3, value: 'remote' },
    ],
  },
  {
    id: 5,
    name: 'jobType',
    type: 'select',

    options: [
      { id: 0, value: 'all' },
      { id: 1, value: 'full-time' },
      { id: 2, value: 'part-time' },
      { id: 3, value: 'internship' },
    ],
  },
  {
    id: 6,
    name: 'jobStatus',
    type: 'select',
    options: [
      { id: 0, value: 'all' },
      { id: 1, value: 'pending' },
      { id: 2, value: 'interview' },
      { id: 3, value: 'declined' },
    ],
  },
];
export default searchFormOptions;

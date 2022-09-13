import * as Yup from 'yup';

export const textFields = [
  {
    id: 1,
    label: 'Company',
    name: 'company',
    type: 'company',
    placeholder: '',
  },
  {
    id: 2,
    label: 'Position',
    name: 'position',
    type: 'position',
    placeholder: '',
  },
  {
    id: 3,
    label: 'Office Location',
    name: 'officeLocation',
    type: 'officeLocation',
    placeholder: '',
  },
];

export const selectFields = [
  {
    id: 4,
    label: 'Job Setting',
    name: 'jobSetting',
    options: [
      { id: 1, value: 'office', textContent: 'Office' },
      { id: 2, value: 'hybrid', textContent: 'Hybrid' },
      { id: 3, value: 'remote', textContent: 'Remote' },
    ],
  },
  {
    id: 5,
    label: 'Job Type',
    name: 'jobType',
    options: [
      { id: 1, value: 'full-time', textContent: 'Full-time' },
      { id: 2, value: 'part-time', textContent: 'Part-time' },
      { id: 3, value: 'internship', textContent: 'Internship' },
    ],
  },
  {
    id: 6,
    label: 'Job Status',
    name: 'jobStatus',
    options: [
      { id: 1, value: 'pending', textContent: 'Pending' },
      { id: 2, value: 'interview', textContent: 'Interview' },
      { id: 3, value: 'declined', textContent: 'Declined' },
    ],
  },
];

export const resetValues = {
  company: '',
  position: '',
  officeLocation: '',
  jobType: '',
  jobSetting: '',
  jobStatus: '',
};

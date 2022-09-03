import { useEffect } from 'react';
import { JobsContainer, SearchContainer } from '../../components';
import { useAppContext } from '../../context/appContext';

const AllJobs = () => {
  // const { getJobs, jobs, totalJobs, numOfpages } = useAppContext();
  // useEffect(() => {
  //   getJobs();
  // }, []);
  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  );
};
export default AllJobs;

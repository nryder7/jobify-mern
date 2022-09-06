import { useEffect } from 'react';
import { JobsContainer, SearchContainer } from '../../components';
import { useAppContext } from '../../context/appContext';

const AllJobs = () => {
  const { setIsSearch, isSearch, clearForm } = useAppContext();
  useEffect(() => {
    // getJobs();
    clearForm();
    setIsSearch(true);
  }, []);
  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  );
};
export default AllJobs;

import { useEffect } from 'react';
import { Calendar, JobsContainer, Loading } from '../../components';
import { useAppContext } from '../../context/appContext';
const Stats = () => {
  const {
    isSearch,
    setIsSearch,
    clearForm,
    showStats,
    isLoading,
    monthlyApplications,
    company,
    getJobs,
    position,
    officeLocation,
    jobSetting,
    jobType,
    jobStatus,
    page,
    sort,
    date,
  } = useAppContext();

  useEffect(() => {
    clearForm();
  }, []);

  useEffect(() => {
    showStats();
    getJobs();
  }, [
    company,
    position,
    officeLocation,
    jobSetting,
    jobType,
    jobStatus,
    page,
    sort,
    date,
  ]);

  // useEffect(() => {
  //   // getJobs();
  //   clearForm();
  //   showStats();
  //   setIsSearch(true);
  // }, [isSearch]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Calendar />
      <JobsContainer />
    </>
  );
};

export default Stats;

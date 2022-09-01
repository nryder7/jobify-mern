const createJob = async (req, res) => {
  res.send('create');
};
const getAllJobs = async (req, res) => {
  res.send('getalljobs');
};
const deleteJob = async (req, res) => {
  res.send('delete');
};
const modifyJob = async (req, res) => {
  res.send('modify');
};
const showStats = async (req, res) => {
  res.send('showstats');
};

export { showStats, getAllJobs, createJob, modifyJob, deleteJob };

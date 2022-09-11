import { useEffect } from 'react';
import { MdCleaningServices } from 'react-icons/md';
import styled from 'styled-components';
import { Alert, FormRow } from './';
import { useAppContext } from '../context/appContext';
import FormikText from './FormikInputText';
import FormikCheckbox from './FormikInputCheckbox';
import FormikSelect from './FormikInputSelect';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

const textFields = [
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

const selectForm = [
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

const validationSchema = Yup.object({
  company: Yup.string().required('Required'),
  position: Yup.string().required('Required'),
  officeLocation: Yup.string().required('Required'),
  jobType: Yup.string('office'),
  jobStatus: Yup.string('full-time'),
  jobLocation: Yup.string('pending'),
});

const resetValues = {
  company: '',
  position: '',
  officeLocation: '',
  jobType: '',
  jobSetting: '',
  jobStatus: '',
};

const FormikForm = ({ title, handleSubmit }) => {
  const {
    jobIsEdit,
    company,
    position,
    officeLocation,
    jobType,
    jobSetting,
    jobStatus,
  } = useAppContext();

  const initialValues = {
    company: company || '',
    position: position || '',
    officeLocation: officeLocation || '',
    jobType: jobType || '',
    jobSetting: jobSetting || '',
    jobStatus: jobStatus || '',
  };

  return (
    <>
      <h1>{title}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          handleSubmit(values);

          setTimeout(() => {
            resetForm({ values: { ...resetValues } });
          }, 2500);
          await new Promise((r) => setTimeout(r, 500));
        }}
      >
        <Form>
          <div className='form-center'>
            {textFields.map((item) => (
              <div className='form-row'>
                <FormikText key={item.id} {...item} />
              </div>
            ))}
            {selectForm.map((item) => {
              return (
                <div className='form-row'>
                  <FormikSelect
                    key={item.id}
                    label={item.label}
                    name={item.name}
                  >
                    {item.options.map((item) => {
                      return (
                        <option key={item.id} value={item.value}>
                          {item.textContent}
                        </option>
                      );
                    })}
                  </FormikSelect>
                </div>
              );
            })}

            <div className='btn-container'>
              <button className='btn btn-block' type='submit'>
                submit
              </button>
              {/* <button className='btn btn-block clear-btn' type='button'>
                clear
              </button> */}
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

const AddJob = () => {
  const {
    alertVisible,
    clearForm,
    createJob,
    isLoading,
    jobIsEdit,
    setIsSearch,
  } = useAppContext();

  const handleSubmit = async (job) => {
    // e.preventDefault();
    const result = await createJob(job);
    return result;
  };
  const handleClear = (e) => {
    e.preventDefault();
    clearForm();
  };

  useEffect(() => {
    if (!jobIsEdit) {
      clearForm();
    }
    setIsSearch(false);
  }, []);

  return (
    <Wrapper>
      {alertVisible && <Alert />}
      <h3>{jobIsEdit ? 'edit job' : 'add job'}</h3>
      <div className='form-center'></div>
      <FormikForm
        className='form'
        handleSubmit={handleSubmit}
        jobIsEdit={jobIsEdit}
      />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin: 3rem auto;
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 2rem 2.5rem 2rem;
  /* padding: 3rem 2rem 4rem; */
  /* padding-bottom: 2rem; */
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
    font-size: 1.75rem;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  /* .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  } */
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      /* margin-top: 1rem; */
      /* margin-top: 0.25rem; */
    }
  }
  @media (min-width: 992px) {
    margin-top: 0;
  }
  @media (min-width: 1200px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      /* margin-top: 0; */
    }
  }
`;
export default AddJob;

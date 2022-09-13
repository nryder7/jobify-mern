import { useAppContext } from '../context/appContext';
import { FormikText, FormikSelect } from './';

import { Formik, Form } from 'formik';

import {
  textFields,
  selectFields,
  resetValues,
  validationSchema,
} from '../utils/jobForm';

const JobForm = ({
  title,
  handleSubmit,
  handleChange,
  handleClear,
  validateOnBlur = true,
  validateOnChange = true,
  clear = true,
  submit = true,
  all = false,
}) => {
  const {
    jobIsEdit,
    clearForm,
    company,
    position,
    officeLocation,
    jobType,
    jobSetting,
    jobStatus,
  } = useAppContext();

  const initialValues = {
    company: '',
    position: '',
    officeLocation: '',
    jobType: '',
    jobSetting: '',
    jobStatus: '',
  };

  if (jobIsEdit) {
    initialValues.company = company;
    initialValues.position = position;
    initialValues.officeLocation = officeLocation;
    initialValues.jobType = jobType;
    initialValues.jobSetting = jobSetting;
    initialValues.jobStatus = jobStatus;
  }

  return (
    <>
      <h3>{title}</h3>
      <Formik
        initialValues={all ? resetValues : initialValues}
        validationSchema={validationSchema}
        validateOnChange={validateOnChange}
        validateOnBlur={validateOnBlur}
        onSubmit={
          submit
            ? async (values, { setSubmitting, resetForm }) => {
                handleSubmit(values);

                setTimeout(() => {
                  resetForm({ values: { ...resetValues } });
                }, 2500);
                await new Promise((r) => setTimeout(r, 500));
              }
            : null
        }
      >
        {({ resetForm }) => {
          return (
            <Form onChange={handleChange}>
              <div className='form-center'>
                {textFields.map((item) => (
                  <FormikText key={item.id} {...item} />
                ))}
                {selectFields.map((item) => {
                  return (
                    <FormikSelect
                      key={item.id}
                      label={item.label}
                      name={item.name}
                      options={item.options}
                      all={all}
                    ></FormikSelect>
                  );
                })}
                <div className='btn-container'>
                  {submit ? (
                    <button className='btn btn-block' type='submit'>
                      submit
                    </button>
                  ) : null}
                  {clear ? (
                    <button
                      className='btn btn-block clear-btn'
                      type='button'
                      onClick={() => {
                        resetForm({ values: { ...resetValues } });
                        clearForm();
                      }}
                    >
                      clear
                    </button>
                  ) : null}
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default JobForm;

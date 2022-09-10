import * as Yup from 'yup';
import { useEffect } from 'react';
import { Formik, Form } from 'formik';
// import './styles.css';
// import '../styles-custom.css';
import FormikText from './FormikInputText';
import FormikCheckbox from './FormikInputCheckbox';
import FormikSelect from './FormikInputSelect';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  acceptedTerms: false, // checkbox
  jobType: '', // select
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Must 8 characters or more')
    .max(50, 'Must be 50 characters or less')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  acceptedTerms: Yup.boolean()
    .required('Required')
    .oneOf([true], 'You must accept the terms and conditions.'),
  jobType: Yup.string()
    // specify the set of valid values for job type
    // @see http://bit.ly/yup-mixed-oneOf
    .oneOf(['designer', 'development', 'product', 'other'], 'Invalid Job Type')
    .required('Required'),
});

const textFields = [
  {
    id: 1,
    label: 'First Name',
    name: 'firstName',
    type: 'text',
    placeholder: 'Jane',
  },
  {
    id: 2,
    label: 'Last Name',
    name: 'lastName',
    type: 'text',
    placeholder: 'Doe',
  },
  {
    id: 3,
    label: 'Email Address',
    name: 'email',
    type: 'email',
    placeholder: 'jane@formik.com',
  },
  {
    id: 4,
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: '',
  },
];

const selectForm = [
  {
    id: 1,
    label: 'Job Type',
    name: 'jobType',
    options: [
      { id: 1, value: '', textContent: 'Select a job type' },
      { id: 2, value: 'designer', textContent: 'Designer' },
      { id: 3, value: 'development', textContent: 'Developer' },
      { id: 4, value: 'product', textContent: 'Product Manager' },
      { id: 5, value: 'other', textContent: 'Other' },
    ],
  },
];

const FormikForm = ({ title, isMember, loginUser, registerUser }) => {
  return (
    <>
      <h1>{title}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const { email, firstName: name, password } = values;
          if (isMember) {
            loginUser({ email, password });
          } else {
            registerUser({ email, name, password });
          }
          await new Promise((r) => setTimeout(r, 500));
          setSubmitting(false);
        }}
      >
        <Form>
          {textFields.map((item) => (
            <FormikText key={item.id} {...item} />
          ))}
          {selectForm.map((item) => {
            return (
              <FormikSelect key={item.id} label={item.label} name={item.name}>
                {item.options.map((item) => {
                  return (
                    <option key={item.id} value={item.value}>
                      {item.textContent}
                    </option>
                  );
                })}
              </FormikSelect>
            );
          })}

          <FormikCheckbox name='acceptedTerms'>
            I accept the terms and conditions
          </FormikCheckbox>

          <button className='btn btn-block' type='submit'>
            Submit
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default FormikForm;

// export { validationSchema, initialValues, textFields, selectForm };

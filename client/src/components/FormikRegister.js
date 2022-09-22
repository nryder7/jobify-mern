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

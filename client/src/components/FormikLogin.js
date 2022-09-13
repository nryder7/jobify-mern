import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import FormikText from './FormikInputText';
import FormikCheckbox from './FormikInputCheckbox';
import FormikSelect from './FormikInputSelect';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  password: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
});

const textFields = [
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

const FormikForm = ({ title, isMember, loginUser }) => {
  return (
    <>
      <h1>{title}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const { email, password } = values;
          loginUser({ email, password });
          await new Promise((r) => setTimeout(r, 500));
          setSubmitting(false);
        }}
      >
        <Form>
          {textFields.map((item) => (
            <FormikText key={item.id} {...item} />
          ))}

          <button className='btn btn-block' type='submit'>
            Submit
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default FormikForm;

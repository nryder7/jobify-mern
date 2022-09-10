import { useEffect } from 'react';
import { Formik, Form } from 'formik';
// import './styles.css';
// import '../styles-custom.css';
import FormikText from './FormikInputText';
import FormikCheckbox from './FormikInputCheckbox';
import FormikSelect from './FormikInputSelect';

import {
  initialValues,
  validationSchema,
  textFields,
  selectForm,
} from './FormikSignupForm';

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

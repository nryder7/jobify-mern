import { useField } from 'formik';

const FormikText = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label htmlFor={props.id || props.name}>{label}</label>
        {meta.touched && meta.error ? (
          <span className='error'>{meta.error}</span>
        ) : null}
      </div>
      <input className='form-input' {...field} {...props} />
      {/* <input className='text-input' {...field} {...props} /> */}
    </>
  );
};

export default FormikText;

const FormRow = ({ type, name, value, handleChange }) => {
  const labelText = name.split(/(?=[A-Z])/).join(' ');
  return (
    <div className='form-row'>
      <label className='form-label' htmlFor={name}>
        {labelText}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        id={name}
        className='form-input'
        onChange={handleChange}
      />
    </div>
  );
};
export default FormRow;

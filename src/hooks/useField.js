import { useState } from 'react';

export const useField = ({ type, defaultValue = '', regExp }) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(false);

  /* const handleChange = (event) => {
    setValue(event.target.value);
    setError(!regExp?.test(event.target.value));
  }; */

  const onChange = (event) => {
    setValue(event.target.value);
    setError(!regExp?.test(event.target.value));
  };

  const reset = () => {
    setValue('');
    setError(false);
  };

  return {
    type,
    value,
    setValue,
    error,
    reset,
    onChange
  };
};
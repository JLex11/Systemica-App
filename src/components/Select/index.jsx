import { memo } from 'react';

const Select = ({ field, options, name }) => {
  return (
    <select
      name={name}
      id={name}
      defaultValue={field?.value || options[0]?.id}
      onChange={field.onChange}
    >
      {options?.map(op => (
        <option
          key={op?.id || op?.label || op}
          value={op?.id || op?.label || op}
        >
          {op?.label || op}
        </option>
      ))}
    </select>
  );
};

export default memo(Select);
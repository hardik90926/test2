import React from 'react'
import ReactDatePicker from 'react-datepicker';
import { useController } from 'react-hook-form';
import AsyncSelect from "react-select/async";
import Select from 'react-select';
import { DATABASE_TYPES, NUMBER_TYPES, STRING_TYPES } from '../../constant/common';
import { Input } from '../Form/Input';
import { loadOptions } from '../../api/general';

export const FilterValue = ({ attribute = {}, name, control }) => {

  const { field, fieldState: { error } } = useController({ name, control, rules: { required: { value: true, message: 'This field is required' } } });

  const getValue = (value, options) => {
    return options.find(item => item.value === value);
  };

  const booleanOptions = [
    { label: 'True', value: true },
    { label: 'False', value: false }
  ];

  if (attribute?.modelName) {
    return (
      <div>
        <AsyncSelect
          isMulti
          placeholder={<div>Type to search</div>}
          cacheOptions
          className="digits-container"
          classNamePrefix="select_box"
          getOptionLabel={(option) => option[attribute?.displayAttribute]}
          getOptionValue={(option) => option[attribute?.valueAttribute]}
          loadOptions={(inputValue, callback) =>
            loadOptions(
              { ref: attribute?.modelName, displayAttribute: attribute?.displayAttribute },
              inputValue,
              callback
            )
          }
          name={field.name}
          isClearable
          onChange={(data) => {
            if (data && Array.isArray(data)) {
              field.onChange(data?.map(item => item[attribute?.valueAttribute]));
            }
          }}
        />
        {
          error && <p style={{ color: 'red' }}>{error?.message}</p>
        }
      </div>
    );
  }

  if (attribute?.enum && Object.keys(attribute?.enum).length > 0) {
    const enumOptions = Object.keys(attribute.enum).map(key => ({ label: key, value: attribute.enum[key] }));
    return (
      <div>
        <Select
          isMulti
          ref={field.ref}
          name={name}
          className="digits-container"
          classNamePrefix="select_box"
          options={enumOptions}
          value={getValue(field.value, enumOptions)}
          onChange={(data) => field.onChange(data?.value)}
          placeholder="Select..."
        />
        {
          error && <p style={{ color: 'red' }}>{error?.message}</p>
        }
      </div>
    );
  }

  if (STRING_TYPES.includes(attribute.attrType)) {
    return (
      <div>
        <Input
          type="text"
          {...field}
        />
        {
          error && <p style={{ color: 'red' }}>{error?.message}</p>
        }
      </div>
    );
  }


  if (NUMBER_TYPES.includes(attribute.attrType)) {
    return (
      <div>
        <Input
          type="number"
          {...field}
        />
        {
          error && <p style={{ color: 'red' }}>{error?.message}</p>
        }
      </div>
    );
  }

  if (attribute.attrType === DATABASE_TYPES.BOOL) {
    return (
      <div>
        <Select
          ref={field.ref}
          name={name}
          className="digits-container"
          classNamePrefix="select_box"
          options={booleanOptions}
          value={getValue(field.value, booleanOptions)}
          onChange={(data) => field.onChange(data?.value)}
          placeholder="Select..."
        />
        {
          error && <p style={{ color: 'red' }}>{error?.message}</p>
        }
      </div>
    );
  }

  if (attribute?.attrType === DATABASE_TYPES.DATE) {
    return (
      <div>
        <ReactDatePicker
          selected={field?.value ? new Date(field.value) : undefined}
          selectsStart
          wrapperClassName="form-group"
          startDate={field?.value ? new Date(field.value) : undefined}
          {...field}
        />
        {
          error && <p style={{ color: 'red' }}>{error?.message}</p>
        }
      </div>
    )
  }

  return (
    <div>
      <Input
        type="text"
        {...field}
      />
      {
        error && <p style={{ color: 'red' }}>{error?.message}</p>
      }
    </div>
  );
}

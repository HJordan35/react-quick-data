import React from 'react';
import PropTypes from 'prop-types'

import styled from 'styled-components';

const Field = styled.select`
  display: block;
  margin: 8px;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 15px;
  width: 300px;
`;
const Select = props => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}> {props.title} </label>
      <Field id={props.name} name={props.name} value={props.value} onChange={props.handleChange}>
        <option value="" disabled>
          {props.placeholder}
        </option>
        {props.options.map(option => {
          return (
            <option key={option} value={option} label={option}>
              {option}
            </option>
          );
        })}
      </Field>
    </div>
  );
};


Select.propTypes = {
    title: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func,
    placeholder: PropTypes.string,
    options: PropTypes.array,
  }
  

export default Select;

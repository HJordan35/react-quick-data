import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Field = styled.textarea`
  display: block;
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 15px;
  width: 300px;
`;

const TextArea = props => {
  return (
    <div className="form-group">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <Field
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
      />
    </div>
  );
};

TextArea.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string
};

export default TextArea;

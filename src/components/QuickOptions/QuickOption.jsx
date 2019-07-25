import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Option = styled.div`
  position: relative;
  width: 100%;
  padding: 8px;
  background-color: white;
  border-bottom: 0.5px solid lightgray;
  box-sizing: border-box;
`;

export const QuickOption = props => {
  return <Option>{props.option}</Option>;
};

QuickOption.propTypes = {};

export default QuickOption;

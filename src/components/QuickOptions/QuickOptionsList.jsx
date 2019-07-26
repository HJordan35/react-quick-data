import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QuickOption from './QuickOption';

const OptionList = styled.div`
  width: auto;
  min-width: 150px;
  overflow: hidden;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 12px lightgray;
  position: absolute;
  top: calc(${props => props.caretY} + 14px);
  left: 16px;
  box-sizing: content-box;
`;

export const QuickOptionsList = props => {
  let { filteredOptions } = props;
  let renderList = [];

  if (filteredOptions && filteredOptions.length > 0) {
    renderList = filteredOptions.map((field, index) => {
      return <QuickOption key={index} selectOption={props.selectOption} option={field} />;
    });
  }

  return <OptionList {...props}>{renderList}</OptionList>;
};

QuickOptionsList.propTypes = {};

export default QuickOptionsList;

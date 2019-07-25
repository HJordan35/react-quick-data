import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
    
const OptionList = styled.div`
    width: fit-content;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 0px 12px lightgray;
    position: absolute;
    top: calc(${props => props.caretY} + 14px);
    left: 16px;
`;
export const QuickOptionsList = (props) => {
     return (
     <OptionList {...props}>
         <p>{props.caretX} and {props.caretY}</p>
     </OptionList>);
}
    
QuickOptionsList.propTypes = {};
    
export default QuickOptionsList
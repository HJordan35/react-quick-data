import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components
import QuickOptionsList from '../QuickOptions/QuickOptionsList';

// Utilities
import {getCursorXY} from '../../utilities/coordinateUtilities';

const TextArea = styled.textarea`
  overflow: scroll;
`;

export class QuickDataArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         caretX: 0,
         caretY: 0
    };
  }

  updateCaretPosition(event) {
    // let caret = getCaretCoordinates(event.target, event.target.selectionEnd);
   let caret = getCursorXY(event.target, event.target.selectionStart);
   let xPX = caret.x.toString() + "px";
   let yPX = caret.y.toString() + "px";

   this.setState({caretX: xPX, caretY: yPX});
    console.log(caret);
  }

  render() {
    return (
      <React.Fragment>
        <TextArea onChange={event => this.updateCaretPosition(event)} />
        <QuickOptionsList caretX={this.state.caretX} caretY={this.state.caretY}/>
      </React.Fragment>
    );
  }
}

QuickDataArea.propTypes = {};

export default QuickDataArea;

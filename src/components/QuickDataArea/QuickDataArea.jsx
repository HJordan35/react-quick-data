import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components
import QuickOptionsList from '../QuickOptions/QuickOptionsList';

// Utilities
import {getCursorXY} from '../../utilities/coordinateUtilities';
import {constructFormManifest} from '../../utilities/formUtilities';

const TextArea = styled.textarea`
  overflow: scroll;
  display: block;
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 15px;
  width: 300px;
`;

export class QuickDataArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
         caretX: 0,
         caretY: 0,
         fieldManifest: {}
    };
  }

  componentDidMount() {
    this.initializeFormFields();
  }

  initializeFormFields = () => {
    const { formId } = this.props;
    if(formId) {
      let form = document.getElementById(formId);
      let fieldList = [...form];
      let formManifest = constructFormManifest(fieldList);
      this.setState({fieldManifest: formManifest})
      console.log(formManifest);
    }
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
        <button style={{display: 'block'}} onClick={this.initializeFormFields}>Initialize Form</button>
        <TextArea onChange={event => this.updateCaretPosition(event)} />
        <QuickOptionsList caretX={this.state.caretX} caretY={this.state.caretY} fieldManifest={this.state.fieldManifest}/>
      </React.Fragment>
    );
  }
}

QuickDataArea.propTypes = {};

export default QuickDataArea;

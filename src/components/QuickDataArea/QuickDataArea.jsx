import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components
import QuickOptionsList from '../QuickOptions/QuickOptionsList';

// Utilities
import { getCursorXY } from '../../utilities/coordinateUtilities';
import { constructFormManifest } from '../../utilities/formUtilities';

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
      fieldManifest: {},
      hashWord: ''
    };
  }

  componentDidMount() {
    this.initializeFormFields();
  }

  initializeFormFields = () => {
    const { formId } = this.props;
    if (formId) {
      let form = document.getElementById(formId);
      let fieldList = [...form];
      let formManifest = constructFormManifest(fieldList);
      this.setState({ fieldManifest: formManifest });
    }
  };

  updateCaretPosition(event) {
    let caret = getCursorXY(event.target, event.target.selectionStart);
    let xPX = caret.x.toString() + 'px';
    let yPX = caret.y.toString() + 'px';

    this.setState({ caretX: xPX, caretY: yPX });
  }

  detectAutoComplete(event) {
    this.updateCaretPosition(event);
    let element = document.getElementById('1234');
    let lastWord = '',
      caretPos;
    if (window.getSelection) {
      caretPos = element.selectionStart;
      let text = event.target.value;
      let leadText = text.substring(0, caretPos);
      if (leadText.indexOf(' ') > 0) {
        var words = leadText.split(' ');
        lastWord = words[words.length - 1]; //return last word
      }
    }
    let matches = lastWord.match(/#(.+)$/i);
    if (matches) this.setState({ hashWord: matches[1] });
  }

  render() {
    return (
      <React.Fragment>
        <button style={{ display: 'block' }} onClick={this.initializeFormFields}>
          Initialize Form
        </button>
        <TextArea id="1234" onChange={event => this.detectAutoComplete(event)} />
        <QuickOptionsList
          caretX={this.state.caretX}
          caretY={this.state.caretY}
          fieldManifest={this.state.fieldManifest}
          hashWord={this.state.hashWord}
        />
      </React.Fragment>
    );
  }
}

QuickDataArea.propTypes = {};

export default QuickDataArea;

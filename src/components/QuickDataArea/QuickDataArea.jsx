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
  height: 500px;
`;

export class QuickDataArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caretX: 0,
      caretY: 0,
      caretIndex: 0,
      fieldManifest: {},
      activeSuggestion: 0,
      filteredSuggestions: [],
      textAreaValue: ''
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

  detectAutoComplete = event => {
    let { caretX, caretY, caretIndex } = this.updateCaretPosition(event);
    let lastWord = '',
      hashWord;
    let text = event.target.value;
    let leadText = text.substring(0, caretIndex + 1);
    if (leadText.indexOf(' ') > 0) {
      var words = leadText.split(' ');
      lastWord = words[words.length - 1];
    } else {
      lastWord = leadText;
    }

    let matches = lastWord.match(/#(.+)$/i);
    hashWord = matches ? matches[1] : '';

    this.setFilterFieldOptions(event.target.value, hashWord, caretX, caretY, caretIndex);
  };

  setFilterFieldOptions = (textAreaValue, hashWord, caretX, caretY, caretIndex) => {
    if (hashWord) {
      const fieldList = Object.keys(this.state.fieldManifest);
      const filteredSuggestions = fieldList.filter(
        suggestion => suggestion.toLowerCase().indexOf(hashWord.toLowerCase()) > -1
      );

      this.setState({
        caretX: caretX,
        caretY: caretY,
        caretIndex: caretIndex,
        activeSuggestion: 0,
        filteredSuggestions,
        showSuggestions: true,
        textAreaValue: textAreaValue
      });
    } else {
      this.setState({
        caretX: caretX,
        caretY: caretY,
        caretIndex: caretIndex,
        activeSuggestion: 0,
        showSuggestions: false,
        filteredSuggestions: [],
        textAreaValue: textAreaValue
      });
    }
  };

  injectAutoCompleteValue = selection => {
    let text = this.state.textAreaValue;
    let leadText = text.substring(0, this.state.caretIndex);
    let hashWords = leadText.split('#');
    let truncLength = hashWords[hashWords.length - 1].length;

    text = text.substring(0, text.length - truncLength);
    return text.concat(`${selection}: `);
  };

  selectOption = event => {
    let quickTextArea = document.getElementById('quickArea');
    let updatedText = this.injectAutoCompleteValue(event.currentTarget.innerText);
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      textAreaValue: updatedText
    });
    quickTextArea.focus();
    quickTextArea.selectionStart = updatedText.length;
    quickTextArea.selectionEnd = updatedText.length;
  };

  handleKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
    // User pressed the enter key, update the input and close the
    // suggestions
    if ((e.keyCode === 13 || e.keyCode === 9) && filteredSuggestions.length > 0) {
      e.preventDefault();
      let quickTextArea = document.getElementById('quickArea');
      let updatedText = this.injectAutoCompleteValue(filteredSuggestions[activeSuggestion]);
      this.setState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        textAreaValue: updatedText
      });
      quickTextArea.selectionStart = updatedText.length;
      quickTextArea.selectionEnd = updatedText.length;
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  updateCaretPosition(event) {
    let caretIndex = event.target.selectionStart;
    let caret = getCursorXY(event.target, event.target.selectionStart);
    let xPX = caret.x.toString() + 'px';
    let yPX = caret.y.toString() + 'px';

    return { caretX: xPX, caretY: yPX, caretIndex: caretIndex };
  }

  render() {
    return (
      <React.Fragment>
        <button style={{ display: 'block' }} onClick={this.initializeFormFields}>
          Initialize Form
        </button>
        <TextArea id="quickArea" 
          value={this.state.textAreaValue} 
          onChange={event => this.detectAutoComplete(event)}
          onKeyDown={event => this.handleKeyDown(event)} />
        <QuickOptionsList
          caretX={this.state.caretX}
          caretY={this.state.caretY}
          filteredOptions={this.state.filteredSuggestions}
          selectOption={this.selectOption}
          selectedIndex={this.state.activeSuggestion}
        />
      </React.Fragment>
    );
  }
}

QuickDataArea.propTypes = {};

export default QuickDataArea;

import React from 'react';

// Components
import TestForm from './components/TestForm/TestForm';
import QuickDataArea from './components/QuickDataArea/QuickDataArea';

function App() {
  return (
    <React.Fragment>
      <TestForm />
      <div style={{ marginTop: '24px' }}>
        <h1>Quick Data Entry</h1>
        <QuickDataArea formId="testForm"/>
      </div>
    </React.Fragment>
  );
}

export default App;

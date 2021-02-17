import React from 'react';
import ASViewer from '../components/as-viewer/as-viewer';
import './app.styles.scss';

interface Props {
  "data-testid"?: string
}

const App = (props:Props) => {
  const testId = props['data-testid'];
  return (
    <div className="App" data-testid={testId}>

      <ASViewer />
    </div>
  );
}

export default App;

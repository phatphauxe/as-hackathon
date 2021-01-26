import React from 'react';
import ASViewer from '../components/as-viewer/as-viewer';
import './app.styles.scss';

interface Props {};

const App = (props:Props) => {
  
  return (
    <div className="App">
      <ASViewer />
    </div>
  );
}

export default App;

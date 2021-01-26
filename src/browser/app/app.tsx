import React from 'react';
import ASViewer from '../components/as-viewer/as-viewer';
import './app.styles.scss';

interface Props {
  "data-testid"?:string
};

const App = (props:Props) => {
  const testId = props['data-testid'];
  return (
    <div className="App" data-testid={testId}>

      {/* DELETE ME */}
      <div style={{fontSize: '32px', fontWeight: 'bold', marginTop: '200px', marginBottom: '-200px'}}>AS HACKATHON&nbsp;&nbsp;&nbsp;1 / 28 / 2021</div>
      
      <ASViewer />
    </div>
  );
}

export default App;

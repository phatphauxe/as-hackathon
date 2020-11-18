import React, { useEffect } from 'react';
import {AS, SphereData} from './assets/models';
import './App.css';

interface Props {};
declare var AerialSphere: new (id:string, className:string, data?:SphereData) => AS;

const App = (props:Props) => {
  const [asApp, setAsApp] = React.useState<AS | null>(null);

  //calls can be made to asApp
  
  useEffect(() => {
    if(!asApp){
      setAsApp(new AerialSphere('aerialsphere-map', 'aerialSphereMapClass', {}));
    }
  }, [asApp]);
  return (
    <div className="App">
      <div id='aerialsphere-map' />
    </div>
  );
}

export default App;

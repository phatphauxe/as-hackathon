import React from 'react';
import {AS, SphereData } from '../../../assets/models';
import {loadViewer} from '../../../content/http';
import './as-viewer.styles.scss';

export interface StateProps {
	appLoaded: boolean,
	AS: AS | null;
}

export interface DispatchProps {
	setAerialSphere: (aerialSphere:AS) => void;
	setAppLoaded: () => void;
}

export type ASViewerProps = StateProps & DispatchProps;
declare global {
	
	var AerialSphere:  new (id:string, className:string, data?:SphereData) => AS;
	
}

/// This loads the viewer and provides access to the AerialSphere api
const ASViewer = (props:ASViewerProps) => {
	const { appLoaded, setAerialSphere, setAppLoaded } = props;
	
	React.useEffect(() => {
		if(appLoaded){
			const aerialSphere = new AerialSphere('as-viewer', 'aerial-sphere-container', /*loaded sphere data*/);
			setAerialSphere(aerialSphere);
		}
		else {
			// loadViewer ( callback: () => void, useDev?:boolean, key?:string)
			loadViewer(() => { setAppLoaded()}, true); 
		}
	}, [appLoaded, setAppLoaded, setAerialSphere])

	return (
		<div id={'as-viewer'} className={'aerial-sphere-container'} />
	);
}

export default ASViewer;

export interface ApiMarker {
	id: number | string;
	lat: number;
	lng: number;
	name?: string;
	icon?: string;
	style?: object
}

export interface ApiLayer {
	name: string;
	visible?: boolean;
	markers: Array<ApiMarker>;
}

export interface Pano {
	id: number;
	longitude: number;
	latitude: number;
}

export interface OnClickResponse {
	pan: number;
	tilt: number;
	lat: number;
	lon: number;
	lng: number;
	ele: number;
	input_lat: number;
	input_lon: number;
	input_lng: number;
}

export interface OnMarkerClickResponse {
	id: number;
}

export interface OnViewChangeResponse {
	eventName: string;
	azimuthAngle: number;
	polarAngle: number;
	zoom: number;
}

export interface SphereData {
	sphereLat?: number;
	sphereLng?: number;
	title?: string;
	lookAtLat?: number;
	lookAtLng?: number;
	cameraFov?: number;
	cameraFovMin?: number;
	cameraFovMax?: number;
	layers?: Array<ApiLayer>;
}

export interface Position {
	lat: number;
	lng: number;
}
  
export interface Marker {
	position: Position
}
  
export interface PanoMarker {
	marker: Marker
}
  
export interface NearestPano {
	distance: number;
	panoMarker: PanoMarker;
}
  
export interface AS {
	openPanoramaById: (panoId: number) => void;
	closePanorama: () => void;
	getPanoramas: (callback?: Function) => Array<Pano>;
	onClick(handler: (response: OnClickResponse) => void): void;
	onMarkerClick(handler: (response: OnMarkerClickResponse) => void): void;
	onViewChange(handler: (response: OnViewChangeResponse) => void): void;
	getPositionInfo: (x: Number, y: Number, callback: Function) => void;
	sendData: (sphereData: SphereData) => void;
	getNearestPano: (lat: number, lng: number) => NearestPano;
	lookAt: (pan: number, tilt: number) => void;
	setFov: (fov: number) => void;
	setFovRange: (fovMin: number, fovMax: number) => void;
	setLayerVisibility: (name: string, visible: boolean) => void;
	openMap: () => void;
	openPanorama: () => void;
}

export declare var AerialSphere: new (id:string, className:string, data?:SphereData) => AS;
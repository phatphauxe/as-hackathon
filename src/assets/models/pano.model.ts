import { ApiLayer } from "./viewer.model";

export interface Pano {
	id: number;
	longitude: number;
	latitude: number;
}

export interface ApiAutoRotate {
	on: boolean;
	speed: number;
	right: boolean;
	tilt?: number;
	fov?: number;
	zoom?: number;
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
	cameraZoom?: number;
	cameraZoomMin?: number;
	cameraZoomMax?: number;
	autoRotate?: ApiAutoRotate;
	layers?: Array<ApiLayer>;
}


import { ApiLayer } from "./viewer.model";

export interface Pano {
	id: number;
	longitude: number;
	latitude: number;
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


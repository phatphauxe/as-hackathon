import { OnClickResponse, OnMarkerClickResponse, OnViewChangeResponse } from "./event.model";
import { Pano, SphereData } from "./pano.model";
import { ApiLayer, ApiMarker, LookAt, NearestPano, UIOptions, WidgetType } from "./viewer.model";


/**
 * name AerialSphere
 * 
 */
export interface AS {
	/** 
	 * 	@name closePanorama
	 *  @type Function
	 * 	@description Close the current open panorama. Does not function if viewing the google map.
	 *  @returns {void} void
	 */
	closePanorama: () => void;
	/**
	 *  @name getActivePano
	 *  @type Function
	 *  @description Returns the Pano details of the currently selected panorama.
	 *  @returns Promise<Pano>
	 */
	getActivePano: () => Promise<Pano>;
	/**
	 * @name getData
	 * @type Function
	 * @description Returns the current SphereData if set.
	 * @returns {Promise<SphereData>} Promise<SphereData>
	 */
	getData: () => Promise<SphereData>;
	/**
	 *  @name getFov
	 *  @type Function
	 *  @description Returns the Fov information as a SphereData object.
	 *  @returns {Promise<SphereData>} Promise<SphereData>
	 */
	getFov: () => Promise<SphereData>;
	/**
	 * @name getFovRange
	 * @type Function
	 * @description Returns FovRange information as a SphereData object.
	 * @returns {Promise<SphereData>} Promise<SphereData>
	 * 
	 */
	getFovRange: () => Promise<SphereData>;
	/**
	 * @name getLayer
	 * @type Function
	 * @param {string} name String name of the Layer requested.
	 * @description Returns the requested ApiLayer with the string name.
	 * @returns {Promise<ApiLayer>} Promise<ApiLayer>
	 */
	getLayer: (name: string) => Promise<ApiLayer>;
	
    getLookAt: () => Promise<LookAt>;
    getMarker: (id: number | string) => Promise<ApiMarker>;
    getNearestPano: (lat: number, lng: number) => Promise<NearestPano>;
    getPanoramas: (callback?: (panos: Array<Pano>) => void) => Promise<Array<Pano>>;
    getPositionInfo: (
        x: number,
        y: number,
        callback?: (panos: Array<number>) => void
    ) => Promise<Array<number>>;
    getZoom: () => Promise<SphereData>;
    getZoomRange: () => Promise<SphereData>;
    lookAt: (pan: number, tilt: number) => void;
    onClick(handler: (response: OnClickResponse) => void): void;
    onMarkerClick(handler: (response: OnMarkerClickResponse) => void): void;
    onViewChange(handler: (response: OnViewChangeResponse) => void): void;
    openMap: () => void;
    openPanorama: () => void;
    openPanoramaById: (panoId: number) => void;
    addMarker: ((
        lat: number | null,
        lng: number | null,
        address?: string,
        name?: string,
        icon?: string,
        layer?: string,
        id?: number | string,
        metaData?: { [key: string]: string },
        callback?: (marker: ApiMarker) => void
    ) => Promise<ApiMarker>) &
        ((
            marker: ApiMarker,
            layerName?: number | string,
            address?: string,
            callback?: (marker: ApiMarker) => void
        ) => Promise<ApiMarker>);
    removeAllMarkers: () => void;
    sendData: (sphereData: SphereData) => void;
    setFov: (fov: number) => void;
    setFovRange: (fovMin: number, fovMax: number) => void;
    setZoom: (zoom: number) => void;
    setZoomRange: (zoomMin: number, zoomMax: number) => void;
    setLayerVisibility: (name: string, visible: boolean) => void;
    setWidgetEnabled: (
        widgetName: WidgetType | WidgetType[],
        enabled: boolean
    ) => Promise<UIOptions>;
}


export declare var AerialSphere: new (id:string, className:string, data?:SphereData) => AS;
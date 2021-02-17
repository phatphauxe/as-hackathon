import { AS } from ".";

export interface ASReducerState {
	AS: AS | null;
}

export interface AppDataReducerState {
	appLoaded: boolean;
	data: string[] | null;
	zipCodes: ZipCode[],
	currentZipCode: ZipCode,
	listings: Listing[]
}

export interface Listing {
	id: number;
	img: string;
	link: string;
	address: string;
	price: number;
	beds: number;
	baths: number;
	footage: number;
	lat?: number;
	lng?: number;
}

export interface ZipCode {
	zip: string;
	mls: string;
	city: string;
}

export interface State {
	appData?: AppDataReducerState,
	aerialSphereData?: ASReducerState,
	zipCodes: ZipCode[],
	currentZipCode: ZipCode,
	listings: Listing[]
}

export interface SearchObject {
	Listing: {
		StreetAddress: {
			StreetNumber: string;
			StreetDirPrefix: string;
			StreetName: string;
			StreetSuffix: string;
			UnitNumber: string;
			City: string;
			PostalCode: string;
		},
		GeographicData: {
			Latitude: string;
			Longitude: string;
		},
		ListingID: string;
		Image: string;
	}
}

export interface SearchResults {
	TotalCount: number,
	Objects: SearchObject[];
}

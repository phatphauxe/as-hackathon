import { Action } from 'redux';
import {Listing, SearchResults, State, ZipCode} from '../../../assets/models/store.model';
import Selectors from '../../../content/store/selectors';
import { ActionModels } from '../../../content/store/actions';
import ASViewerComponent, {StateProps, DispatchProps, ASViewerProps} from './as-viewer.component';
import { AS } from '../../../assets/models';
import { connect } from 'react-redux';
import {selectCurrentZipCode, selectListings, selectZipCodes} from "../../../content/store/selectors/appData.selector";
import {getListings} from "../../../services/rets";

const mapStateToProps = (state:State):StateProps => {
	const currentZipCode = selectCurrentZipCode(state);
	const zipCodes = selectZipCodes(state);
	const listings = selectListings(state);
	return {
		appLoaded: Selectors.App.selectAppLoaded(state),
		AS: Selectors.AS.selectAerialSphere(state),
		currentZipCode,
		zipCodes,
		listings
	}
}

const mapDispatchToProps = (dispatch: (action:Action) => void):DispatchProps => {
	return {
		dispatch,
		setAerialSphere: (aerialSphere:AS) => {
			dispatch(ActionModels.AS.setAerialSphere(aerialSphere));
		},
		setAppLoaded: () => {
			dispatch(ActionModels.App.appLoaded());
		}
	}
}

const makeAddress = (obj: any) => {
	const addr = obj.Listing.StreetAddress;
	const combined = `${addr.StreetNumber || ''} ${addr.StreetDirPrefix || ''} ${addr.StreetName || ''} ${addr.StreetSuffix || ''} ${addr.UnitNumber || ''}, ${addr.City || ''}, AZ ${addr.PostalCode || ''}`;
	return combined.replace(/  +/g, ' ');
}

const convertFormat = (objs: any[]): Listing[] => {
	return objs.map((obj: any) => {
		return {
			id: obj.Listing.ListingID,
			img: `http://localhost:5000/img/${obj.Listing.Image}`,
			link: `https://www.google.com/search?q=mls+${obj.Listing.ListingID}`,
			address: makeAddress(obj),
			price: Number(obj.Listing.ListingData.ListPrice._ || 0),
			beds: Number(obj.Bedrooms._ || 0),
			baths: Number(obj.Baths.BathsTotal._ || 0),
			footage: Number(obj.LivingArea.Area._ || 0),
			lat: Number(obj.Listing.GeographicData.Latitude || 0),
			lng: Number(obj.Listing.GeographicData.Longitude || 0),
		};
	})
}

const mergeProps = (
	stateProps: StateProps,
	dispatchProps: DispatchProps,
): ASViewerProps => {
	const { zipCodes } = stateProps;
	const { dispatch } = dispatchProps;
	return {
		...stateProps,
		...dispatchProps,
		setCurrentZipCode: async (mls: string) => {
			// dispatch(ActionModels.App.setListings([]));
			const data: SearchResults = JSON.parse((await getListings(mls)).text);
			console.info(data)
			const listings = convertFormat(data.Objects);
			dispatch(ActionModels.App.setListings(listings));
			const zipCode = zipCodes.find((zipCode: ZipCode) => zipCode.mls === mls) || {zip: '85028', mls:'OW542DCT1SQ', city:'Phoenix'};
			dispatch(ActionModels.App.setCurrentZipCode(zipCode));
		}
	};
};


export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ASViewerComponent)

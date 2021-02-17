import React, {ChangeEvent} from 'react';
import {ApiMarker, AS, Marker, SphereData} from '../../../assets/models';
import {loadViewer} from '../../../content/http';
import './as-viewer.styles.scss';
import capitalize from 'lodash/capitalize';
import isNumber from 'lodash/isNumber';
import sortBy from 'lodash/sortBy';
import trim from 'lodash/trim';
import get from 'lodash/get';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import {AppBar, GridList, GridListTile, GridListTileBar, IconButton, MenuItem, Select, Toolbar, Typography} from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';
import {Listing, ZipCode} from "../../../assets/models/store.model";
import {Action} from "redux";

export interface StateProps {
	appLoaded: boolean,
	AS: AS | null;
	zipCodes: ZipCode[],
	currentZipCode: ZipCode,
	listings: Listing[]
}

export interface DispatchProps {
	dispatch: (action: Action) => void;
	setAerialSphere: (aerialSphere:AS) => void;
	setAppLoaded: () => void;
}

export interface MergeProps {
	setCurrentZipCode: (mls: string) => void;
}

export type ASViewerProps = StateProps & DispatchProps & MergeProps;
declare global {

	var AerialSphere:  new (id:string, className:string, data?:SphereData) => AS;

}

export const makeOptions = (
	start: number,
	end: number,
	step: number,
	include: Array<number>,
	current?: number,
	addUndefined?: boolean
) => {
	const values: Array<number> = [];
	for (let i = start; i <= end; i += step) {
		values.push(i);
	}
	include.forEach((n) => {
		if (!values.includes(n)) {
			values.push(n);
		}
	});
	if (isNumber(current)) {
		if (!values.includes(current)) {
			values.push(current);
		}
	}
	const options = sortBy(values).map((value, index) => {
		return (
			<option key={index} value={value}>
				{value}
			</option>
		);
	});
	if (addUndefined) {
		options.unshift(
			<option key={-100000000000} value="undefined">
				undefined
			</option>
		);
	}

	return options;
};

const iconForListing = (listing: Listing) => {
	if (listing.price <= 400000) {
		return 'home_for_sale_green';
	}
	if (listing.price <= 500000) {
		return 'home_for_sale_blue';
	}
	if (listing.price <= 700000) {
		return 'home_for_sale_yellow';
	}
	if (listing.price <= 1000000) {
		return 'home_for_sale_purple';
	}
	return 'home_for_sale_red';
}

const sphereData: SphereData = {
	sphereLat: 33.5744052,
	sphereLng: -112.0181946,
	title: '85028',
	lookAtLat: 33.576826624658224,
	lookAtLng: -112.02899558853191,
	cameraFov: 45,
	cameraFovMin: 10,
	cameraFovMax: 145,
	autoRotate: {
		on: false,
		speed: 30,
		right: true,
		tilt: 115,
		fov: 55,
	},
	layers: [{
		name: 'main area',
		visible: true,
		markers: [],
	}]
}

const font0 = 'font-family: \'Arial\';font-style: normal;font-weight: bold;font-size: 24px;line-height: 30px;color: #003868;';
const font1 = 'font-family: \'Arial\';font-style: normal;font-weight: bold;font-size: 14px;line-height: 30px;color: #003868;';
const font2 = 'font-family: \'Arial\';font-style: normal;font-weight: normal;font-size: 14px;line-height: 30px;color: #003868;';
const fontLink = 'font-family: \'Arial\';font-style: normal;font-weight: bold;font-size: 14px;line-height: 30px;color: #009BDF;text-decoration-line: underline;';

const formatNumber = (n: number, isMoney: boolean = true) => {
	const s = n.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace(/\.00/, '');
	return isMoney ? s : s.replace('$', '');
}

const markerFilter = (_minPrice: number, _maxPrice: number, _minBeds: number, _maxBeds: number, _minBaths: number, _maxBaths: number) => (listing: Listing) => {
	return  listing.price >= _minPrice && listing.price <= _maxPrice
		&&
		listing.beds >= _minBeds && listing.beds <= _maxBeds
		&&
		listing.baths >= _minBaths && listing.baths <= _maxBaths;
}

const markerSort = (_sort: number) => (a: ApiMarker, b: ApiMarker) => {
	if (!a.metaData || !b.metaData) {
		return 0;
	}
	switch (_sort) {
		case 0: {
			if (a.metaData.price > b.metaData.price) {
				return 1;
			}
			if (a.metaData.price < b.metaData.price) {
				return -1;
			}
			return 0;
		}
		case 1: {
			if (a.metaData.price > b.metaData.price) {
				return -1;
			}
			if (a.metaData.price < b.metaData.price) {
				return 1;
			}
			return 0;
		}
		case 2: {
			if (a.metaData.beds > b.metaData.beds) {
				return 1;
			}
			if (a.metaData.beds < b.metaData.beds) {
				return -1;
			}
			return 0;
		}
		case 3: {
			if (a.metaData.beds > b.metaData.beds) {
				return -1;
			}
			if (a.metaData.beds < b.metaData.beds) {
				return 1;
			}
			return 0;
		}
		case 4: {
			if (a.metaData.baths > b.metaData.baths) {
				return 1;
			}
			if (a.metaData.baths < b.metaData.baths) {
				return -1;
			}
			return 0;
		}
		case 5: {
			if (a.metaData.baths > b.metaData.baths) {
				return -1;
			}
			if (a.metaData.baths < b.metaData.baths) {
				return 1;
			}
			return 0;
		}
	}
	return 0;
};

type FilterType = ((value: Listing, index: number, array: Listing[]) => value is Listing) | undefined;

export const getSphereData = (listings: Listing[], sort: number, filter?: FilterType) => {

	const filtered = filter ? listings.filter(filter) : listings;

	const markers = filtered.map(listing => {
		const addressParts = listing.address.split(',');
		const address = addressParts[0];
		return ({
			id: listing.id,
			lat: listing.lat,
			lng: listing.lng,
			address: listing.address,
			name: `<img src="${listing.img}" height="200" width="300" />
					<div style="${font0}">${formatNumber(listing.price)}</div>
					<table width="100%">
						<tr>
							<td><span style="${font1}">${formatNumber(listing.footage, false)}</span><span style="${font2}">&nbsp;&nbsp;SQFT</span></td>
							<td></td>
						</tr>
						<tr>
							<td><span style="${font1}">${listing.beds}</span><span style="${font2}">&nbsp;&nbsp;BEDS</span></td>
							<td><span style="${font1}">${listing.baths}</span><span style="${font2}">&nbsp;&nbsp;BATHS</span></td>
						</tr>
					</table>
					<div style="${font1}">${address}</div>
					<div style="${font2}">${addressParts.slice(1).join(', ')}</div>
					<a style="${fontLink}" href="${listing.link}" target="_new">VIEW LISTING</a>
	`,
			icon: iconForListing(listing),
			style: {
				backgroundColor: 'white',
				height: '400px',
				width: '300px',
				position: 'relative',
				top: '-300px'
			},
			metaData: {
				price: listing.price,
				beds: listing.beds,
				baths: listing.baths,
			}
		} as ApiMarker);
	}).sort(markerSort(sort));

	const safeClone = cloneDeep(sphereData);

	if (safeClone && safeClone.layers) {
		//safeClone.layers[0].markers = markers;
		set(safeClone, 'layers[0].markers', markers);
	}
	return safeClone;
};

const formatAddressForTile = (address: string) => {
	return trim((address || '').split(' ').map((s: string) => capitalize(s)).join(' ').split(',')[0]);
};

/// This loads the viewer and provides access to the AerialSphere api
const ASViewer = (props:ASViewerProps) => {
	const { AS, appLoaded, setAerialSphere, setAppLoaded, zipCodes, currentZipCode, listings, setCurrentZipCode } = props;

	const [minPrice, setMinPrice] = React.useState<number>(100000);
	const [maxPrice, setMaxPrice] = React.useState<number>(7000000);

	const [minBeds, setMinBeds] = React.useState<number>(0);
	const [maxBeds, setMaxBeds] = React.useState<number>(7);

	const [minBaths, setMinBaths] = React.useState<number>(0);
	const [maxBaths, setMaxBaths] = React.useState<number>(7);

	const [sort, setSort] = React.useState<number>(-1);

	const [markers, setMarkers] = React.useState<ApiMarker[]>([]);
	const [pos, setPos] = React.useState<{sphereLat: number, sphereLng: number}>({sphereLat: sphereData.sphereLat || 0, sphereLng: sphereData.sphereLng || 0});

	const [flyToSphere, setFlyToSphere] = React.useState<boolean>(false);

	React.useEffect(() => {
		if(appLoaded){
			// @ts-ignore
			const data = getSphereData(listings, sort, markerFilter(minPrice, maxPrice, minBeds, maxBeds, minBaths, maxBaths));
			// @ts-ignore
			setMarkers(data.layers[0].markers || []);
			const firstMarker = get(data, ['layers', 0, 'markers', 0]);
			if (firstMarker) {
				data.lookAtLat = firstMarker.lat;
				data.lookAtLng = firstMarker.lng;
				data.sphereLat = firstMarker.lat;
				data.sphereLng = firstMarker.lng;
			}
			setPos({sphereLat: data.sphereLat || 0, sphereLng: data.sphereLng || 0});

			const aerialSphere = new AerialSphere('as-viewer', 'aerial-sphere-container', data);
			setAerialSphere(aerialSphere);
		}
		else {
			loadViewer(() => { setAppLoaded()}, true);
		}
	}, [appLoaded, setAppLoaded, setAerialSphere, listings])

	const searchListings = (_minPrice: number, _maxPrice: number, _minBeds: number, _maxBeds: number, _minBaths: number, _maxBaths: number, _sort: number) => {
		// @ts-ignore
		const data = getSphereData(listings, sort, markerFilter(_minPrice, _maxPrice, _minBeds, _maxBeds, _minBaths, _maxBaths));
		const markers = get(data, 'layers[0].markers', []);
		const marker = markers[0];
		if (marker) {
			if (markers.length > 0) {
				const sorted = markers.sort(markerSort(_sort));
				set(data, 'layers[0].markers', sorted);
			}
			data.lookAtLat = markers[0].lat;
			data.lookAtLng = markers[0].lng;
			data.sphereLat = !flyToSphere ? pos.sphereLat : markers[0].lat;
			data.sphereLng = !flyToSphere ? pos.sphereLng : markers[0].lng;
		} else {
			data.sphereLat = pos.sphereLat;
			data.sphereLng = pos.sphereLng;
		}

		AS?.removeAllMarkers();
		AS?.sendData(data);
		// @ts-ignore
		setMarkers(data.layers[0].markers || []);
		setPos({sphereLat: data.sphereLat || 0, sphereLng: data.sphereLng || 0});
	}

	const changeMinPrice = (e: ChangeEvent<HTMLSelectElement>) => {
		const newValue = Number(e.target.value);
		setMinPrice(newValue);
		searchListings(newValue, maxPrice, minBeds, maxBeds, minBaths, maxBaths, sort);
	};

	const changeMaxPrice = (e: ChangeEvent<HTMLSelectElement>) => {
		const newValue = Number(e.target.value);
		setMaxPrice(newValue);
		searchListings(minPrice, newValue, minBeds, maxBeds, minBaths, maxBaths, sort);
	};

	const changeMinBeds = (e: ChangeEvent<HTMLSelectElement>) => {
		const newValue = Number(e.target.value);
		setMinBeds(newValue);
		searchListings(minPrice, maxPrice, newValue, maxBeds, minBaths, maxBaths, sort);
	};

	const changeMaxBeds = (e: ChangeEvent<HTMLSelectElement>) => {
		const newValue = Number(e.target.value);
		setMaxBeds(newValue);
		searchListings(minPrice, maxPrice, minBeds, newValue, minBaths, maxBaths, sort);
	};

	const changeMinBaths = (e: ChangeEvent<HTMLSelectElement>) => {
		const newValue = Number(e.target.value);
		setMinBaths(newValue);
		searchListings(minPrice, maxPrice, minBeds, maxBeds, newValue, maxBaths, sort);
	};

	const changeMaxBaths = (e: ChangeEvent<HTMLSelectElement>) => {
		const newValue = Number(e.target.value);
		setMaxBaths(newValue);
		searchListings(minPrice, maxPrice, minBeds, maxBeds, minBaths, newValue, sort);
	};

	const changeSort = (e: ChangeEvent<HTMLSelectElement>) => {
		const newValue = Number(e.target.value);
		setSort(newValue);
		searchListings(minPrice, maxPrice, minBeds, maxBeds, minBaths, maxBaths, newValue);
	};

	const onSearchClick = () => {
		searchListings(minPrice, maxPrice, minBeds, maxBeds, minBaths, maxBaths, sort);
	}

	const onPropertyClicked = (listing: Listing | undefined) => {
		if (listing) {
			AS?.sendData({
				sphereLat: !flyToSphere ? pos.sphereLat : listing.lat,
				sphereLng: !flyToSphere ? pos.sphereLng : listing.lng,
				lookAtLat: listing.lat,
				lookAtLng: listing.lng,
			});
		}
	};

	const toggleFlyToSphere = () => {
		setFlyToSphere(!flyToSphere);
	};

	const onInfoClick = (listing: Listing | undefined) => {
		if (listing) {
			window.open(listing.link, '_new');
		}
	};

	return (
		<React.Fragment>
			<AppBar position="static" className='app-bar' style={{flexGrow: 1}}>
				<Toolbar>
					<Typography className='logo-container'>
						<img src="logo-1.png" className='bar-logo'/>
					</Typography>
					<Select
						labelId="select-zip-code"
						id="select-zip-code"
						className="select-zip-code"
						value={currentZipCode.mls}
						onChange={(event: React.ChangeEvent<{name?: string | undefined; value: unknown}>) => {
							setCurrentZipCode(event.target.value as string);
						}}
					>
						{zipCodes.map((zipCode: ZipCode) => {
							return (<MenuItem value={zipCode.mls}>{`${zipCode.city}, AZ ${zipCode.zip}`}</MenuItem>);
						})}
					</Select>
				</Toolbar>
			</AppBar>
			<div className='master-container'>
				<table width="100%">
					<tr>
						<td width="70%"><div id='as-viewer' /></td>
						<td width="30%">
							<div className="topDiv">
								<div className='heading'>{`Now Searching ${currentZipCode.city}, AZ ${currentZipCode.zip}`}</div>
								<table>
									<tr>
										<td>
											<span className='searchTitles'>Min Price</span><br/>
											<select onChange={changeMinPrice} defaultValue={minPrice}>
												{makeOptions(100000, 1000000, 100000, [2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 10000000, 20000000, 100000000], minPrice)}
											</select>
										</td>
										<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
										<td>
											<span className='searchTitles'>Max Price</span><br/>
											<select onChange={changeMaxPrice} defaultValue={maxPrice}>
												{makeOptions(100000, 1000000, 100000, [2000000, 3000000, 4000000, 5000000, 6000000, 7000000, 10000000, 20000000, 100000000], maxPrice)}
											</select>
										</td>
										<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
										<td>
											<span className='searchTitles'>Min Beds</span><br/>
											<select onChange={changeMinBeds} defaultValue={minBeds}>
												{makeOptions(0, 10, .5, [], minBeds)}
											</select>
										</td>
										<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
										<td>
											<span className='searchTitles'>Max Beds</span><br/>
											<select onChange={changeMaxBeds} defaultValue={maxBeds}>
												{makeOptions(0, 10, .5, [], maxBeds)}
											</select>
										</td>
										<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
										<td>
											<span className='searchTitles'>Min Baths</span><br/>
											<select onChange={changeMinBaths} defaultValue={minBaths}>
												{makeOptions(1, 10, .5, [], minBaths)}
											</select>
										</td>
										<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
										<td>
											<span className='searchTitles'>Max Baths</span><br/>
											<select onChange={changeMaxBaths} defaultValue={maxBaths}>
												{makeOptions(1, 10, .5, [], maxBaths)}
											</select>
										</td>
									</tr>
								</table>
								<br/><br/>
								<table width='100%'>
									<tr>
										<td>
											<span className='searchTitles'>Sort</span><br/>
										</td>
										<td rowSpan={3}>
											<img src='logo-1.png' className='logo'/>
										</td>
									</tr>
									<tr>
										<td>
											<select onChange={changeSort} defaultValue={sort}>
												<option value={-1}>
													-
												</option>
												<option value={0}>
													Price, Ascending
												</option>
												<option value={1}>
													Price, Descending
												</option>
												<option value={2}>
													Beds, Ascending
												</option>
												<option value={3}>
													Beds, Descending
												</option>
												<option value={4}>
													Baths, Ascending
												</option>
												<option value={5}>
													Baths, Descending
												</option>
											</select>
										</td>
									</tr>
									<tr>
										<td>
											<br/><br/>
											<button className='button' onClick={onSearchClick}>Search</button>
										</td>
									</tr>
								</table>
								<br/><br/>
								<table width="100%">
									<tr>
										<td>
											<img src="green.png" height='28' width='21' /><span className='key-td'>&lt;= 400k</span>
										</td>
										<td>
											<img src="blue.png" height='28' width='21' /><span className='key-td'>&lt;= 500k</span>
										</td>
										<td>
											<img src="yellow.png" height='28' width='21' /><span className='key-td'>&lt;= 700k</span>
										</td>
										<td>
											<img src="purple.png" height='28' width='21' /><span className='key-td'>&lt;= 1m</span>
										</td>
										<td>
											<img src="red.png" height='28' width='21' /><span className='key-td'>1m+</span>
										</td>
									</tr>
								</table>
							</div>
							<div className="bottomDiv">
								<table width="100%">
									<tr>
										<td><div className='heading'>{`Properties Found: ${markers.length}`}</div></td>
										<td></td>
										<td><span className='flyToSphere'><input type='checkbox' onChange={toggleFlyToSphere}/> Fly To Sphere</span></td>
									</tr>
								</table>
								<GridList cellHeight={160} className='gridList' cols={3}>
									{markers.map((marker, index) => {
										const listing = listings.find(l => l.id === marker.id) || {img: '', address: ''} as Listing;
										return (
											<GridListTile key={index} cols={1}>
												<div onClick={() => onPropertyClicked(listing)}>
													<img src={listing.img} alt={listing.address} height="160" width="100%" />
												</div>
												<GridListTileBar
													title={formatAddressForTile(listing.address)}
													subtitle={<span>{formatNumber(listing?.price || 0)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {formatNumber(listing?.footage || 0, false)} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {listing.beds} / {listing.baths}</span>}
													actionIcon={
														<IconButton aria-label={`info about ${listing.address}`} className='icon' onClick={() => onInfoClick(listing)}>
															<InfoIcon />
														</IconButton>
													}
												/>
											</GridListTile>
										);
									}
									)
									}
								</GridList>
							</div>
						</td>
					</tr>
				</table>
			</div>
		</React.Fragment>
	);
}

export default ASViewer;

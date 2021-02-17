///Hackathon Dev Key: f71871d6-8d74-4bb7-a7b2-08a6170c2c7d
const baseKey = "f71871d6-8d74-4bb7-a7b2-08a6170c2c7d";
const basePath = "/api/map/js?key=";
const baseLocalUrl = `http://localhost:5000${basePath}`;
const baseDevUrl = `https://dev.app.aerialsphere.com${basePath}`;

export const loadViewer = (callback: () => void, useDev?:boolean, key:string = baseKey) => {
	const script = document.createElement('script');

	script.src = /*process.env.NODE_ENV === 'development' &&*/ useDev
		? `${baseLocalUrl}${key}`
		: `${baseDevUrl}${key}`;

	script.id = 'as-script';
	document.body.appendChild(script);
	script.onload = () => {
	if (callback) callback();
	};
}
  export default loadViewer;

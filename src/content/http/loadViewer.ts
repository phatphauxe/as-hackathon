///Hackathon Dev Key: f71871d6-8d74-4bb7-a7b2-08a6170c2c7d
export const loadViewer = (callback: () => void, useDev?:boolean, key:string = "f71871d6-8d74-4bb7-a7b2-08a6170c2c7d") => {
	const script = document.createElement('script');
	script.src = process.env.NODE_ENV === 'development' && !useDev ? `http://localhost:5000/api/map/js?key=${key}`: `https://dev.app.aerialsphere.com/api/map/js?key=${key}`;
	script.id = 'as-script';
	document.body.appendChild(script);
	script.onload = () => { 
	if (callback) callback();
	};
}
  export default loadViewer;	
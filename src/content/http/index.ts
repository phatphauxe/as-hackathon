/// axios is used here but you can feel free to use any sort of http request lib
import axios, { AxiosRequestConfig } from 'axios';
export {loadViewer} from './loadViewer/loadViewer';

export const getRequest = <T>(url:string, config?: AxiosRequestConfig):Promise<T> => {
	return axios.get(url, config);
}

export const postRequest = <T, K>(url:string, data: K, config?: AxiosRequestConfig):Promise<T> => {
	return axios.post(url, data, config);
}

export const putRequest = <T, K>(url:string, data:K, config?: AxiosRequestConfig):Promise<T> => {
	return axios.put(url, data, config);
}

export const patchRequest = <T, K>(url:string, data:K, config?:AxiosRequestConfig):Promise<T> => {
	return axios.patch(url, data, config);
}

export const deleteRequest = <T>(url:string, config?:AxiosRequestConfig):Promise<T> => {
	return axios.delete(url, config);
}

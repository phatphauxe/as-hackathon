export interface PromiseType {
	default:string,
	fulfilled:string,
	rejected:string,
	pending:string,
}

export const PromiseAction = (action: string):PromiseType => {
	return {
		default: action,
		fulfilled: `${action}_FULFILLED`,
		rejected: `${action}_REJECTED`,
		pending: `${action}_PENDING`,
	}
}

export interface Action<T> {
	type: string,
	payload: T
}


import loadViewer from './loadViewer';
import set from 'lodash/set';

describe('loadViewer', () => {
	it('should return true', () => {

		const mockScript = document.createElement("script");
		const mockCallback = jest.fn();
		const documentSpy = jest.spyOn(document, 'createElement').mockReturnValueOnce(mockScript);
		set(process.env, 'NODE_ENV', 'development');
		const appendSpy = jest.spyOn(document.body, 'appendChild');
		loadViewer(mockCallback);
		if(mockScript.onload){
			mockScript.onload(new Event('load'));
		}
		expect(documentSpy).toHaveBeenCalledTimes(1);
		expect(documentSpy).toHaveBeenCalledWith("script");
		expect(appendSpy).toHaveBeenCalledTimes(1);
		expect(mockCallback).toHaveBeenCalledTimes(1);
	});
});
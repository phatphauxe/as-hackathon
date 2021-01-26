import React from 'react';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import App from './app';
import { Provider } from 'react-redux';
import { State } from '../../assets/models/store.model';

const renderWithStore = (component:JSX.Element, initialState?:State) => {
  const mockStore = configureStore();
  const store = mockStore(initialState || {})
  return {
    renderResult: render(
      <Provider store={store}>
        {component}
      </Provider>
    )
  }
}
test('renders learn react link', () => {
  renderWithStore(<App data-testid="test-app"/>);
  screen.getByTestId('test-app');  
});

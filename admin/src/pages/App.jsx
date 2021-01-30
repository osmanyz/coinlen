import React from 'react';
import store from '../store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from '../components/Error/ErrorBoundary';
import AppRoutes from './AppRoutes';

export default function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
}

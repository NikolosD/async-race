import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

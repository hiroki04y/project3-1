import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css';
import App from './App';

// ページのメイン部分。Appを呼び出してBrouserRouterの中に入れる

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <>
        <App />
      </>
    </BrowserRouter>
  </React.StrictMode>
);
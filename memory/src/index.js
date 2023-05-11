import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css';
import App from './App';
import Work from './work';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <>
        <button>作業中</button>
        <button>学習成果</button>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/work" element={<Work />} />
        </Routes>
      </>
    </BrowserRouter>
  </React.StrictMode>
);
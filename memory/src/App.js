import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css';
import Memory from './memory';
import Work from './work';
import { useState } from "react";


function App() {
  const [menuNowBackgroundColor, setMenuNowBackgroundColor] = useState('');
  const [menuCompBackgroundColor, setMenuCompBackgroundColor] = useState('');

  return (
    // 左のメニュー部分
    <div className="App">
          <div className="left">
            <img className="header-image" src={`${process.env.PUBLIC_URL}/header.jpg`} alt="Header" />
            <a href="/" className="menu" style={{ backgroundColor: menuNowBackgroundColor }}>
              <img className="menu-image" src={`${process.env.PUBLIC_URL}/work.png`} alt="Icon" />
              <p>現在進行中</p>
            </a>
            <a href="/work" className="menu" style={{ backgroundColor: menuCompBackgroundColor }}>
              <img className="menu-image" src={`${process.env.PUBLIC_URL}/check.png`} alt="Icon" />
              <p>学習成果</p>
            </a>
            <a href="/mypage" className="menu" style={{ backgroundColor: menuCompBackgroundColor }}>
              <img className="menu-image" src={`${process.env.PUBLIC_URL}/check.png`} alt="Icon" />
              <p>マイページ</p>
            </a>
          </div>
          {/* URLで画面遷移 */}
          <Routes>
            <Route exact path="/" element={<Memory setMenuNowBackgroundColor={setMenuNowBackgroundColor}/>} />
            <Route exact path="/work" element={<Work setMenuCompBackgroundColor={setMenuCompBackgroundColor}/>} />
          </Routes>
        </div>
  );
}


export default App;

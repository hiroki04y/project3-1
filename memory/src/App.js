import './App.css';
import MemList from './MemList';
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";


// //取得したアイテムをコンソールに表示(検証用)
// const getItem = () => {
//   for (var i = 0, length = localStorage.length; i < length; ++i) {
//       console.log(localStorage.key(i));
//   }
// }

// //最初にすべてのlocalstrageを読み込む
// window.onload = function() {
//   getItem();
// };


function App() {
  return (
    <div className="App">
      <div class="left">
        <p>タスクの追加</p>
        <p>個人製作</p>
        
      </div>
      <div class="right"></div>
    </div>
  );
}


export default App;

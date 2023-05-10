import './App.css';
import MemList from './MemList';
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

//取得したアイテムをコンソールに表示
const getItem = () => {
  for (var i = 0, length = localStorage.length; i < length; ++i) {
      console.log(localStorage.key(i));
  }
}

//アイテムを取得
const getClick = () => {
  getItem();
};

//最初にすべてのタスクを読み込む
window.onload = function() {
  getItem();
};

//ランダムな値を生成
function getRandomStr(){
  const LENGTH = 8 //生成したい文字列の長さ
  const SOURCE = "abcdefghijklmnopqrstuvwxyz0123456789" //元になる文字
  let result = ''

  for(let i=0; i<LENGTH; i++){
    result += SOURCE[Math.floor(Math.random() * SOURCE.length)];
  }
  
  return result //p9zh1ziw
}

function App() {
  const [mems, setMems] = useState([
  ]);

  useEffect(() => {
    let tmp = [];
    for (let i = 0, length = localStorage.length; i < length; ++i) {
      let key = localStorage.key(i)
      let memname = localStorage.getItem(key)
      tmp.push({id: key, name: memname});
    }
    setMems(tmp);
  }, []);


  //要素を取得
  const memNameRef = useRef();
  const handleAddTodo = () =>{
    //memsを追加する
    const name = memNameRef.current.value;
    setMems((prevMems) => {
      return [...prevMems, {id: uuidv4(), name: name}];
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <MemList mems={mems} />
        <input type="text" ref={memNameRef} />
        <button onClick={handleAddTodo}>追加</button>
      </header>
    </div>
  );
}

export default App;

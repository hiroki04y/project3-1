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
  //表示用の配列を宣言
  const [mems, setMems] = useState([]);

  //表示内容を表示用配列に追加　※初回のみ実行
  useEffect(() => {
    let tmp = [];
    for (let i = 0, length = localStorage.length; i < length; ++i) {
      let key = localStorage.key(i)
      let itemJson = JSON.parse(localStorage.getItem(key));
      let name = itemJson.name;
      let memo = itemJson.memo;
      let date = itemJson.now;
      tmp.push({id: key, name: name, memo: memo, date:date});
    }
    let result = tmp.sort(function(a, b) {
      return (a.date < b.date) ? -1 : 1;  //オブジェクトの昇順ソート
    });
    setMems(result);
  }, []);


  //要素を取得
  const titleNameRef = useRef();
  const memoNameRef = useRef();
  //追加ボタンを押された時の処理
  const handleAddMemory = () =>{
    //テキストエリアの値を取得
    const name = titleNameRef.current.value;
    const memo = memoNameRef.current.value;
    var uid = uuidv4();
    var now = new Date();

    //memsに値をセットする(ホットリロード)
    setMems((prevMems) => {
      return [...prevMems, {id: uid, name: name, memo: memo, now: now}];
    });

    //取得したデータをJSON形式に変換
    const item = {
      name: name,
      memo: memo,
      now: now,
    };
    const jsonString = JSON.stringify(item);

    //JSON形式でローカルホストに変換してテキストフィールドを空にする
    localStorage.setItem(uid, jsonString);
    titleNameRef.current.value = null;
    memoNameRef.current.value = null;
  }

  //要素の削除
  const handleDeleteMemory = (item) => {
    setMems((current) =>
      current.filter((mem) => mem.id !== item)
    );
    localStorage.removeItem(item);
  };

  return (
    <div className="App">
      <button>作業中</button>
      <button>学習成果</button>
      <header className="App-header">
        <MemList mems={mems} onDeleteMemory={handleDeleteMemory}/>
        <input type="text" ref={titleNameRef} />
        <input type="textarea" ref={memoNameRef}/>
        <button onClick={handleAddMemory}>追加</button>
      </header>
    </div>
  );
}


export default App;

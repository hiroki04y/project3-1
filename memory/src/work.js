//タスクの追加
import './App.css';
import WorkList from './WorkList';
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Work = ({ setMenuCompBackgroundColor }) => {
  //表示用の配列を宣言
  const [mems, setMems] = useState([]);

  //表示内容を表示用配列に追加　※初回のみ実行
  useEffect(() => {
    setMenuCompBackgroundColor('#f0f8ff'); //メニューカラー変換
    let tmp = [];
    for (let i = 0, length = localStorage.length; i < length; ++i) {
      let key = localStorage.key(i)
      let itemJson = JSON.parse(localStorage.getItem(key)); //jsonのオブジェクトの各要素を取得
      if (itemJson.check === false){
        let name = itemJson.name;
        let memo = itemJson.memo;
        let date = itemJson.now;
        let genre = itemJson.genre;
        tmp.push({id: key, name: name, memo: memo, date:date, genre:genre});
      }
    }
    let result = tmp.sort(function(a, b) {
      return (a.date < b.date) ? -1 : 1;  //オブジェクトの昇順ソート
    });
    setMems(result);
  }, []);

  //要素の削除
  const handleDeleteMemory = (item) => {
    setMems((current) =>
      current.filter((mem) => mem.id !== item)
    );
    localStorage.removeItem(item);
  };

  return (
    <div className="right">
        <WorkList mems={mems} onDeleteMemory={handleDeleteMemory}/>
    </div>
  );
};



export default Work;
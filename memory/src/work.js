//カレンダー　表示用
// import React from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid'; // 追加
// import jaLocale from '@fullcalendar/core/locales/ja';

// class Work extends React.Component {   //page2クラスにReact.Componentを継承する
//     render(){
//         return (
//             <div>
//             <FullCalendar
//                 plugins={[dayGridPlugin, timeGridPlugin]} // 追加
//                 initialView="dayGridMonth"
//                 locales={[jaLocale]}
//                 locale='ja'
//                 headerToolbar={{                          // 追加
//                     left: 'prev,next today',
//                     center: 'title',
//                     right: 'dayGridMonth,timeGridWeek',
//                 }}
//                 events={[
//                     {title:'eventを', start: '2023-05-14'},
//                     {title:'こんな感じで追加できます', start: '2023-05-15', end: '2023-05-17'}
//                 ]}
//             />
//             </div>
//         );
//     }
// }

// export default Work;  


//ミニカレンダー（入力用）
// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css"
// import { useState, useRef, useEffect } from "react";

// const Work = () => {
//     const [startDate, setStartDate] = useState(new Date());
//     return (
//       <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
//     );
// };

// export default Work;

//タスクの追加
import './App.css';
import MemList from './MemList';
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Work = () => {
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
      let genre = itemJson.genre;
      tmp.push({id: key, name: name, memo: memo, date:date, genre:genre});
    }
    let result = tmp.sort(function(a, b) {
      return (a.date < b.date) ? -1 : 1;  //オブジェクトの昇順ソート
    });
    setMems(result);
  }, []);


  //要素を取得
  const titleNameRef = useRef();
  const memoNameRef = useRef();
  const genreRef = useRef();
  //追加ボタンを押された時の処理
  const handleAddMemory = () =>{
    //テキストエリアの値を取得
    const name = titleNameRef.current.value;
    const memo = memoNameRef.current.value;
    const genre = genreRef.current.value;
    var uid = uuidv4();
    var now = new Date();


    //memsに値をセットする(ホットリロード)
    setMems((prevMems) => {
      return [...prevMems, {id: uid, name: name, memo: memo, now: now, genre: genre}];
    });

    //取得したデータをJSON形式に変換
    const item = {
      name: name,
      memo: memo,
      now: now,
      genre: genre,
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
        <MemList mems={mems} onDeleteMemory={handleDeleteMemory}/>
        タイトル<input type="text" ref={titleNameRef} /><br></br>
        内容：<input type="textarea" ref={memoNameRef}/>
        <select name="genre" ref={genreRef}>
          <option value="rean">勉強</option>
          <option value="work">学習</option>
        </select>
        <br></br>
        <button onClick={handleAddMemory}>追加</button>
    </div>
  );
};

export default Work;
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
      if (itemJson.check == false){
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
        <MemList mems={mems} onDeleteMemory={handleDeleteMemory}/>
    </div>
  );
};

export default Work;
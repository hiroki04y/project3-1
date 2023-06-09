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

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
}


function Memory({ setMenuNowBackgroundColor }) {
    //表示用の配列を宣言
    const [mems, setMems] = useState([]);

    //表示内容を表示用配列に追加　※初回のみ実行
    useEffect(() => {
        setMenuNowBackgroundColor('#f0f8ff'); //メニューカラー変換
        let tmp = [];
        for (let i = 0, length = localStorage.length; i < length; ++i) {
        let key = localStorage.key(i)
        let itemJson = JSON.parse(localStorage.getItem(key)); //jsonのオブジェクトの各要素を取得
        if (itemJson.check === true){
            let name = itemJson.name;
            let memo = itemJson.memo;
            let date = itemJson.now;
            let genre = itemJson.genre;
            let check = itemJson.check;
            tmp.push({id: key, name: name, memo: memo, date:date, genre:genre, check:check});
        }
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
    //追加ボタンを押された時の処理----------作業中を追加
    const handleAddMemory = () =>{
        //テキストエリアの値を取得
        const name = titleNameRef.current.value;
        const memo = memoNameRef.current.value;
        const genre = genreRef.current.value;
        var uid = uuidv4();
        var now = new Date();


        //memsに値をセットする(ホットリロード)
        setMems((prevMems) => {
        return [...prevMems, {id: uid, name: name, memo: memo, data: now, genre: genre, check: true}];
        });

        //取得したデータをJSON形式に変換
        const item = {
        id: uid,
        name: name,
        memo: memo,
        data: now,
        genre: genre,
        check: true,
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

    //完了ボタンが押されたときの処理
    const handleToggleCheck = (item) => {
        setMems((current) =>
            current.map((mem) => {
                if (mem.id === item) {
                    const updatedMem = { ...mem, check: !mem.check };
                    localStorage.setItem(item, JSON.stringify(updatedMem));
                    return updatedMem;
                }
                return mem;
            })
        );
    };

    //タスク追加fieldの開け閉め
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const handleToggleAddTask = () => {
        setIsAddTaskOpen(!isAddTaskOpen);
    };

    return (
        <div className="right">
            <div className={`add-task ${isAddTaskOpen ? 'open' : ''}`}>
                <button className="toggle-button" onClick={handleToggleAddTask}>
                {isAddTaskOpen ? (
                    <div>close</div>
                ) : (
                    <div>AddWorking</div>
                )}
                </button>
                {isAddTaskOpen && (
                    <>
                    タイトル: <input type="text" ref={titleNameRef} />
                    ジャンル: <select name="genre" ref={genreRef}>
                        <option value="rean">勉強</option>
                        <option value="work">学習</option>
                    </select>
                    <br></br>
                    一言メモ: <input type="textarea" ref={memoNameRef} row="2" />
                    <br></br>
                    <div className="btfield">
                        <button className="addbutton" onClick={handleAddMemory}>追加</button>
                    </div>
                    </>
                )}
            </div>
            <div className="memfield"><MemList mems={mems} onDeleteMemory={handleDeleteMemory} onTogglecheck={handleToggleCheck}/></div>
        </div>
    );
}


export default Memory;

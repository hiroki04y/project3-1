// コンポーネント
import React from 'react'

function MemList(props){
    const { mems, onDeleteMemory } = props;

    const handleDeleteClick = (item) => {
        onDeleteMemory(item);
    }

    return (
        <div>
            {mems.map((mem) => (
                //mem.genre == "rean" &&
                    <div key={mem.id}>
                        <div>タイトル：{mem.name}  概要：{mem.memo} ジャンル:{mem.genre}<button onClick={() => handleDeleteClick(mem.id)}>削除</button></div>
                    </div>
            ))}
        </div>
    )
}


export default MemList

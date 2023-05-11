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
                <div key={mem.id}>
                    <button onClick={() => handleDeleteClick(mem.id)}>削除</button><div>タイトル：{mem.name}  概要：{mem.memo}</div>
                </div>
            ))}
        </div>
    )
}


export default MemList
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
                <div key={mem.id} className="mem-item">
                    <div class="mem-item-field">
                        <div class="mem-title">{mem.name}</div><div class="mem-memo">{mem.memo}</div><div class="mem-genre">ジャンル:{mem.genre}</div>
                        <br></br>
                        <div class="mem-right">
                            <button
                            className="delete-button"
                            onClick={() => handleDeleteClick(mem.id)}
                            >
                            削除
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}


export default MemList

// コンポーネント
import React from 'react'

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
}

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
                        <div className="mem-info">
                            <div className="mem-genre">{mem.genre}</div>
                            【<div className="mem-title">{mem.name}</div>】
                            <div className="mem-date">
                                {formatDate(mem.date)}
                            </div>
                        </div>
                        <div class="mem-memo">{mem.memo}</div>
                        <div class="mem-right">
                            <button
                            className="comp-button"
                            onClick={() => handleDeleteClick(mem.id)}>
                            完了
                            </button>
                            <button
                            className="delete-button"
                            onClick={() => handleDeleteClick(mem.id)}>
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

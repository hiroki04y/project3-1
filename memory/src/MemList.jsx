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
    const { mems, onDeleteMemory, onTogglecheck } = props;

    const handleDeleteClick = (item) => {
        onDeleteMemory(item);
    }

    const handleToggleCheck = (item) => {
        onTogglecheck(item);
    }

    return (
        <div>
            {mems.map((mem) => (
                mem.check === true ? (
                    <div key={mem.id} className="mem-item">
                        <div className="mem-item-field">
                            <div className="mem-info">
                                <div className="mem-genre">{mem.genre}</div>
                                【<div className="mem-title">{mem.name}</div>】
                                <div className="mem-date">
                                    {formatDate(mem.date)}
                                </div>
                            </div>
                            <div className="mem-memo">{mem.memo}</div>
                            <div className="mem-right">
                                <button
                                className="comp-button"
                                onClick={() => handleToggleCheck(mem.id)}>
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
                ) : null
            ))}
        </div>
    )
}


export default MemList

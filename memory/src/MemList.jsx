// コンポーネント
import React from 'react'
import Memory from './Memory';

const MemList = ({mems}) => {
    return mems.map((memory) => <Memory memory={memory} key={memory.id} />);
}


export default MemList
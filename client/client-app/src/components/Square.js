import React, { useState, useEffect } from 'react';
import './project.css';

const Square = ({ rowNum, colNum, value }) => {

    const [rowNumber,setRowNumber] = useState(rowNum);
    const [colNumber,setcolNumber] = useState(colNum);
    console.log(`row: ${rowNumber} col: ${colNumber} value: ${value}`)
    return (
        <div className='Square'>
                 {value===0 ? null : value}
        </div>
    );

}
export default Square;
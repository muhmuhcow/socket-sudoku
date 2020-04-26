import React, { useState, useEffect } from 'react';

const Row = ({ data }) => {

    console.log(data);

    return (
        <div>
                 {//for each square in row   
                    Array.prototype.map.call(data, square => {
                        return square; 
                    })
                }
        </div>
    );

}
export default Row;
//check validity of each square if conflict then return false otherwise true
var checkValid = function(puzzle){
    var errorStack = [];
    //for each row
    var rowNum;
    for(rowNum=0;rowNum<9;rowNum++) {
        //for each square in row
        var colNum;
        for (colNum=0;colNum<9;colNum++) {
            if(puzzle[rowNum][colNum]!==0){
                //check if duplicate exists in row
                var k;
                for (k=0;k<9;k++){
                    if(puzzle[rowNum][colNum]===puzzle[rowNum][k] && colNum!==k){
                        errorStack.push((rowNum+1)*10+(colNum+1));
                    }
                }
                //check if duplicate exists in column
                var j;
                for (j=0;j<9;j++){
                    if(puzzle[rowNum][colNum]===puzzle[j][colNum] && rowNum!==j){
                        errorStack.push((rowNum+1)*10+(colNum+1));
                    }
                }
                //check if duplicate exists in square group
                var groupRowStart,groupRowEnd,groupColStart,groupColEnd;
                if(rowNum===0 || rowNum===1 || rowNum===2){
                    groupRowStart=0;
                    groupRowEnd=2;
                }
                if(rowNum===3 || rowNum===4 ||rowNum===5){
                    groupRowStart=3;
                    groupRowEnd=5;
                }
                if(rowNum===6 || rowNum===7 || rowNum===8){
                    groupRowStart=6;
                    groupRowEnd=8;
                }
                if(colNum===0 || colNum===1 || colNum===2){
                    groupColStart=0;
                    groupColEnd=2;
                }
                if(colNum===3 || colNum===4 ||colNum===5){
                    groupColStart=3;
                    groupColEnd=5;
                }
                if(colNum===6 || colNum===7 || colNum===8){
                    groupColStart=6;
                    groupColEnd=8;
                }
                var l = groupRowStart
                //each row in square group
                for(l;l<=groupRowEnd;l++){
                    //for each col in square group
                    var m = groupColStart;
                    for(m;m<=groupColEnd;m++){
                        if(puzzle[rowNum][colNum]===puzzle[l][m] && l!==rowNum && m!==colNum){
                            errorStack.push((rowNum+1)*10+(colNum+1));
                        }
                    }
                }
            }
        }
    }
    return errorStack;
}

module.exports = checkValid;
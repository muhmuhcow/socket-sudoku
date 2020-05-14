// var mySolve = function (){
//     array.forEach(element => {
        
//     });
// }

//check validity of each square if conflict then return false otherwise true
var checkValid = function(puzzle){
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
                        return false;
                    }
                }
                //check if duplicate exists in column
                var j;
                for (j=0;j<9;j++){
                    if(puzzle[rowNum][colNum]===puzzle[j][colNum] && rowNum!==j){
                        return false;
                    }
                }
                //check if duplicate exists in square group
                var groupRowStart,groupRowEnd,groupColStart,groupColEnd;
                if(rowNum<3){
                    groupRowStart=0;
                    groupRowEnd=2;
                }
                if(rowNum<6){
                    groupRowStart=3;
                    groupRowEnd=5;
                }
                if(rowNum<9){
                    groupRowStart=6;
                    groupRowEnd=8;
                }
                if(colNum<3){
                    groupColStart=0;
                    groupColEnd=2;
                }
                if(colNum<6){
                    groupColStart=3;
                    groupColEnd=5;
                }
                if(colNum<9){
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
                            return false;
                        }
                    }
                }
            }
        }
    }
    return true;
}

module.exports = checkValid;
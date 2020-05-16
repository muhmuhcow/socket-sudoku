// //check validity of each square if conflict then return false otherwise true
// var checkValid = function(puzzle){
//     //for each row
//     var rowNum;
//     for(rowNum=0;rowNum<9;rowNum++) {
//         //for each square in row
//         var colNum;
//         for (colNum=0;colNum<9;colNum++) {
//             if(puzzle[rowNum][colNum]!==0){
//                 //check if duplicate exists in row
//                 var k;
//                 for (k=0;k<9;k++){
//                     if(puzzle[rowNum][colNum]===puzzle[rowNum][k] && colNum!==k){
//                         //console.log("aaa");
//                         return false;
//                     }
//                 }
//                 //check if duplicate exists in column
//                 var j;
//                 for (j=0;j<9;j++){
//                     if(puzzle[rowNum][colNum]===puzzle[j][colNum] && rowNum!==j){
//                         //console.log("bbb");
//                         return false;
//                     }
//                 }
//                 //check if duplicate exists in square group
//                 var groupRowStart,groupRowEnd,groupColStart,groupColEnd;
//                 if(rowNum===0 || rowNum===1 || rowNum===2){
//                     groupRowStart=0;
//                     groupRowEnd=2;
//                 }
//                 if(rowNum===3 || rowNum===4 ||rowNum===5){
//                     groupRowStart=3;
//                     groupRowEnd=5;
//                 }
//                 if(rowNum===6 || rowNum===7 || rowNum===8){
//                     groupRowStart=6;
//                     groupRowEnd=8;
//                 }
//                 if(colNum===0 || colNum===1 || colNum===2){
//                     groupColStart=0;
//                     groupColEnd=2;
//                 }
//                 if(colNum===3 || colNum===4 ||colNum===5){
//                     groupColStart=3;
//                     groupColEnd=5;
//                 }
//                 if(colNum===6 || colNum===7 || colNum===8){
//                     groupColStart=6;
//                     groupColEnd=8;
//                 }
//                 var l = groupRowStart
//                 //each row in square group
//                 for(l;l<=groupRowEnd;l++){
//                     //for each col in square group
//                     var m = groupColStart;
//                     for(m;m<=groupColEnd;m++){
//                         if(puzzle[rowNum][colNum]===puzzle[l][m] && l!==rowNum && m!==colNum){
//                             //console.log("ccc");
//                             return false;
//                         }
//                     }
//                 }
//             }
//         }
//     }
//     return true;
// }

// var mySolve = function (myPuzzle){
//     var unfilledCount=0;
//     //for each row
//     var rowNum;
//     for(rowNum=0;rowNum<9;rowNum++) {
//         //for each square in row
//         var colNum;
//         for (colNum=0;colNum<9;colNum++) {
//             if(myPuzzle[rowNum][colNum]===0){
//                 unfilledCount+=1;
//                 //make guesses 1-9
//                 var i;
//                 var newPuzzle = myPuzzle.slice();
//                 for(i=1;i<=9;i++){
//                     newPuzzle[rowNum][colNum] = i;
//                     if(checkValid(newPuzzle)===true){
//                        console.log(newPuzzle);
//                        mySolve(newPuzzle);
//                     }
//                 }
//                 newPuzzle[rowNum][colNum]=0
//                 return;
//             }     
//         }
//     }
//         return myPuzzle;
// }

var solve = function(board, c) { // 'board' is a 2D array (a sudoku board) and 'c' is the cell [0,81) at which we start solving
  var box, good, guesses, prod_sol, val, x, y;
  if(c===null) c=0;
  val=(c===81)?board:((board[x=c/9|0][y=c%9]!==0)?solve(board,c+1):undefined); // Base case, where we're at a filled cell or all 81 cells filled
  if(val) return val;
  var box = function(j) {
    return sudoku[x-(x%3)+(j-(j%3))/3][y-(y%3)+(j%3)];      // jth cell in sub 3x3 box containing x,y
  };
  good = function(g) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].every(function(i) {
      return g !== board[x][i] && g !== board[i][y] && g !== box(i); // returns true if and only if board[x][y] when set to g breaks sudoku rules due to collision
    });
  };
  guesses = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(good); // choose non-conflicting guesses for position (x, y)
  prod_sol = function(g) {  // returns true if and only if a guess actually produces a solution at (x, y)
    board[x][y] = g;
    return solve(board, c+1);
  };
  if ((guesses.some(prod_sol)) || (board[x][y] = 0)) return board; // return the solved board if a solution can be produced!
};

module.exports = solve;
//module.exports = checkValid;
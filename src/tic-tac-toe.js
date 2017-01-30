class TicTacToe {
    constructor() {
        this.current = 'x';
        this.next = 'o';
        this.table = [];
        this.tableLen = 3;

        for(var i = 0; i < this.tableLen;  i++) {
            this.table[i] = [];

            for(var j = 0; j < this.tableLen; j++) {
                this.table[i][j] = null;
            }
        }    
    }

    getCurrentPlayerSymbol() {
        return this.current;
    }

    nextTurn(rowIndex, columnIndex) {

        if (this.table[rowIndex][columnIndex] === null){      
            var next;
            this.table[rowIndex][columnIndex] = this.current;
            next = this.next;
            this.next = this.current;
            this.current = next;
        }
    }

    isFinished() {

        if(this.getWinner() !== null || this.isDraw() === true) {
            return true;
        }
        return false;
    }

    getWinner() {

        var box = this.getBox(),
            resultArr = box.concat(this.getDiagonals());

        for (var i = 0; i < resultArr.length; i++) {

            if (resultArr[i].every(function(item){ return resultArr[i][0] == item})) {
                return resultArr[i][0];
            }
        } return null
    }

    getBox(){

        var result = [],
            row;

        for(var i = 0; i < this.tableLen; i++) {
            row = [];
            result.push(this.table[i]);

            for (var j = 0; j < this.tableLen; j++) {
                row.push(this.table[j][i]);
            }
            result.push(row);
        }
        return result;
    }

    getDiagonals(){
        var resultArr = [],
            leftDiag = [],
            rightDiag = [],
            n = this.tableLen;

        for(var i = 0; i < this.tableLen; i++) {
            leftDiag.push(this.table[i][i]);
            rightDiag.push(this.table[i][--n]);
        }
        resultArr.push(leftDiag);
        resultArr.push(rightDiag);
        return resultArr;
    }

    noMoreTurns() {

        for(var i = 0; i < this.tableLen; i++) {

            for(var j = 0; j < this.tableLen; j++) {

                if (this.table[i][j] === null) {
                    return false;
                }
            }
        }
        return true;
    }


    isDraw() {
        
        if(this.getWinner() === null && this.noMoreTurns() === true) {
            return true;
        } else {
            return false;
        } 
    }

    getFieldValue(rowIndex, colIndex) {
        return this.table[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;

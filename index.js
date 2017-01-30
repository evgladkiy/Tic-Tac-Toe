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
            return true
        } else return false
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
                row.push(this.table[j][i])
            }
            result.push(row)
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
        if(this.getWinner()==null && this.noMoreTurns() === true) {
            return true
        }
    }

    getFieldValue(rowIndex, colIndex) {
        return this.table[rowIndex][colIndex];
    }
}

window.game = new TicTacToe();

resetBtn.addEventListener('click', () => {
    window.game = new TicTacToe();
    render();
});

function render() {
    let html = '';

    for (let i = 0; i < 3; i++) {
        html += '<div class="row">';

        for (let j = 0; j < 3; j++) {
            html += `<div class="column">${game.getFieldValue(i, j) || ''}</div>`;
        }

        html += '</div>';
    }

    gameCanvas.innerHTML = html;
}

render();

gameCanvas.addEventListener('click', e => {
    if (!e.target.classList.contains('column')) {
        return;
    }

    const rowIndex = Array.from(gameCanvas.children).indexOf(e.target.parentNode);
    const colIndex = Array.from(e.target.parentNode.children).indexOf(e.target);

    game.nextTurn(rowIndex, colIndex);

    const winner = game.getWinner();
    const isDraw = game.isDraw();

    render();

    if (winner) {
        setTimeout(() => {
            alert(`${winner} won!`);
            window.game = new TicTacToe();
            render();
        }, 10)
    }

    if (isDraw) {
        setTimeout(() => {
            alert(`It's a draw`);
            window.game = new TicTacToe();
            render();
        }, 10);
    }
})

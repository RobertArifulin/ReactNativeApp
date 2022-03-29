const convasLength = 312
const lineWidth = 3
const cellLenght = (convasLength - lineWidth * 2) / 3
const lineLenght = (convasLength - lineWidth * 2)

// 1 - x
// 2 - 0

let gameStatus = 1;

let cells = [
    [0, 0, 0],
    [0, 0, 0], 
    [0, 0, 0],
]

const wins = [
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[2, 0], [1, 1], [0, 2]],
]

function main() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    ctx.lineWidth = lineWidth;

    function drawField() {
        for (let i = 1; i <= 2; i++) {
            ctx.beginPath();
            ctx.moveTo(cellLenght * i, 0);
            ctx.lineTo(cellLenght * i, convasLength);
            ctx.closePath();
            ctx.stroke();
    
            ctx.beginPath();
            ctx.moveTo(0, cellLenght * i);
            ctx.lineTo(convasLength, cellLenght * i);
            ctx.closePath();
            ctx.stroke();
        }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++){
                if (cells[i][j] == 1) {
                    ctx.beginPath();
                    ctx.moveTo(cellLenght * j, cellLenght * i);
                    ctx.lineTo(cellLenght * (j + 1), cellLenght * (i + 1));
                    ctx.closePath();
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(cellLenght * (j + 1), cellLenght * i);
                    ctx.lineTo(cellLenght * j, cellLenght * (i + 1));
                    ctx.closePath();
                    ctx.stroke();
                } else if (cells[i][j] == 2) {       
                    ctx.beginPath();
                    ctx.arc(cellLenght * j + (cellLenght / 2), cellLenght * i + (cellLenght / 2), cellLenght / 2 - 5, 0, Math.PI * 2, true);
                    ctx.stroke();
                }
            }
        }
    } 

    function clearField() {
        ctx.clearRect(0, 0, convasLength, convasLength);
        cells = [
            [0, 0, 0],
            [0, 0, 0], 
            [0, 0, 0],
        ];
        drawField();
    }

    function congratWinner(status) {
        if (status == 1) {
            alert("Xs wins!");
        } else if (status == 2){
            alert("Os wins!");
        } else {
            alert("Draw!");
        }
        clearField();
    }

    function checkWin(){
        let isZero = false;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++){
                if (cells[i][j] == 0) {
                    isZero = true;
                    break
                }
            }
            if (isZero) break;
        }

        if (!isZero) {
            congratWinner(3);
            return 0;
        }

        for (let win of wins) {
            let winStatus = -1;
            for (let cords of win) {
                let x = cords[0];
                let y = cords[1];
                if (winStatus == -1) {
                    winStatus = cells[y][x];
                } else {
                    if (winStatus != cells[y][x]) {
                        winStatus = 0;
                    }
                }
            }
            if (winStatus > 0) {
                congratWinner(winStatus);
                break;
            }
        }
    }

    async function onclick(e){
        let x = e.offsetX;
        let y = e.offsetY;
        let i = Math.floor(y / cellLenght);
        let j = Math.floor(x / cellLenght);
        
        if (cells[i][j] == 0) {
            if (gameStatus == 1){
                cells[i][j] = 1;
                gameStatus = 2;
            } else {
                cells[i][j] = 2;
                gameStatus = 1;
            }
        } else {
            alert("Invalid move!");
        }

        // console.log(i, j);

        drawField();
        await new Promise(r => setTimeout(r, 500));
        checkWin();
    }

    drawField();

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++){
            console.log(cells[i][j])
        }
      }

    document.getElementById('clear').onclick = clearField;

    canvas.onclick = onclick;
}
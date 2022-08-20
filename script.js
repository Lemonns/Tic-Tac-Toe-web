//Player factory
const gameInfo = document.querySelector('.game-info')
gameInfo.textContent = 'Player 1  (X)'
const Player = (name, sign) => {
    return {name, sign};
}

//Creation of board and board visuals go here
const gameBoard = (() => {
    const resetBtn = document.querySelector('.reset-btn')
    let board = ["", "", "", "", "", "", "", "", ""];
    let html_board = document.querySelector('.square-grid')

    const reset = () => {
        console.log("reset")
        for (let i = 0; i < board.length; i++) {
          board[i] = "";
        }
      };

    for (let i = 0; i < board.length; i++) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('square');
        newDiv.setAttribute('value', i);
        html_board.appendChild(newDiv);
    }

    let squares = document.querySelectorAll('.square');
    const display = () => {
        console.log(board)
        for (let i = 0; i < board.length; i++) {
            if (board[i] === 'X') {
                squares[i].textContent = 'X'
                squares[i].setAttribute('id', 'X')
            }
            else if (board[i] === 'O') {
                squares[i].textContent = 'O'
                squares[i].setAttribute('id', 'O')
            }
            else {
                squares[i] = "a"
            }
        }
    }

    return {board, display, reset};
})();

//Game logic
const game = (() => {
    const resetBtn = document.querySelector('.reset-btn')
    let turns = 1;
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');
    const squares = document.querySelectorAll('.square');
    let board = gameBoard.board;

    resetBtn.addEventListener('click', (e) => {
        gameBoard.reset()
        gameInfo.textContent = 'Player 1  (X)'
        let crosses = document.querySelectorAll('#X')
        let circles = document.querySelectorAll('#O')
        for (let i = 0; i < circles.length; i++) {
            circles[i].textContent = ""
        }
        for (let i = 0; i < crosses.length; i++) {
            crosses[i].textContent = ""
        }
        play()
    })

    const infoDisplay = (sign) => {
        if (sign === 'X') {
            gameInfo.textContent = 'Player 2  (O)'
        }
        else {
            gameInfo.textContent = 'Player 1  (X)'
        }
    }

    const activePlayer = () => {
        return turns % 2 === 1 ? player1 : player2
    }
    function play() {
    let winner = false
    squares.forEach((square) => {
        square.addEventListener('click', () => {
            if (winner != true) {
                let player = activePlayer()
                if (board[parseInt(square.getAttribute('value'))] != "") {return}
                infoDisplay(player.sign)
                board[parseInt(square.getAttribute('value'))] = player.sign;

                if (isHorizontalWin(player.sign) || isVerticalWin(player.sign) || isDiagnolWin(player.sign)) {
                    gameInfo.textContent = `${player.name} Wins!`
                    winner = true
                    gameBoard.display();
                    return
                }
                if (isFull()) {
                    gameInfo.textContent = `Tie`
                    gameBoard.display();
                    return
                }
                gameBoard.display();
                turns += 1
            }
        })
    })
}
    const isFull = () => {
        if (board.includes("")) {
            console.log('not full')
            return false
        }
        console.log('full') 
        return true 
    }

    const isHorizontalWin = (player) => {
        for (let i = 0; i <= 6; i+=3) {
            if (gameBoard.board[i] === player && gameBoard.board[i+1] === player && gameBoard.board[i+2] === player) {return true}
        }
        return false
    }

    const isVerticalWin = (player) => {
        for (let i = 0; i <= 3; i++) {
            if (gameBoard.board[i] === player && gameBoard.board[i+3] === player && gameBoard.board[i+6] === player) {return true}
        }
        return false
    }

    const isDiagnolWin = (player) => {
        if (gameBoard.board[0] === player && gameBoard.board[4] === player && gameBoard.board[8] === player) {return true}
        else if (gameBoard.board[2] === player && gameBoard.board[4] === player && gameBoard.board[6] === player) {return true}
        return false
    }

    //gameBoard.display()
    play()
    return {turns}
})();

import React, { useState } from 'react'
import './game.css';


function Game() {
  // set state of player btw X and O
  const [isXNext , setIsXNext] = useState(true);
  // create the board with 9 squares
  const [board , setBoard] = useState(Array(9).fill(null));

  // check the winner function
  const calculauteWinner = (board) => {
    // initialize all possible to win
    const lines = [
      // row
      [0,1,2],[3,4,5],[6,7,8],
      // column
      [0,3,6],[1,4,7],[2,5,8],
      // digonal
      [0,4,8],[2,4,6]
    ]
    // iterate thru the lines array
    for (const line of lines) {
      const [a,b,c] = line;
      // console.log('a', a)
      // console.log('b' , b)
      // console.log('c', c)
      // check if board at index are the same 
      // if yes, return winner 
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    // otherwise, return null;
    return null;
  };

  // handle click function
  // check if the current player is X or O
  // then switch to different one 
  const handleClick = (index) => {
      // take in current cell index position that was cliked on

    // if the the board already have current player // can't click on the same cell in the board 
    // return
    if (board[index] || winner) return; 
    // check if the current board at the index that was clicked on is now X or O
    board[index] = isXNext ? 'X' : 'O';
    // console.log(board)
    // update the board
    setBoard(board);
    // switch to the opposite one
    setIsXNext(!isXNext);
  };

  // check the winner
  const winner = calculauteWinner(board);
  // check the winner and current player
  const status = winner ? 
  ( <span id='winner' style={{ backgroundColor: winner === 'X' ? 'rgb(234, 201, 188)' :'rgb(161, 214, 224)' , fontWeight: 'bold' , color: winner === 'X' ? 'orangered' :'rgb(22, 129, 148)'}}>Winner: {winner}</span>
  ) : board.includes(null) ? `Next Player: ${isXNext ? 'X' : 'O'}` : "It's a Draw!";

  // handle the reset button
  const resetGame = () => {
    // set back to null and true as initial state
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className='game-container'>
      <h1>Welcome to Tic-Tac-Toe Board Game</h1>
      <h1><span id='x'>X</span><span id='o'>O</span></h1>
      <div className='board'>
        {/* create cell in each row */}
        {board.map((cell , index) => (
          <button key={index} className={`cell ${cell ? cell : ""}`} onClick={() => handleClick(index)}>
            {cell}
          </button>
        ))}
      </div>
      <div className='status'>{status}</div>
      <button className='reset-btn'onClick={(resetGame)}>Reset Game</button>
    </div>
  )

};



export default Game;


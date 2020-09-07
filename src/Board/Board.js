import React, { useState, useEffect } from "react";
import NextMoves from "./nextMoves";

const Board = () => {
  const [boardSize, setBoardSize] = useState(8);
  const [startingCord, setstartingCord] = useState({ x: 8, y: 1 });
  const [visited, setVisited] = useState([{ x: 1, y: 1 }]);
  const [possibleMoves, setPossibleMoves] = useState([]);

  useEffect(() => {
    getValidMoves();
  }, [boardSize, startingCord]);

  const x_moves = [2, 1, -1, -2, -2, -1, 1, 2];
  const y_moves = [1, 2, 2, 1, -1, -2, -2, -1];

  function getValidMoves() {
    const { x, y } = startingCord;
    if (isValidStart(x, y)) {
      const moves = [];
      let visited;

      for (let i = 0; i < 8; i++) {
        const next_x = x + x_moves[i];
        const next_y = y + y_moves[i];
        if (
          next_x >= 1 &&
          next_x <= boardSize &&
          next_y >= 1 &&
          next_y <= boardSize
        ) {
          visited = checkVisited(next_x, next_y) ? true : false;
          moves.push({ next_x, next_y, visited: visited });
        }
        setPossibleMoves(moves);
      }
    }
  }

  function checkVisited(x, y) {
    for (let key in visited) {
      if (visited[key].x === x && visited[key].y === y) {
        return true;
      }
    }
  }

  function isValidStart(x, y) {
    return x <= boardSize && y <= boardSize ? true : false;
  }

  function boardSizeHandler(event) {
    setBoardSize(event.target.value);
  }

  function setStartingCordHandler(e) {
    const newCord = { ...startingCord };
    e.target.name === "input_x"
      ? (newCord.x = +e.target.value)
      : (newCord.y = +e.target.value);
    setstartingCord(newCord);
  }

  function updateStartingCord({ next_x, next_y }) {
    const newCord = { x: next_x, y: next_y, visited: true };
    setstartingCord(newCord);
    const allMoves = [...visited];
    allMoves.push(newCord);
    setVisited(allMoves);
  }

  return (
    <React.Fragment>
      <div className="Board">
        <div>
          <label> Board Size : </label>
          <input
            type="text"
            name="size"
            value={boardSize}
            onChange={boardSizeHandler}
          />
        </div>
        <div>
          <label> X coordinate : </label>
          <input
            type="text"
            name="input_x"
            value={startingCord.x}
            onChange={setStartingCordHandler}
          />
        </div>
        <div>
          <label>Y coordinate : </label>
          <input
            type="text"
            name="input_y"
            value={startingCord.y}
            onChange={setStartingCordHandler}
          />
        </div>
      </div>
      <div className="moves">
        <p>Possible Moves</p>
        {possibleMoves.length ? (
          possibleMoves.map((move, i) => {
            return (
              <NextMoves
                move={move}
                key={i}
                clicked={() => {
                  updateStartingCord(move);
                }}
              />
            );
          })
        ) : (
          <p>No Possible Move. Starting Coordinates outside board Size</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default Board;

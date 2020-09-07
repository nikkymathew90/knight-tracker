import React from "react";

const NextMoves = props => {
  return (
    <button onClick={props.clicked} disabled={props.move.visited}>
      x: {props.move.next_x}, y: {props.move.next_y}
    </button>
  );
};

export default NextMoves;

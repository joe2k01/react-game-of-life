import { Button } from "@mui/material";
import { React, useCallback, useEffect, useState } from "react";

const rowsAndColumns = 50;

const neighboursPositions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

const Gamegrid = () => {
  const resetGrid = () => {
    const rows = [];
    for (let i = 0; i < rowsAndColumns; i++) {
      rows.push(Array(rowsAndColumns).fill(false));
    }
    return rows;
  };

  const cloneGrid = (gridToClone) => {
    const newGrid = gridToClone.map((rows) => rows.slice());
    return newGrid;
  };

  const [grid, setGrid] = useState(resetGrid());
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const gameOfLife = setTimeout(() => {
      if (!play) return;

      const operatingGrid = cloneGrid(grid);
      const checkGrid = cloneGrid(grid);
      for (let i = 0; i < rowsAndColumns; i++) {
        for (let j = 0; j < rowsAndColumns; j++) {
          const thisCell = checkGrid[i][j];
          var neighbours = 0;
          for (let k = 0; k < neighboursPositions.length; k++) {
            const position = neighboursPositions[k];

            const neighbourColumn = i + position[0];
            const neighbourRow = j + position[1];

            if (
              neighbourColumn >= 0 &&
              neighbourRow >= 0 &&
              neighbourColumn < rowsAndColumns &&
              neighbourRow < rowsAndColumns
            ) {
              if (checkGrid[neighbourColumn][neighbourRow]) neighbours++;
            }
          }

          if (neighbours < 2 || neighbours > 3) {
            operatingGrid[i][j] = false;
          } else if (!thisCell && neighbours === 3) {
            operatingGrid[i][j] = true;
          }
        }
      }

      setGrid(operatingGrid);

      // Recursive call
      gameOfLife();
    }, 500);

    return () => {
      /* Must clear or things get out of sync
        when the component is mounted/unmounted.
        Could also cause memory leaks if not cleared.
        */
      clearTimeout(gameOfLife);
    };
  });

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${rowsAndColumns}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((column, j) => (
            <div
              key={`${i}-${j}`}
              style={{
                width: "20px",
                height: "20px",
                border: "1px solid black",
                backgroundColor: grid[i][j] ? "red" : undefined,
              }}
              onClick={() => {
                var gridClone = cloneGrid(grid);
                gridClone[i][j] = !gridClone[i][j];
                setGrid(gridClone);
              }}
            />
          ))
        )}
      </div>
      <Button
        variant="contained"
        onClick={() => {
          setPlay(!play);
        }}
      >
        Play
      </Button>
    </>
  );
};

export default Gamegrid;

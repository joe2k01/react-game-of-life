import { React, useState } from "react";

const rowsAndColumns = 50;

const Gamegrid = () => {
  const resetGrid = () => {
    const rows = [];
    for (let i = 0; i < rowsAndColumns; i++) {
      rows.push(Array(rowsAndColumns).fill(false));
    }
    return rows;
  };

  const cloneGrid = (gridToClone) => {
      const newGrid = gridToClone.map(rows => rows);
      return newGrid;
  }

  const [grid, setGrid] = useState(resetGrid());

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${rowsAndColumns}, 20px)`,
      }}
    >
      {grid.map((rows, i) => 
        rows.map((column, j) => 
          <div
            key={`${i}-${j}`}
            style={{
              width: "20px",
              height: "20px",
              border: "1px solid black",
              backgroundColor: grid[i][j] ? "red" : undefined
            }}
            onClick={() => {
                var gridClone = cloneGrid(grid);
                gridClone[i][j] = !gridClone[i][j];
                setGrid(gridClone);
            }}
          />
        )
      )}
    </div>
  );
};

export default Gamegrid;

import { AppBar, Button, Slider, Stack, Toolbar, Typography, useTheme } from "@mui/material";
import { React, useEffect, useState } from "react";

import "./styles/Game.css";

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
  const [simulationSpeed, setSimulationSpeed] = useState(-500);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const getControlsStyle = () => {
    var style = {};
    if (windowWidth > 900) {
      style = {
        width: 1 / 2,
        mx: "25%"
      }
    } else {
      style = {
        width: 1 / 2,
        my: 2,
        mx: "25%"
      }
    }

    return style;
  }

  const [controlsStyle, setControlsStyle] = useState(getControlsStyle());

  const theme = useTheme();

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
    }, Math.abs(simulationSpeed));

    return () => {
      /* Must clear or things get out of sync
        when the component is mounted/unmounted.
        Could also cause memory leaks if not cleared.
        */
      clearTimeout(gameOfLife);
    };
  });

  useEffect(() => {
    const getWidth = () => {
      setWindowWidth(window.innerWidth);
      setControlsStyle(getControlsStyle());
    }

    window.addEventListener("resize", getWidth);

    return () => window.removeEventListener("resize", getWidth);
  })

  return (
    <div className="gameContainer">
      <div className="gameGrid">
        {grid.map((rows, i) => {
          return (
            <div key={i} className="gameRow">
              {rows.map((column, j) => {
                return (
                  <div
                    key={`${i}-${j}`}
                    className="cell"
                    style={{
                      backgroundColor: grid[i][j] ? theme.palette.secondary.main : undefined,
                      border: `1px solid ${theme.palette.primary.main}`
                    }}
                    onClick={() => {
                      var gridClone = cloneGrid(grid);
                      gridClone[i][j] = !gridClone[i][j];
                      setGrid(gridClone);
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }} enableColorOnDark>
        <Toolbar variant="dense">
          <Stack spacing={2} direction={windowWidth > 900 ? "row" : "column"} sx={controlsStyle} alignItems="center" justifyContent="center">
            <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
              <Button color="secondary"
                aria-label={play ? "Pause" : "Play"}
                variant="contained"
                onClick={() => {
                  setPlay(!play);
                }}
              >
                {play ? "Pause" : "Play"}
              </Button>
              <Button color="secondary"
                aria-label="Reset"
                variant="contained"
                onClick={() => {
                  setPlay(false);
                  setGrid(resetGrid());
                }}
              >
                Reset
              </Button>
            </Stack>
            <Stack spacing={1} direction="column" sx={{ width: (windowWidth > 900 ? (1 / 5) : 1) }} textAlign="center">
              <Typography>
                Simulation speed
              </Typography>
              <Slider
                color="secondary"
                min={-1000}
                max={-100}
                value={simulationSpeed}
                onChange={(event, value) => setSimulationSpeed(value)}
              />
            </Stack>

          </Stack>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Gamegrid;

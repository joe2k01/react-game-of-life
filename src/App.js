import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, Toolbar, Typography } from '@mui/material';
import './App.css';
import Gamegrid from './components/Gamegrid';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import CircleIcon from '@mui/icons-material/Circle';
import { useState } from 'react';

const modalStyle = { // From https://mui.com/material-ui/react-modal/
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant='h3'>
            Conway's Game of Life
          </Typography>
          <p>
            Conway's Game of Life has 4 rules:
            <List>
              <ListItem>
                <ListItemIcon>
                  <CircleIcon />
                </ListItemIcon>
                <ListItemText>
                  Any live cell with fewer than two live neighbours dies, as if by underpopulation.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CircleIcon />
                </ListItemIcon>
                <ListItemText>
                  Any live cell with two or three live neighbours lives on to the next generation.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CircleIcon />
                </ListItemIcon>
                <ListItemText>
                  Any live cell with more than three live neighbours dies, as if by overpopulation.
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CircleIcon />
                </ListItemIcon>
                <ListItemText>
                  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                </ListItemText>
              </ListItem>
            </List>
            From <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>Wikipedia</a>, read more about the game if you wish.
          </p>
        </Box>
      </Modal>
      <Drawer
        anchor='left'
        open={showMenu}
        onClose={() => { setShowMenu(false) }}>
        <List>
          <ListItem>
            <ListItemButton onClick={() => {
              setShowModal(true)
              setShowMenu(false)
            }}>
              <ListItemIcon>
                <HelpCenterIcon />
              </ListItemIcon>
              <ListItemText primary="How does this work?" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => {
              window.open("https://github.com/joe2k01/react-game-of-life", '_blank', 'noopener, noreferrer')
            }}>
              <ListItemIcon>
                <GitHubIcon />
              </ListItemIcon>
              <ListItemText primary="See source code on GitHub" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => {
              window.open("https://www-users.york.ac.uk/~gb1149/", '_self', 'noopener')
            }}>
              <ListItemIcon>
                <OpenInBrowserIcon />
              </ListItemIcon>
              <ListItemText primary="Go to my main page" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <IconButton aria-label="menu" color="secondary" onClick={() => setShowMenu(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h3' sx={{ py: 1 }}>
            Conway's Game of Life
          </Typography>
          <Typography sx={{mx: 1}}>
            (in <a href='https://reactjs.org/'>React</a>, with <a href='https://mui.com/'>Material UI</a>)
          </Typography>
        </Toolbar>
      </AppBar>
      <Gamegrid />
    </div>
  );
}

export default App;

import { AppBar, Box, Button, createTheme, Drawer, IconButton, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Modal, ThemeProvider, Toolbar, Typography } from '@mui/material';
import './App.css';
import Gamegrid from './components/Gamegrid';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { amber, deepPurple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: deepPurple,
    secondary: amber
  }
})

const modalContent = {
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "scroll"
}

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          sx={modalStyle}
        >
          <Box sx={modalContent} color={"#fff"}>
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
              From <Link color='secondary' href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>Wikipedia</Link>, read more about the game if you wish.
            </p>
            <Button variant='outlined' color="secondary" startIcon={<CloseIcon />} onClick={() => { setShowModal(false) }}>
              Close
            </Button>
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
        <AppBar position='static' enableColorOnDark>
          <Toolbar variant='dense'>
            <IconButton aria-label="menu" color="secondary" onClick={() => setShowMenu(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant='h3' sx={{ py: 1 }}>
              Conway's Game of Life
            </Typography>
            <Typography sx={{ mx: 1 }}>
              (in <Link color='secondary' href='https://reactjs.org/'>React</Link>, with <Link color='secondary' href='https://mui.com/'>Material UI</Link>)
            </Typography>
          </Toolbar>
        </AppBar>
        <Gamegrid />
      </ThemeProvider>
    </div>
  );
}

export default App;

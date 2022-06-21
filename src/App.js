import { AppBar, Toolbar } from '@mui/material';
import './App.css';
import Gamegrid from './components/Gamegrid';

function App() {
  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <h1>Test</h1>
        </Toolbar>
      </AppBar>
      <Gamegrid />
    </div>
  );
}

export default App;

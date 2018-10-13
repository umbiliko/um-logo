import * as React from 'react';
import CanvasSphere from 'src/components/CanvasSphere';
import Logo from 'src/components/Logo';
import './App.css';
import logo from './logo.svg';

class App extends React.Component {
  public render() {
    const radio = Math.floor(200 / 2);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <CanvasSphere center={{ x: radio, y: radio, z: 0 }} radio={radio} split={10} />
        <Logo center={{ x: radio, y: radio, z: 0 }} radio={radio} split={10} />
      </div>
    );
  }
}

export default App;

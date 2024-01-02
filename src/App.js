
import './App.css';
import { Toaster } from 'react-hot-toast';
import CurrencyConversion from './components/CurrencyConversion';
import Header from './components/Header';

function App() {
  return (
    <div className="app">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Header />
      <CurrencyConversion />
      <Toaster />
    </div>
  );
}

export default App;

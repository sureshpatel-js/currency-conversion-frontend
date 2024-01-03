
import { Toaster } from 'react-hot-toast';
import './App.css';
import CurrencyConversion from './components/CurrencyConversion';
import Header from './components/Header';
import ImageContainer from './components/ImageContainer';

function App() {
  return (
    <div className="app">
      <Header />
      <div className='heroContainer'>
        <ImageContainer />
        <CurrencyConversion />
      </div>
      <Toaster />
    </div>
  );
}

export default App;

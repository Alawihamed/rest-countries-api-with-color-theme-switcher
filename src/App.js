import React,{useState} from 'react';
import CountryDetails from './components/CountryDetails/CountryDetails';
import CountryList from './components/CountryList/CountryList';
import Header from './components/Header/Header';
import { Routes, Route } from "react-router-dom";

function App() {
  const [darkTheme ,setDarkTheme ] = useState(localStorage.getItem('dark-theme') || '');
  const setNewTheme = () => {
    if(darkTheme === ''){
      setDarkTheme('dark');
      localStorage.setItem('dark-theme', 'dark');
    }
    else{
      setDarkTheme('');
      localStorage.setItem('dark-theme', '');
    }
  }
  return (
    <div>
      <Header darkTheme={darkTheme} setNewTheme={setNewTheme}/>
      <div className={`main ${darkTheme}`}>
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/country/:name" element={<CountryDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

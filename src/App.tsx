import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from  './client/pages/Home/Home';
import Search from './client/pages/Search/Search';
import Contact from './client/pages/Contact/Contact';
import "./App.css"
import './index.css'
import NavBar from './client/Nav/Navbar';
//import Login from  './client/Login';
import Register from './client/Register';
import Logout from './client/Logout';

import Loader from './client/loader';
// import Footer from './client/components/Footer/Footer';

const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000); // le loader s'affiche pendant 1 secondes
  }, []);

  

  return (
    <>
      {!loaded && <Loader />}
      <BrowserRouter>
        <NavBar /> 
        <Routes>
           
          <Route path="/*" element={<Home />} />
          
          <Route path="/Search" element={<Search />} />
          {/*<Route path="/Login" element={<Login />} />*/}
          <Route path="/Register" element={<Register />} />
          <Route path="/Contact" element={<Contact />} />
         
          <Route path="/Logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

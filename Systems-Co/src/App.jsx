import React, { useState } from 'react';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Clienti from './Pages/Clienti/Clienti';
import Interventi from './Pages/Interventi/Interventi';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AggiungiCliente from './Pages/Clienti/AggiungiCliente';
import AggiungiIntervento from './Pages/Interventi/AggiungiIntervento';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleAuthentication = () => { setIsAuthenticated(true) };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login handleAuthentication={handleAuthentication} />}/>
        <Route path="/dashboard" element={isAuthenticated ? (<Dashboard />) : (<Navigate to="/" />)}/>
        <Route path="/clienti" element={isAuthenticated ? (<Clienti />) : (<Navigate to="/" />)}/>
        <Route path="/interventi" element={isAuthenticated ? (<Interventi />) : (<Navigate to="/" />)}/>
        <Route path="/insertCliente" element={isAuthenticated ? (<AggiungiCliente />) : (<Navigate to="/" />)}/>
        <Route path="/insertIntervento" element={isAuthenticated ? (<AggiungiIntervento />) : (<Navigate to="/" />)}/>
      </Routes>
    </Router>
  );
}

export default App;
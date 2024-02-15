//import { useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
//import './App.css'
//importar Menu Principal
import Menu from './componets/Menu'
import { BrowserRouter } from 'react-router-dom';
import { estaSesion } from './utilidades/Sessionutil';
//import Mapa from './componets/Mapa/Mapa'
import Login from './componets/Login'
import GestionarDisositivos from './componets/GestionarDisositivos'
import ListarDisositivos from './componets/ListarDisositivos'
import RegistrarDispositivos from './componets/RegistrarDispositivos'
import Nav from './componets/Nav'
import IndicadorUV from './componets/IndicadorUV'
import Inicio from './componets/Inicio'
import TablaDatosHistorico from './componets/TablaDatosHistorico'
import DatosHistoricos from './componets/DatosHistoricos'
import Formulario from './componets/Formulario'
import Persona from './componets/Persona'
import Peticiones from './componets/Peticiones'
import Solicitud from './componets/solicitud'
function App() {
  const Middeware = ({ children }) => {
    const autenticado = estaSesion();
    const location = useLocation();
    if (autenticado) {
      return children;
    } else {
      return <Navigate to='/login' state={location} />;
    }
  }
  const MiddewareSesion = ({ children }) => {
    const autenticado = estaSesion();
    if (autenticado) {
      return children;
    } else {
      return <Navigate to='/' />;
    }
  }
  return (
    
    <BrowserRouter>
      <Nav/>
      <Routes>
        
        <Route path='/principal' element={<Inicio/>}/>
        <Route path='/' element={<Inicio/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/persona' element={<MiddewareSesion><Persona show={false} /></MiddewareSesion>}/>
        <Route path='/peticiones' element={<MiddewareSesion><Peticiones show={false} /></MiddewareSesion>}/>
        <Route path='/solicitud' element={<Solicitud show={false} />}/>
        <Route path='/dispositivolista' element={<ListarDisositivos/>}/>
        <Route path='/dispositivo' element={<GestionarDisositivos/>}/>
        <Route path='/menu' element={<Menu/>}/>
        <Route path='/formulario' element={<Formulario/>}/>
        <Route path='/IndicadorUV' element={<IndicadorUV/>}/>
        <Route path='/TablaDatosHistorico' element={<TablaDatosHistorico/>}/>
        <Route path='/DatosHistoricos' element={<DatosHistoricos/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
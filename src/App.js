import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalogo from './components/Catalogo';
import Carrito from './components/Carrito';
import Login from './components/Login';
import Pedidos from './components/Pedidos';
import Envios from './components/Envios';
import Admin from './components/Admin';
import Registro from './components/Registro';
import Promociones from './components/Promociones';
import './styles/style.css';

function App() {
  const [usuario, setUsuario] = useState('');
  const [esAdmin, setEsAdmin] = useState(false);

  return (
    <>
      <Navbar
        usuario={usuario}
        esAdmin={esAdmin}
        setUsuario={setUsuario}
        setEsAdmin={setEsAdmin}
      />
      <Routes>
        <Route path="/" element={<Home usuario={usuario} esAdmin={esAdmin} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login setUsuario={setUsuario} setEsAdmin={setEsAdmin} />} />
        <Route path="/catalogo" element={<Catalogo usuario={usuario} />} />
        <Route path="/carrito" element={<Carrito usuario={usuario} />} />
        <Route path="/pedidos" element={<Pedidos usuario={usuario} />} />
        <Route path="/envios" element={<Envios usuario={usuario} />} />
        <Route path="/admin" element={<Admin usuario={usuario} esAdmin={esAdmin} />} />
        <Route path="/promociones" element={<Promociones />} />
      </Routes>
    </>
  );
}

export default App;

import { useState, useEffect } from 'react';
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
import RutaPrivada from './components/RutaPrivada'; // 🔒 importar ruta protegida
import './styles/style.css';

function App() {
  const [usuario, setUsuario] = useState('');
  const [esAdmin, setEsAdmin] = useState(false);

  // ✅ Restaurar sesión desde localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUsuario(payload.sub);
        setEsAdmin(payload.rol === 'ADMIN');
      } catch (error) {
        console.error('Error al decodificar token', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

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
        <Route path="/registro" element={<Registro setUsuario={setUsuario} setEsAdmin={setEsAdmin} />} />
        <Route path="/login" element={<Login setUsuario={setUsuario} setEsAdmin={setEsAdmin} />} />
        <Route path="/catalogo" element={<Catalogo usuario={usuario} />} />
        <Route path="/carrito" element={<Carrito usuario={usuario} />} />

        {/* 🔒 rutas protegidas */}
        <Route
          path="/pedidos"
          element={
            <RutaPrivada>
              <Pedidos usuario={usuario} />
            </RutaPrivada>
          }
        />
        <Route
          path="/envios"
          element={
            <RutaPrivada>
              <Envios usuario={usuario} />
            </RutaPrivada>
          }
        />
        <Route
          path="/admin"
          element={
            <RutaPrivada rol="ADMIN">
              <Admin usuario={usuario} esAdmin={esAdmin} setUsuario={setUsuario} setEsAdmin={setEsAdmin} />
            </RutaPrivada>
          }
        />

        <Route path="/promociones" element={<Promociones />} />
      </Routes>
    </>
  );
}

export default App;

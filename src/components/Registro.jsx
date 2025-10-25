import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/style.css';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [nacimiento, setNacimiento] = useState('');
  const [codigo, setCodigo] = useState('');
  const [resultado, setResultado] = useState('');
  const [erroresCampo, setErroresCampo] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const errores = {};
    const nombreTrim = nombre.trim();
    const emailTrim = email.trim();
    const codigoTrim = codigo.trim().toUpperCase();
    const hoy = new Date();
    let edad = 0;
    let fechaNacimiento = null;

    // Validaciones por campo
    if (nombreTrim.length < 3) {
      errores.nombre = "El nombre debe tener al menos 3 caracteres.";
    }

    if (!emailTrim.includes("@") || !emailTrim.includes(".")) {
      errores.email = "El correo electrónico no es válido.";
    }

    if (nacimiento === "") {
      errores.nacimiento = "Debes ingresar tu fecha de nacimiento.";
    } else {
      fechaNacimiento = new Date(nacimiento);
      edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
      const mes = hoy.getMonth() - fechaNacimiento.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }
      if (edad < 18) {
        errores.nacimiento = "Debes tener al menos 18 años para registrarte.";
      }
    }

    if (codigoTrim !== "" && codigoTrim.length < 5) {
      errores.codigo = "El código de descuento debe tener al menos 5 caracteres.";
    }

    // Mostrar errores si existen
    if (Object.keys(errores).length > 0) {
      setErroresCampo(errores);
      setResultado('');
      return;
    }

    setErroresCampo({}); // Limpiar errores

    // Beneficios
    const beneficios = [];
    if (edad >= 50) {
      beneficios.push("Descuento del 50% en todos los productos por ser mayor de 50 años.");
    }
    if (codigoTrim === "FELICES50") {
      beneficios.push("Descuento del 10% de por vida por usar el código FELICES50.");
    }
    const cumpleHoy = fechaNacimiento.getDate() === hoy.getDate() && fechaNacimiento.getMonth() === hoy.getMonth();
    if (emailTrim.includes("@duocuc.cl") && cumpleHoy) {
      beneficios.push("¡Torta gratis por tu cumpleaños para estudiantes Duoc!");
    }

    if (beneficios.length > 0) {
      setResultado(
        `<h3>Beneficios aplicados:</h3><ul>${beneficios.map(b => `<li>${b}</li>`).join('')}</ul>`
      );
    } else {
      setResultado("No se aplicaron beneficios especiales.");
    }

    // Redirección simulada
    setTimeout(() => {
      navigate('/catalogo');
    }, 2000);
  };

  return (
    <div className="form-box">
      <h2 className="tituloPastel">Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="form-registro">
        <div className="campo-registro">
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="input-registro"
          />
          {erroresCampo.nombre && <p className="error-text">{erroresCampo.nombre}</p>}
        </div>

        <div className="campo-registro">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-registro"
          />
          {erroresCampo.email && <p className="error-text">{erroresCampo.email}</p>}
        </div>

        <div className="campo-registro">
          <input
            type="date"
            value={nacimiento}
            onChange={(e) => setNacimiento(e.target.value)}
            className="input-registro"
          />
          {erroresCampo.nacimiento && <p className="error-text">{erroresCampo.nacimiento}</p>}
        </div>

        <div className="campo-registro">
          <input
            type="text"
            placeholder="Código de descuento (opcional)"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="input-registro"
          />
          {erroresCampo.codigo && <p className="error-text">{erroresCampo.codigo}</p>}
        </div>

        <button type="submit" className="boton-catalogo">Registrarse</button>
      </form>

      <div
        id="beneficios"
        className="resultadoRegistro"
        dangerouslySetInnerHTML={{ __html: resultado }}
      />

      <div className="volver">
        <Link to="/login" className="link-volver">Volver al Login</Link>
      </div>
    </div>
  );
};

export default Registro;

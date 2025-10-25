import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
import '../styles/style.css';

const Promociones = () => {
  const mensaje = encodeURIComponent(
    "¡Aprovecha esta promoción! Torta de Chocolate con 20% de descuento. Solo por hoy 🍰"
  );
  const urlBase = "https://mitienda.com/promociones";

  const compartirFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${urlBase}&t=${mensaje}`;
    window.open(url, "_blank");
  };

  const compartirTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${mensaje}&url=${urlBase}`;
    window.open(url, "_blank");
  };

  const compartirWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${mensaje} ${urlBase}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="volver-flotante">
        <Link to="/">← Volver</Link>
      </div>

      <div className="promo-box">
        <h2 className="tituloPastel">¡Promoción Especial!</h2>
        <p className="texto-promo">
          <strong>Torta de Chocolate</strong> - 20% de descuento solo por hoy 🍫
        </p>

        <div className="promo-redes">
          <div onClick={compartirFacebook} className="icono-red" title="Compartir en Facebook">
            <FaFacebookF />
          </div>
          <div onClick={compartirTwitter} className="icono-red" title="Compartir en X">
            <FaXTwitter />
          </div>
          <div onClick={compartirWhatsApp} className="icono-red" title="Compartir por WhatsApp">
            <FaWhatsapp />
          </div>
        </div>
      </div>
    </>
  );
};

export default Promociones;

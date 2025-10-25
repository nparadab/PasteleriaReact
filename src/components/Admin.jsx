const Admin = () => {
  return (
    <div className="containerAdmin">
      <h2>Panel de Administración</h2>
      <p>Acceso exclusivo para el usuario <strong>admin</strong>.</p>
      <ul>
        <li>📦 Ver todos los pedidos</li>
        <li>🚚 Gestionar envíos</li>
        <li>🎂 Crear tortas personalizadas</li>
        <li>📊 Ver estadísticas de ventas</li>
      </ul>
    </div>
  );
};

export default Admin;

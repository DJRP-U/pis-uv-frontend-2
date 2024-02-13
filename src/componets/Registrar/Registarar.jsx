import 'bootstrap/dist/css/bootstrap.min.css';

function Registrar() {
  return (
    <div className="container mt-4 d-flex justify-content-center">
      <form style={{ maxWidth: '400px', width: '100%' }}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input type="text" id="nombre" name="nombre" className="form-control" style={{ width: '100%' }} required />
        </div>

        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">Apellido:</label>
          <input type="text" id="apellido" name="apellido" className="form-control" style={{ width: '100%' }} required />
        </div>

        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección:</label>
          <input type="text" id="direccion" name="direccion" className="form-control" style={{ width: '100%' }} required />
        </div>

        <div className="mb-3">
          <label htmlFor="edad" className="form-label">Edad:</label>
          <input type="number" id="edad" name="edad" className="form-control" style={{ width: '100%' }} required />
        </div>

        <div className="mb-3">
          <label htmlFor="rol" className="form-label">Rol:</label>
          <select id="rol" name="rol" className="form-select" style={{ width: '100%' }} required>
            <option value="">Seleccionar Rol</option>
            <option value="usuario_normal">Usuario Normal</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="ciudad" className="form-label">Ciudad:</label>
          <input type="text" id="ciudad" name="ciudad" className="form-control" style={{ width: '100%' }} required />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Enviar</button>
      </form>
    </div>
  );
}

export default Registrar;

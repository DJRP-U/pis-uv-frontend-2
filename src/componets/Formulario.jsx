import  { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Formulario() {
  const [datos, setDatos] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    contrasena: '',
    fechaNacimiento: null,
    motivo: '',
    direccion: '',
    telefono: '',
    organizacion: '',
    ocupacion: ''
  });

  const [organizacionesPosibles] = useState([
    'Universidad',
    'Empresa',
    'Instituto de Investigación',
    'Organización',
    'Asociación',
    'Otro'
  ]);

  const [cargosPosibles] = useState([
    'Estudiante',
    'Desarrollador',
    'Investigador',
    'Analista',
    'Gerente',
    'Consultor',
    'Profesor',
    'Otros'
  ]);

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    });
  };

  const handleFechaNacimientoChange = (date) => {
    setDatos({
      ...datos,
      fechaNacimiento: date
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos a la API o realizar otras operaciones
    e.preventDefault();

    try {
      const formattedDate = datos.fechaNacimiento.toISOString().split('T')[0];
      console.log(formattedDate);
      const response = await fetch('http://127.0.0.1:3006/api/solicitudes/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombres: datos.nombres,
          apellidos: datos.apellidos,
          correo: datos.correo,
          contrasenia: datos.contrasena,
          telefono: datos.telefono,
          fecha_nacimiento: formattedDate,
          ocupacion: datos.ocupacion,
          organizacion: datos.organizacion,
          direccion: datos.direccion,
          estadp: 'ESPERA'
        })
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }
      
      console.log('Formulario enviado correctamente');
    } catch (error) {
      console.error('Error al enviar el formulario:', error.message);
    }
  
    console.log(datos);
  };

  return (
    <div className="container">
      <h2>Formulario de solicitud de acceso a la API de radiación UV</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombres" className="form-label">Nombres</label>
          <input type="text" className="form-control" id="nombres" name="nombres" value={datos.nombres} onChange={handleChange} required />
          {datos.nombres === '' && (
            <span style={{ color: 'red' }}>Ingresa nombres</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="apellidos" className="form-label">Apellidos</label>
          <input type="text" className="form-control" id="apellidos" name="apellidos" value={datos.apellidos} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo Electrónico</label>
          <input type="email" className="form-control" id="correo" name="correo" value={datos.correo} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="contrasena" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="contrasena" name="contrasena" value={datos.contrasena} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input type="tel" className="form-control" id="telefono" name="telefono" value={datos.telefono} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="organizacion" className="form-label">Organización</label>
          <select className="form-select" id="organizacion" name="organizacion" value={datos.organizacion} onChange={handleChange} required>
            <option value="">Selecciona una organización</option>
            {organizacionesPosibles.map((organizacion, index) => (
              <option key={index} value={organizacion}>{organizacion}</option>
            ))}
          </select>
        </div>
        {datos.organizacion === "Otro" && (
          <div className="mb-3">
            <label htmlFor="otraOrganizacion" className="form-label">Otra Organización</label>
            <input type="text" className="form-control" id="otraOrganizacion" name="otraOrganizacion" value={datos.otraOrganizacion} onChange={handleChange} required />
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="ocupacion" className="form-label">Ocupación</label>
          <select className="form-select" id="ocupacion" name="ocupacion" value={datos.ocupacion} onChange={handleChange} required>
            <option value="">Selecciona una ocupación</option>
            {cargosPosibles.map((cargo, index) => (
              <option key={index} value={cargo}>{cargo}</option>
            ))}
          </select>
        </div>
        {datos.ocupacion === "Otros" && (
          <div className="mb-3">
            <label htmlFor="otraOcupacion" className="form-label">Otra Ocupación</label>
            <input type="text" className="form-control" id="otraOcupacion" name="otraOcupacion" value={datos.otraOcupacion} onChange={handleChange} required />
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input type="text" className="form-control" id="direccion" name="direccion" value={datos.direccion} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
          <DatePicker
            className="form-control"
            id="fechaNacimiento"
            selected={datos.fechaNacimiento}
            onChange={handleFechaNacimientoChange}
            dateFormat="yyyy-MM-dd"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="motivo" className="form-label">Motivo</label>
          <textarea className="form-control" id="motivo" name="motivo" value={datos.motivo} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
}

export default Formulario;
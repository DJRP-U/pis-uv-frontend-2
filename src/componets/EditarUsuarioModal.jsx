import  { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const EditarUsuarioModal = ({ show, handleClose, identificacion }) => {
  const [datosUsuario, setDatosUsuario] = useState({
    apellidos: '',
    direccion: '',
    fecha_nacimiento: '',
    ocupacion: '',
    organizacion: '',
    correo: '',
    clave: ''
  });

  const roles = ['Docente', 'Administrativo', 'Estudiante', 'Brigadista'];
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8095/api/v1/personas/obtener/identificacion/${identificacion}`)
      .then(response => response.json())
      .then(data => {
        setDatosUsuario(data.data);
      })
      .catch(error => {
        console.error('Error al obtener datos del usuario:', error);
      });
  }, [identificacion]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDatosUsuario({
      ...datosUsuario,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3006/api/v1/personas/editar/${datosUsuario.External}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tipo_persona: datosUsuario.Rol,
          cuenta: {
            correo: datosUsuario.correo,
            clave: datosUsuario.clave,
          },
          apellidos: datosUsuario.apellidos,
          direccion: datosUsuario.direccion,
          fecha_nacimiento: datosUsuario.fecha_nacimiento,
          ocupacion: datosUsuario.ocupacion,
          organizacion: datosUsuario.organizacion,
          correo: datosUsuario.correo,
          clave: datosUsuario.clave,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log('Usuario editado correct  amente:', data);
        handleClose();
      } else {
        console.error('Error al editar usuario:', data);
        setError(data.data.evento);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setError('Error al enviar la solicitud');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNombres">
            <Form.Label>Nombres:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa nombres"
              name="Nombres"
              value={datosUsuario.Nombres}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formApellidos">
            <Form.Label>Apellidos:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa apellidos"
              name="Apellidos"
              value={datosUsuario.Apellidos}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formIdentificacion">
            <Form.Label>Identificación:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa identificación"
              name="Identificacion"
              value={datosUsuario.Identificacion}
              onChange={handleInputChange}
              readOnly
              required
            />
          </Form.Group>
          <Form.Group controlId="formDireccion">
            <Form.Label>Dirección:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa dirección"
              name="Direccion"
              value={datosUsuario.Direccion}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formTelefono">
            <Form.Label>Teléfono:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa teléfono"
              name="Telefono"
              value={datosUsuario.Telefono}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCorreo">
            <Form.Label>Correo Electrónico:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa correo electrónico"
              name="Correo"
              value={datosUsuario.Correo}
              onChange={handleInputChange}
              readOnly
              required
            />
          </Form.Group>
          <Form.Group controlId="formClave">
            <Form.Label>Clave:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa clave"
              name="Clave"
              value={datosUsuario.Clave}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formRol">
            <Form.Label>Rol:</Form.Label>
            <Form.Control
              as="select"
              value={datosUsuario.Rol}
              onChange={handleInputChange}
              name="Rol"
              required
            >
              <option value="">Selecciona un rol</option>
              {roles.map((rol, index) => (
                <option key={index} value={rol}>
                  {rol}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>Guardar Cambios</Button>
      </Modal.Footer>
      {error && (
        <p className="text-danger mt-3">
          {error === 'La identificación ya está registrada' ? 'La identificación ya está registrada.' :
            error === 'El teléfono ya está registrado' ? 'El teléfono ya está registrado.' :
              error === 'El correo ya está registrado' ? 'El correo electrónico ya está registrado.' :
                'Ocurrió un error. Por favor, inténtalo de nuevo más tarde.'}
        </p>
      )}
    </Modal>
  );
};

EditarUsuarioModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  identificacion: PropTypes.string.isRequired,
};

export default EditarUsuarioModal;

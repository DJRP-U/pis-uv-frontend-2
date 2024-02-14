import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import mensajes from '../utilidades/Mensajes';
const EditarUsuarioModal = ({ show, handleClose, usuario }) => {
  const [datosUsuario, setDatosUsuario] = useState({
    external_id: '', // Agrega el campo external_id al estado
    nombres: '',
    apellidos: '',
    direccion: '',
    fecha_nacimiento: '',
    telefono: ''
  });
  //const navegation = useNavigate();

  useEffect(() => {
    if (usuario) {
      setDatosUsuario({
        external_id: usuario.external_id || '', // Establece external_id del usuario si está presente
        nombres: usuario.nombres || '',
        apellidos: usuario.apellidos || '',
        direccion: usuario.direccion || '',
        fecha_nacimiento: usuario.fecha_nacimiento || '',
        telefono: usuario.telefono || ''
      });
    }
  }, [usuario]);

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
      // Obtener el external_id del usuario si está disponible
      const external_id = usuario ? usuario.external_id : '';
  
      const response = await fetch('http://localhost:3006/api/personas/modificar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...datosUsuario, external: external_id }), // Incluir external_id en el cuerpo de la solicitud
      });
      const data = await response.json();
  
      if (response.ok) {
        console.log('Usuario editado correctamente:', data);
        handleClose();
        mensajes(data.msg);
        //navegation('/EditarUsuarioModal');
      } else {
        console.error('Error al editar usuario:', data);
        // Manejar el error en la interfaz de usuario, si es necesario
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      // Manejar el error en la interfaz de usuario, si es necesario
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
              name="nombres"
              value={datosUsuario.nombres}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formApellidos">
            <Form.Label>Apellidos:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa apellidos"
              name="apellidos"
              value={datosUsuario.apellidos}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDireccion">
            <Form.Label>Dirección:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa dirección"
              name="direccion"
              value={datosUsuario.direccion}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formFechaNacimiento">
            <Form.Label>Fecha de Nacimiento:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa fecha de nacimiento"
              name="fecha_nacimiento"
              value={datosUsuario.fecha_nacimiento}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formTelefono">
            <Form.Label>Teléfono:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa teléfono"
              name="telefono"
              value={datosUsuario.telefono}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          {/* Agrega un campo oculto para el external_id */}
          <input type="hidden" name="external_id" value={datosUsuario.external_id} />
          
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" type="submit">Guardar Cambios</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

EditarUsuarioModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  usuario: PropTypes.object.isRequired, // Asegúrate de definir usuario como objeto en las PropTypes
};

export default EditarUsuarioModal;


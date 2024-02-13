import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

const AgregarUsuarioModal = ({ show, handleClose }) => {
    const [usuario, setUsuario] = useState({
        apellidos: '',
        direccion: '',
        fecha_nacimiento: '',
        ocupacion: '',
        organizacion: '',
        correo: '',
        clave: ''
    });

    const roles = ['Desarrollador', 'Administrador', 'Estudiante', 'Brigadista'];
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUsuario({
            ...usuario,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3006/api/personas/guardar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombres: usuario.nombres,
                    apellidos: usuario.apellidos,
                    direccion: usuario.direccion,
                    fecha_nacimiento: usuario.fecha_nacimiento,
                    ocupacion: usuario.ocupacion,
                    organizacion: usuario.organizacion,
                    correo: usuario.correo,
                    clave: usuario.clave
                }),
            });
            const data = await response.json();

            if (response.ok) {
                console.log('Usuario registrado exitosamente:', data);
                handleClose();
            } else {
                console.error('Error al registrar usuario:', data);
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
                <Modal.Title>Agregar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formNombres">
                        <Form.Label>Apellidos:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa nombres"
                            name="nombres"
                            value={usuario.nombres}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formApellidos">
                        <Form.Label>Nombres:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa apellidos"
                            name="apellidos"
                            value={usuario.apellidos}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formDireccion">
                        <Form.Label>Direccion:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingresa su direccion"
                            name="direccion"
                            value={usuario.direccion}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formFecha_nacimiento">
                        <Form.Label>Fecha_nacimiento:</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Ingresa la fecha de nacimiento"
                            name="fecha_nacimiento"
                            value={usuario.fecha_nacimiento}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>


                    <Form.Group controlId="formOcupacion">
                        <Form.Label>Ocupación:</Form.Label>
                        <Form.Control
                            as="select"  // Utilizamos 'as="select"' para indicar que queremos un elemento select
                            name="ocupacion"
                            value={usuario.ocupacion}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled>Selecciona una ocupación</option>
                            <option value="Estudiante">Estudiante</option>
                            <option value="Desarrolllador">Desarrollador</option>
                            <option value="Profesor">Profesor</option>
                            <option value="Analista">Analista</option>
                            <option value="Gerente">Gerente</option>
                            <option value="Consultor">Consultor</option>
                            <option value="Investigador">Investigador</option>
                            <option value="personal-administrativo">Personal Administrativo</option>
                            {/* Agrega más opciones según sea necesario */}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formOrganizacion">
                        <Form.Label>Organización:</Form.Label>
                        <Form.Control
                            as="select"  // Utilizamos 'as="select"' para indicar que queremos un elemento select
                            name="organizacion"
                            value={usuario.organizacion}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled>Selecciona una organización</option>
                            <option value="Universidad">Universidad</option>
                            <option value="Empresa">Empresa</option>
                            <option value="Organización">Organización</option>
                            <option value="Asociación">Asociación</option>
                            <option value="Instituto de Investigación">Instituto de Investigación</option>
                            {/* Agrega más opciones según sea necesario */}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formCorreo">
                        <Form.Label>Usuario:</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Ingresa correo electrónico"
                            name="correo"
                            value={usuario.correo}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formClave">
                        <Form.Label>Contraseña:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Ingresa contraseña"
                            name="clave"
                            value={usuario.clave}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>



                    <Button variant="primary" type="submit">
                        Agregar Usuario
                    </Button>
                </Form>
                {error && (
                    <p className="text-danger mt-3">
                        {error === 'La identificación ya está registrada' ? 'La identificación ya está registrada.' :
                            error === 'El teléfono ya está registrado' ? 'El teléfono ya está registrado.' :
                                error === 'El correo ya está registrado' ? 'El correo electrónico ya está registrado.' :
                                    'Ocurrió un error. Por favor, inténtalo de nuevo más tarde.'}
                    </p>
                )}
            </Modal.Body>
        </Modal>
    );
};

AgregarUsuarioModal.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default AgregarUsuarioModal;
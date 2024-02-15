import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { toggleCuenta } from '../hooks/Conexion';
import EditarUsuarioModal from './EditarUsuarioModal';
import RegistrarUsuario from "./RegistrarUsuario";
 // Importar el componente de modal de creación
import PropTypes from 'prop-types';

const Persona = () => {
    const [personas, setPersonas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false); // Estado para controlar si el modal de creación de usuario está abierto o cerrado

    useEffect(() => {
        fetchPersonas();
    }, []);

    const fetchPersonas = async () => {
        try {
            const response = await fetch('http://localhost:3006/api/personas');
            const data = await response.json();
            setPersonas(data.info || []);
        } catch (error) {
            console.error('Error al obtener personas:', error);
        }
    };

    const handleEdit = (persona) => {
        setSelectedUser(persona);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const handleCreate = () => {
        setShowCreateModal(true); // Cambiado de showModal a showCreateModal
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:3006/api/personas/buscar/${searchInput}`);
            const data = await response.json();
            setSearchResult(data.info ? [data.info] : []);
            setSearchInput('');
        } catch (error) {
            console.error('Error al buscar persona:', error);
        }
    };

    return (
        <div>
            <div className='container' style={{ marginTop: '20px' }}>
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>Gestionar Usuarios</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <Form>
                            <Form.Group controlId="formSearch">
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese apellidos para buscar"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                    <div className="col-4">
                        <Button variant="primary" onClick={handleSearch}>Buscar</Button>
                    </div>
                </div>
                <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col-12 text-center">
                        <Button variant="success" onClick={handleCreate}>Crear Nuevo Usuario</Button>
                    </div>
                </div>
                <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col-12 text-center">
                        {searchResult.length > 0 ? (
                            <PersonaTable personas={searchResult} onEdit={handleEdit} />
                        ) : (
                            <PersonaTable personas={personas} onEdit={handleEdit} />
                        )}
                        <EditarUsuarioModal show={showModal} handleClose={handleCloseModal} usuario={selectedUser} />
                        {/* Condición para renderizar el modal de creación */}
                        {showCreateModal && <RegistrarUsuario show={showCreateModal} handleClose={() => setShowCreateModal(false)} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PersonaTable = ({ personas, onEdit }) => {
    const handleToggle = (persona) => {
        const data = {
            external_id: persona.cuenta.external_id
        }
        console.log(data)
        toggleCuenta(data)
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Apellidos</th>
                                <th>Nombres</th>
                                <th>Dirección</th>
                                <th>Fecha Nacimiento</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {personas.map((persona) => (
                                <tr key={persona.identificacion}>
                                    <td>{persona.apellidos || persona.Apellidos}</td>
                                    <td>{persona.nombres || persona.Nombres}</td>
                                    <td>{persona.direccion || persona.Direccion}</td>
                                    <td>{persona.fecha_nacimiento || persona.Fecha_Nacimiento}</td>
                                    <td>{persona.telefono || persona.telefono}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => onEdit(persona)}>Editar</Button>
                                        <Button variant={persona.cuenta.estado ? "danger" : "success"} onClick={() => handleToggle(persona)}>
                                            {persona.cuenta.estado ? "Deshabilitar" : "Habilitar"}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

Persona.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

PersonaTable.propTypes = {
    personas: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default Persona;






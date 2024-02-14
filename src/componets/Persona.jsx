import { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { toggleCuenta } from '../hooks/Conexion';
import AgregarUsuarioModal from './AgragarUsuarioModal';
import EditarUsuarioModal from './EditarUsuarioModal';

import PropTypes from 'prop-types'; // Importa PropTypes

const Persona = () => {
    const [personas, setPersonas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3006/api/personas')
            .then(response => response.json())
            .then(data => {
                setPersonas(data.info || []);
            })
            .catch(error => {
                console.error('Error al obtener personas:', error);
            });
    }, []);
    const handleEdit = (persona) => {
        setSelectedUserId(persona.identificacion);
        setShowModal(true);
    };

    const handleCreate = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUserId(null);
    };

    const handleSearch = () => {
        if (searchInput.trim() !== '') {
            fetch(`http://localhost:8095/api/v1/personas/obtener/identificacion/${searchInput}`)
                .then(response => response.json())
                .then(data => {
                    if (data.code === '200 OK') {
                        setSearchResult([data.data]);
                        setSearchInput('');
                    } else {
                        console.error('Error al buscar persona:', data);
                    }
                })
                .catch(error => {
                    console.error('Error al buscar persona:', error);
                });
        } else {
            fetch('http://localhost:3006/api/personas')
                .then(response => response.json())
                .then(data => {
                    setPersonas(data.data || []);
                })
                .catch(error => {
                    console.error('Error al obtener personas:', error);
                });
        }
    };

    return (
        <div>
            <div></div>
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
                                    placeholder="Ingrese identificación para buscar"
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
                        <AgregarUsuarioModal show={showModal && !selectedUserId} handleClose={handleCloseModal} />
                        {selectedUserId && <EditarUsuarioModal show={showModal} handleClose={handleCloseModal} identificacion={selectedUserId} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PersonaTable = ({ personas, onEdit }) => {
    const handleToggle = (persona) => {
        const data = {
            external_id: ((persona.cuenta).external_id)
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
                                <th>Fecha_nacimiento</th>
                                <th>Ocupacion</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {personas.map((persona) => (
                                <tr key={persona.identificacion}>
                                    <td>{persona.apellidos || persona.Apellidos}</td>
                                    <td>{persona.nombres || persona.Nombres}</td>
                                    <td>{persona.direccion || persona.Direccion}</td>
                                    <td>{persona.fecha_nacimiento || persona.Fecha_nacimiento}</td>
                                    <td>{persona.ocupacion || persona.Ocupacion}</td>
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

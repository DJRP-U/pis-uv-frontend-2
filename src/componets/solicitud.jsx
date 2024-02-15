import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { toggleCuenta } from '../hooks/Conexion';
import RegistrarUsuario from "./RegistrarUsuario";
import EditarUsuarioModal from './EditarUsuarioModal';


import PropTypes from 'prop-types'; // Importa PropTypes
import mensajes from '../utilidades/Mensajes';


const Solicitud = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3006/api/solicitudes')
            .then(response => response.json())
            .then(data => {
                setSolicitudes(data.info || []);
            })
            .catch(error => {
                console.error('Error al obtener solicitudes:', error);
                
            });
    }, []);

    const handleEdit = (solicitud) => {
        setSelectedUserId(solicitud.identificacion);
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
                    if (data.code === 200) {
                        setSearchResult(data.info ? [data.info] : []);
                        setSearchInput('');
                    } else {
                        console.error('Error al buscar solicitud:', data.msg);
                    }
                })
                .catch(error => {
                    console.error('Error al buscar solicitud:', error);
                });
        } else {
            fetch('http://localhost:8095/api/v1/personas')
                .then(response => response.json())
                .then(data => {
                    setSolicitudes(data.info || []);
                })
                .catch(error => {
                    console.error('Error al obtener solicitudes:', error)
                });
        }
    };

    const handleToggle = (solicitud) => {
        const data = {
            external_id: solicitud.external_id
        };
        console.log(data);
        AprobarSolicitud(data);
    };

    return (
        <div>
            <div className='container' style={{ marginTop: '20px' }}>
                <div className="row">
                    <div className="col-12 text-center">
                        <h1>Gestionar Solicitudes</h1>
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
                </div>
                <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col-12 text-center">
                        <SolicitudTable solicitudes={searchResult.length > 0 ? searchResult : solicitudes} onEdit={handleEdit} handleToggle={handleToggle} />
                        <RegistrarUsuario show={showModal && !selectedUserId} handleClose={handleCloseModal} />
                        {selectedUserId && <EditarUsuarioModal show={showModal} handleClose={handleCloseModal} identificacion={selectedUserId} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SolicitudTable = ({ solicitudes, onEdit, handleToggle }) => {
    return (
        <Container>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Correo</th>
                                <th>Teléfono</th>
                                <th>Fecha de Nacimiento</th>
                                <th>Ocupación</th>
                                <th>Organización</th>
                                <th>Dirección</th>
                                <th>External_id</th>
                                <th>Estado</th>         
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {solicitudes.map((solicitud) => (
                                <tr key={solicitud.identificacion}>
                                    <td>{solicitud.nombres}</td>
                                    <td>{solicitud.apellidos}</td>
                                    <td>{solicitud.correo}</td>
                                    <td>{solicitud.telefono}</td>
                                    <td>{solicitud.fecha_nacimiento}</td>
                                    <td>{solicitud.ocupacion}</td>
                                    <td>{solicitud.organizacion}</td>
                                    <td>{solicitud.direccion}</td>
                                    <td>{solicitud.external_id}</td>
                                    <td>{solicitud.ESTADO}</td>
                                    <td>
                                        <Button variant={solicitud.ESTADO === 'ESPERA' ? "danger" : "success"} onClick={() => handleToggle(solicitud)}>
                                            {solicitud.ESTADO === 'ESPERA' ? "Aceptar" : "Habilitar"}
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

SolicitudTable.propTypes = {
    solicitudes: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    handleToggle: PropTypes.func.isRequired,
};

export default Solicitud;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Style/style.css';
import { Link } from 'react-router-dom';
import Mapa from './Mapa/Mapa';

function ListarDispositivos() {
    const [dispositivos, setDispositivos] = useState([]);

    useEffect(() => {
        const cargarDispositivos = async () => {
            try {
                const response = await fetch('https://computacion.unl.edu.ec/uv/api/listar');
                if (!response.ok) {
                    throw new Error('Error al obtener los dispositivos');
                }
                const data = await response.json();
                setDispositivos(data.dispositivos);
            } catch (error) {
                console.error(error);
            }
        };

        cargarDispositivos();
    }, []);

    return (
        <div className="container">
            <h1 style={{ textAlign: "center" }}>DISPOSITIVOS</h1>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Buscar dispositivo" aria-describedby="button-addon2" />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2">Buscar</button>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-sm-10">
                    <table className="table table-sm table-bordered text-center">
                        <thead className="table-active">
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Latitud</th>
                                <th scope="col">Longitud</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dispositivos.map((dispositivo, index) => (
                                <tr key={index}>
                                    <th scope="row">{dispositivo.nombre}</th>
                                    <td>{dispositivo.latitud}</td>
                                    <td>{dispositivo.longitud}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='container-fluid d-flex justify-content-center align-items-center h-100'>
                <div className='col-8 d-flex flex-column h-100'>
                    <Mapa />
                </div>
            </div>
        </div>
    );
}

export default ListarDispositivos;

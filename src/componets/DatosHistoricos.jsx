import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TablaDatosHistorico from './TablaDatosHistorico';
import * as XLSX from 'xlsx';

const DatosHistoricos = () => {
    const pageSize = 10;
    const maxPagesToShow = 10;

    const [currentPage, setCurrentPage] = useState(1);
    const [historicalData, setHistoricalData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3006/api/disp'); // Updated API endpoint
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }
                const jsonData = await response.json();
                const retrievedData = jsonData.info
                    .filter(dato => dato.uv !== "0") // Filtrar los datos con valor de UV diferente de 0
                    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Ordenar en orden descendente
                setHistoricalData(retrievedData);
                setTotalPages(Math.ceil(retrievedData.length / pageSize));
            } catch (error) {
                console.error('Error:', error);
                // Manejar el error
            }
        };
        fetchData();
    }, []);

    const startIndex = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endIndex = Math.min(totalPages, startIndex + maxPagesToShow - 1);

    const currentData = historicalData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const exportToExcel = async () => {
        try {
            const response = await fetch('http://localhost:3006/api/disp');
            if (!response.ok) {
                throw new Error('Error al obtener los datos para exportar');
            }
            const jsonData = await response.json();
            const worksheet = XLSX.utils.json_to_sheet(jsonData.info);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos Históricos');
            XLSX.writeFile(workbook, 'datos_historicos.xlsx');
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className="mt-5">
            <div className='row'>
                <div className='col-4'>
                    <h1 className="text-center mb-4">Datos Históricos</h1>
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Fecha / Hora</th>
                                
                                <th scope="col">UV</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((dato, index) => (
                                <tr key={index}>
                                    <td>{new Date(dato.fecha).toISOString().replace(/T/, ' ').replace(/\..+/, '')}</td>
                                    
                                    <td>{dato.uv}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>Anterior</a>
                            </li>
                            {Array.from({ length: endIndex - startIndex + 1 }, (_, index) => (
                                <li key={startIndex + index} className={`page-item ${currentPage === startIndex + index ? 'active' : ''}`}>
                                    <a className="page-link" href="#" onClick={() => handlePageChange(startIndex + index)}>{startIndex + index}</a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>Siguiente</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className='col-7'>
                    <h2>Datos últimas 24 horas</h2>
                    <div className='col-12' style={{ border: '1px solid black', height: '63vh', width: '120vh', justifyContent: 'center', alignItems: 'center' }}>
                        <TablaDatosHistorico />
                    </div>
                    <div className='container' style={{ marginTop: '20px' }}>
                        <button className="btn btn-primary" onClick={exportToExcel}>Exportar Datos</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatosHistoricos;

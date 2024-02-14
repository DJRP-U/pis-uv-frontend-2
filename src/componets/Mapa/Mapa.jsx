import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './mapa.css';

function MapaComponent() {
    const [pointsWithDescriptions, setPointsWithDescriptions] = useState([]);

    useEffect(() => {
        const cargarDispositivos = async () => {
            try {
                const response = await fetch('http://localhost:3006/api/listarDips');
                if (!response.ok) {
                    throw new Error('Error al obtener los dispositivos');
                }
                const data = await response.json();
                setPointsWithDescriptions(data.info.map(dispositivo => ({
                    position: [dispositivo.latitud, dispositivo.longitud],
                    nombre: dispositivo.nombre,
                })));
            } catch (error) {
                console.error(error);
            }
        };

        cargarDispositivos();
    }, []);

    return (
        <MapContainer center={[-4.033788501660946, -79.20193874829619]} zoom={14} className='mapa'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pointsWithDescriptions.map(({ position, nombre }, index) => (
                <Marker key={index} position={position}>
                    <Popup>
                        Nombre: {nombre} <br />
                        Coordenadas: {position[0]}, {position[1]}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default MapaComponent;

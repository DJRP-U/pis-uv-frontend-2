import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

const Peticiones = () => {
    const [getData1, setGetData1] = useState(null);
    const [getData2, setGetData2] = useState(null);
    const [getData3, setGetData3] = useState(null);
    const [getData4, setGetData4] = useState(null);
    const [getData5, setGetData5] = useState(null);
    const [getData6, setGetData6] = useState(null);


    const [postData1, setPostData1] = useState(null);
    const [postData2, setPostData2] = useState(null);
    const [postData3, setPostData3] = useState(null);
    const [postData4, setPostData4] = useState(null);

    //PETICIONES GET
    //token del backend
    useEffect(() => {
        fetch('https://computacion.unl.edu.ec/uv/api/tokenBackend')
            .then(response => response.json())
            .then(data => setGetData1(data))
            .catch(error => console.error('Error en la petición GET 1:', error));
    }, []);
    //token del dispositivo
    useEffect(() => {
        fetch('https://computacion.unl.edu.ec/uv/api/tokenDispositivo')
            .then(response => response.json())
            .then(data => setGetData2(data))
            .catch(error => console.error('Error en la petición GET 2:', error));
    }, []);

    //Medicion promedio

    useEffect(() => {
        fetch('https://computacion.unl.edu.ec/uv/api/medicionPromedio')
            .then(response => response.json())
            .then(data => setGetData3(data))
            .catch(error => console.error('Error en la petición GET 3:', error));
    }, []);

    //Medicion individual    

    useEffect(() => {
        fetch('https://computacion.unl.edu.ec/uv/api/medicionDispositivos')
            .then(response => response.json())
            .then(data => setGetData4(data))
            .catch(error => console.error('Error en la petición GET 4:', error));
    }, []);

    //Listar dispositivos activos

    useEffect(() => {
        fetch('https://computacion.unl.edu.ec/uv/api/activos')
            .then(response => response.json())
            .then(data => setGetData5(data))
            .catch(error => console.error('Error en la petición GET 5:', error));
    }, []);

    //Listar dispositivos registrados

    useEffect(() => {
        fetch('https://computacion.unl.edu.ec/uv/api/listar')
            .then(response => response.json())
            .then(data => setGetData6(data))
            .catch(error => console.error('Error en la petición GET 6:', error));
    }, []);

    //PETICIONES POST
    //Promedio por fechas

    useEffect(() => {
        // Reemplaza 'TU_TOKEN' con el token real que tengas
        const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJCQUNLRU5EIiwiaWF0IjoxNzA2NTQ0NTk1fQ.Jv6137GrySPrlzq-37V1OQ0kKOB9-BTWcFqNWCzXxP8';

        fetch('https://computacion.unl.edu.ec/uv/api/medicionFechas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-token': apiToken
            },
            body: JSON.stringify({
                "fechaInicio": "2024-01-28",
                "fechaFin": "2024-01-29"
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta de la petición POST:', data);
                setPostData1(data);
            })
            .catch(error => console.error('Error en la petición POST:', error));
    }, []);

    //Promedio por semanas

    useEffect(() => {
        // Reemplaza 'TU_TOKEN' con el token real que tengas
        const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJCQUNLRU5EIiwiaWF0IjoxNzA2NDI1NzY4fQ.jZo9_Apzo1aMcYFBxhG4j7wkv67ejmQ3lKN778TNbPQ';

        fetch('https://computacion.unl.edu.ec/uv/api/medicionSemana', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-token': apiToken
            },
            body: JSON.stringify({
                "fechaInicio": "2024-01-01",
                "fechaFin": "2024-02-01"
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta de la petición POST:', data);
                setPostData2(data);
            })
            .catch(error => console.error('Error en la petición POST:', error));
    }, []);

    //Promedio por dia

    useEffect(() => {
        // Reemplaza 'TU_TOKEN' con el token real que tengas
        const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJCQUNLRU5EIiwiaWF0IjoxNzA2NDI1NzY4fQ.jZo9_Apzo1aMcYFBxhG4j7wkv67ejmQ3lKN778TNbPQ';

        fetch('https://computacion.unl.edu.ec/uv/api/medicionSemana', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-token': apiToken
            },
            body: JSON.stringify({
                "fechaInicio": "2024-01-01",
                "fechaFin": "2024-02-01"
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta de la petición POST:', data);
                setPostData3(data);
            })
            .catch(error => console.error('Error en la petición POST:', error));
    }, []);

    //Guardar Dispositivo

    useEffect(() => {
        // Reemplaza 'TU_TOKEN' con el token real que tengas
        const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJESVNQT1NJVElWTyIsImlhdCI6MTcwNjQyNTQ4N30.Vr2qAd1h8DAWjx56PKrmbS46DWZCvk8wen_gRTEj4po';

        fetch('https://computacion.unl.edu.ec/uv/api/dispositivo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-token': apiToken
            },
            body: JSON.stringify({
                "identificador": 2,
                "nombre": "Facultad salud humana",
                "latitud": 75.4,
                "longitud": 85.6,
                "ip": "192.168.1.24"
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta de la petición POST:', data);
                setPostData4(data);
            })
            .catch(error => console.error('Error en la petición POST:', error));
    }, []);

    const renderCard = (data, title, alignRight) => (
        <Card style={{ width: '60rem', margin: '1rem', marginLeft: alignRight ? 'auto' : '0', marginRight: alignRight ? '0' : 'auto' }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {data ? (
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    ) : (
                        <p>Cargando...</p>
                    )}
                </Card.Text>
            </Card.Body>
        </Card>
    );

    return (
        <div style={{ margin: '100px', display: 'flex', flexDirection: 'row' }}>
            <div>
                <h2>Token para el backend</h2>
                {renderCard(getData1, 'GET Request 1')}

                <h2>Token para el dispositivo</h2>
                {renderCard(getData2, 'GET Request 2')}

                <h2>Medición promedio</h2>
                {renderCard(getData3, 'GET Request 3')}

                <h2>Medición individual</h2>
                {renderCard(getData4, 'GET Request 4')}

                <h2>Listar dispositivos activos</h2>
                {renderCard(getData5, 'GET Request 5')}

                <h2>Listar dispositivos registrados</h2>
                {renderCard(getData6, 'GET Request 6')}
            </div>


            <div style={{ marginLeft: 'auto' }}>
                <h2>Promedio por fechas</h2>
                {renderCard(postData1, 'POST Request 1', true)}

                <h2>Promedio por semana</h2>
                {renderCard(postData2, 'POST Request 2', true)}

                <h2>Promedio por día</h2>
                {renderCard(postData3, 'POST Request 3', true)}

                <h2>Guardar dispositivo</h2>
                {renderCard(postData4, 'POST Request 4', true)}
            </div>
        </div>
    );
};

export default Peticiones;

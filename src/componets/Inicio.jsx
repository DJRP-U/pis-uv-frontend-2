import { useState, useEffect } from 'react';
import Mapa from './Mapa/Mapa';
import '../Style/style.css';
import TablaDatosHistorico from './TablaDatosHistorico';

const Inicio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [datosHistoricos, setDatosHistoricos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3006/api/disp');
        const data = await response.json();
        if (data.info) {
          setDatosHistoricos(data.info);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex < datosHistoricos.length - 1 ? prevIndex + 1 : 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentIndex, datosHistoricos.length]); // Agregamos datosHistoricos.length como dependencia

  const getRiskLevel = (value) => {
    if (value >= 0 && value <= 2) {
      return 'Bajo';
    } else if (value > 2 && value <= 5) {
      return 'Moderado';
    } else if (value > 5 && value < 8) {
      return 'Alto';
    } else if (value >= 8 && value <= 11) {
      return 'Muy Alto';
    } else if (value > 11) {
      return 'Extremo';
    } else {
      return 'Error o No se encontro dato';
    }
  };

  const getColor = (riskLevel) => {
    switch (riskLevel) {
      case 'Bajo':
        return '#4CAF50'; // Verde
      case 'Moderado':
        return '#FFEB3B'; // Amarillo
      case 'Alto':
        return '#FF9800'; // Naranja
      case 'Muy Alto':
        return '#ff0000'; // Rojo
      case 'Extremo':
        return '#9C27B0'; // Púrpura
      case 'Negro':
        return '#000'; // Negro
      default:
        return '#000'; // Negro (en caso de error)
    }
  };

  const getRecommendations = (riskLevel) => {
    switch (riskLevel) {
      case 'Bajo':
        return [
          'Usar gafas de sol en días soleados.',
          'Aplicar protector solar si se va a pasar mucho tiempo al aire libre.'
        ];
      case 'Moderado':
        return [
          'Usar protección solar, como crema con un factor de protección adecuado.',
          'Buscar sombra durante las horas de mayor intensidad solar (generalmente de 10 a.m. a 4 p.m.).'
        ];
      case 'Alto':
        return [
          'Utilizar protector solar de amplio espectro con SPF 30 o superior.',
          'Evitar la exposición directa al sol durante las horas de mayor intensidad.'
        ];
      case 'Muy Alto':
        return [
          'Evitar la exposición al sol durante las horas centrales del día.',
          'Usar ropa que cubra la piel y sombrero de ala ancha.',
          'Aplicar protector solar cada 2 horas, especialmente después de nadar o sudar.'
        ];
      case 'Extremo':
        return [
          'Evitar salir al aire libre si es posible, especialmente durante el mediodía.',
          'Buscar sombra y usar ropa de protección solar.',
          'Aplicar protector solar con frecuencia y en abundancia.'
        ];
      default:
        return [];
    }
  };

  const riskLevel = datosHistoricos.length > 0 ? getRiskLevel(datosHistoricos[datosHistoricos.length - 1].uv) : '';
  const color = getColor(riskLevel);
  const recommendations = getRecommendations(riskLevel);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Semáforo de radiación UV</h1>
      <div className='' style={{ padding: '10px' }}>
        <div className='imagen-responsiva col-8 '>
          <div className='row'>
            <div className='col-4'>
              <div className='col-12'>
                <h3 style={{ textAlign: 'center' }}>Nivel de Riesgo UV</h3>
              </div>
              <div style={{ padding: '5px' }}>
                <div className='container' style={{ backgroundColor: color, border: '5px solid black', height: '20vh', width: '20vw', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ whiteSpace: 'pre-line' }}>
                    <h1 style={{ textAlign: 'center', fontSize: '5em' }}>{datosHistoricos.length > 0 ? datosHistoricos[datosHistoricos.length - 1].uv : ''}</h1>
                  </div>
                  <div style={{ whiteSpace: 'pre-line' }}>
                    <h2 style={{ textAlign: 'center' }}>{riskLevel}</h2>
                  </div>
                </div>
              </div>
              <div style={{ padding: '5px' }}>
                <div className='container' style={{ backgroundColor: color, border: '5px solid black', height: '32vh', width: '20vw', justifyContent: 'center', alignItems: 'center' }}>
                <h3 style={{ textAlign: 'center' }}>Recomendaciones</h3>
                <ul style={{ fontSize: '1.3em' }}>
                    {recommendations.map((recommendation, index) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-8'>
              <h2 style={{ textAlign: 'center' }}>Ubicación de sensores UV</h2>
              <div className='col-12' style={{ border: '5px solid black', height: '51vh', width: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Mapa />
              </div>
            </div>
            <div className='col-2' >

            </div>
            <div className='col-10' >
            <h2>Datos de radiación ultimas 24 horas</h2>
              <div className='col-12' style={{ border: '5px solid black', height: '63vh', width: '120vh', justifyContent: 'center', alignItems: 'center' }}>
                <TablaDatosHistorico datos={datosHistoricos} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
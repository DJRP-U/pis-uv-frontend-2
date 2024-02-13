import { useState, useEffect } from 'react';
import { RadialGauge } from '@progress/kendo-react-gauges';
import Mapa from './Mapa/Mapa'

const IndicadorUV = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setValue(Math.random() * 14);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getRiskLevel = (value) => {
    if (value >= 0 && value <= 2) {
      return 'Bajo';
    } else if (value > 2 && value <= 5) {
      return 'Moderado';
    } else if (value > 5 && value <= 7) {
      return 'Alto';
    } else if (value > 7 && value <= 10) {
      return 'Muy Alto';
    } else if (value > 10 && value <= 14) {
      return 'Extremadamente Alto';
    } else {
      return 'Negro';
    }
  };

  const interpolateColor = (color1, color2, position) => {
    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.slice(1), 16);
      return [((bigint >> 16) & 255), ((bigint >> 8) & 255), (bigint & 255)];
    };

    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const result = rgb1.map((channel, i) => {
      return Math.round(channel + position * (rgb2[i] - channel));
    });

    return `rgb(${result.join(',')})`;
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
        return '#FF5722'; // Rojo
      case 'Extremadamente Alto':
        return '#9C27B0'; // Púrpura
      case 'Negro':
        return '#000'; // Negro
      default:
        return '#000'; // Negro (en caso de error)
    }
  };

  const radialOptions = {
    value: value,
    scale: {
      minorUnit: 1,
      majorUnit: 2,
      max: 14,
      labels: {
        position: 'outside',
        color: 'black',
      },
      ranges: [
        { from: 0, to: 2, color: getColor('Bajo') },
        { from: 2, to: 3, color: interpolateColor(getColor('Bajo'), getColor('Moderado'), 0.5) },
        { from: 3, to: 5, color: getColor('Moderado') },
        { from: 5, to: 6, color: interpolateColor(getColor('Moderado'), getColor('Alto'), 0.5) },
        { from: 6, to: 7, color: getColor('Alto') },
        { from: 7, to: 8, color: interpolateColor(getColor('Alto'), getColor('Muy Alto'), 0.5) },
        { from: 8, to: 10, color: getColor('Muy Alto') },
        { from: 10, to: 11, color: interpolateColor(getColor('Muy Alto'), getColor('Extremadamente Alto'), 0.5) },
        { from: 11, to: 14, color: getColor('Extremadamente Alto') },
      ],
    },
  };

  const riskLevel = getRiskLevel(value);
  const color = getColor(riskLevel);

  return (
    <div className='container' style={{padding: '10px'}}>
      <div style={{padding: '10px'}}>
        <div style={{ whiteSpace: 'pre-line' }}>
          <h1 style={{ textAlign: 'center' }} > Semaforo de radiacion UV </h1>
        </div>
        <div className='container' style={{ backgroundColor: color, border: '5px solid black', height: '25vh', width: '25vw' }} >
          {/* <RadialGauge {...radialOptions} */}
          <div style={{ whiteSpace: 'pre-line' }}>
            <h4 style={{ textAlign: 'center' }}>Nivel de Riesgo UV </h4>
          </div>
          <div style={{ whiteSpace: 'pre-line' }}>
            <h3 style={{ textAlign: 'center' }}>{riskLevel}</h3>
          </div>
          <div style={{ whiteSpace: 'pre-line' }}>
            <h1 style={{ textAlign: 'center' }}>{value.toFixed(2)}</h1>
          </div>

        </div>
      </div>
      <div style={{border: '2px solid black', height: '51vh', width: '51vw',justifyContent: 'center', alignItems: 'center'}} >

        <Mapa />

      </div>

    </div>
  );
};

export default IndicadorUV;

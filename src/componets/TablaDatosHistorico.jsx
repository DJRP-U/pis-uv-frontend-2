import { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';

const TablaDatosHistorico = () => {
  const [datosHistoricos, setDatosHistoricos] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:3006/api/disp');
        const data = await response.json();
        setDatosHistoricos(data.info);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (datosHistoricos.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      const datos = obtenerDatos(datosHistoricos);
      const colores = obtenerColores(datos);

      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: datos.map(data => data.fecha), // Use timestamps as labels
          datasets: [{
            label: 'Valor de UV',
            data: datos.map(data => parseFloat(data.uv)), // Use UV values as data
            backgroundColor: colores,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true, // Ensure chart is responsive
          maintainAspectRatio: false, // Allow chart to occupy all available space
          scales: {
            x: {
              type: 'category',
              offset: true,
              grid: {
                display: false
              },
              ticks: {
                maxRotation: 0,
                autoSkip: true,
                maxTicksLimit: 24 // Mostrar solo 24 etiquetas para las últimas 24 horas
              }
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });

      return () => {
        myChart.destroy();
      };
    }
  }, [datosHistoricos]);

  const obtenerDatos = (datos) => {
    const fechaActual = new Date(); // Fecha actual
    const fechaAyer = new Date(fechaActual); // Fecha de ayer
    fechaAyer.setDate(fechaActual.getDate() - 1); // Resta un día para obtener la fecha de ayer

    // Filtrar los datos del día anterior hasta la fecha actual
    const datosFiltrados = datos.filter(data => {
      const fechaData = new Date(data.fecha);
      return fechaData >= fechaAyer && fechaData <= fechaActual;
    });

    return datosFiltrados;
  };

  const obtenerColores = (datos) => {
    return datos.map(data => {
      const uv = parseFloat(data.uv);
      // Definir los colores según el valor de UV
      if (uv >= 0 && uv <= 2) {
        return 'rgba(0, 128, 0, 0.5)'; // Verde
      } else if (uv > 2 && uv <= 5) {
        return 'rgba(255, 255, 0, 0.5)'; // Amarillo
      } else if (uv > 5 && uv <= 7) {
        return 'rgba(255, 165, 0, 0.5)'; // Naranja
      } else if (uv > 7 && uv <= 10) {
        return 'rgba(255, 0, 0, 0.5)'; // Rojo
      } else if (uv > 10) {
        return 'rgba(238, 130, 238, 0.5)'; // Violeta
      } else {
        return 'rgba(0, 0, 0, 0.5)'; // Valor inválido
      }
    });
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
    </div>
  );
};

export default TablaDatosHistorico;
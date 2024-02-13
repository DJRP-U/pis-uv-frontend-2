import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el archivo CSS de Bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faChartLine, faUsers } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ff6b6b' }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-end">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{ color: 'white' }}>Inicio</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#" style={{ color: 'white' }}>Usuarios</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" style={{ color: 'white' }}>Sensores</a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn btn-light" href="#" role="button">Cerrar Sesión</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Título */}
      <h1 className="bg-danger text-white p-3 text-center">Semáforo de radiación UV</h1>

      {/* Contenido de la página */}
      <div className="p-5 flex-grow-1 text-center">
        <p className="lead">
          El sistema de semáforo de radiación UV desarrollado con tecnología Arduino tiene como objetivo principal monitorizar en tiempo real las condiciones ambientales, en particular la radiación UV.
        </p>

        {/* Sección de Servicios */}
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="bg-info text-white p-4 rounded">
              <FontAwesomeIcon icon={faChartLine} size="3x" className="mb-3" />
              <h3>Servicio de Monitoreo</h3>
              <p>Monitorizamos en tiempo real las condiciones de radiación UV utilizando tecnología de punta.</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="bg-success text-white p-4 rounded">
              <FontAwesomeIcon icon={faUsers} size="3x" className="mb-3" />
              <h3>Interfaz Amigable</h3>
              <p>Diseñamos una interfaz fácil de usar para que los usuarios visualicen claramente los datos.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Redes Sociales */}
      <div className="bg-danger text-white p-3 text-center">
        <p className="h4 mb-4">Síguenos en redes sociales:</p>
        <div>
          <a href="#" className="text-white me-2"><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
          <a href="#" className="text-white me-2"><FontAwesomeIcon icon={faTwitter} size="2x" /></a>
          <a href="#" className="text-white"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
        </div>
      </div>

      {/* Footer con botón "Contáctanos" */}
      <footer className="bg-dark text-white p-4 mt-auto text-center">
        <hr style={{ borderTop: '1px solid white' }} />
        <div>
          <p className="mb-0">Universidad Nacional de Loja</p>
          <a href="#" className="btn btn-light mt-3">Contáctanos</a>
        </div>
      </footer>
    </div>
  );
};

export default Menu;

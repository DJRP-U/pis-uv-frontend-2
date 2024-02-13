import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Style/style.css';
import { Link } from 'react-router-dom';

function RegistrarDispositivos() {
   
    return (

        <div className="wrapper" >
          <center>
            <div className="d-flex flex-column" style={{ width: 700 }}>
    
              <h1 style={{ textAlign: "center", fontSize: "1.5em" }}>Registrar Dispositivo</h1>
    
              <div className='container-fluid' style={{ border: '4px solid #ccc', padding: '20px', borderRadius: '10px', maxWidth: '1000px', margin: 'auto' }}>
    
                <div className="container-fluid" >
    
                  <img className="card" src="/img/user.png" style={{ width: 90, height: 90 }} />
                </div>
                <br />
                <form className="user" >
    
                  {/*Ingresar nombre y apellido*/}
                  <div className="row mb-4">
                    <div className="col">
                      <input name="nombres" id="nombres" className={`form-control `} placeholder='Ingrese la latitud' />
                      <div className='alert alert-danger invalid-feedback'></div>
                    </div>
                    <div className="col">
                      <input  name="apellidos" id="apellidos" className={`form-control '}`} placeholder='Ingrese la longitud' />
                      <div className='alert alert-danger invalid-feedback'></div>
                    </div>
                  </div>
                  <Link href="/usuarios" className="btn btn-danger" style={{ flex: '1', marginRight: '4px' }}>
                    Cancelar
                  </Link>
    
                  <button type='submit' className="btn btn-success" style={{ flex: '1', marginLeft: '4px' }}>
                    Guardar
                  </button>
    
                </form>
    
              </div>
            </div>
          </center>
          <br />
        </div>
    
      );
}

export default RegistrarDispositivos;
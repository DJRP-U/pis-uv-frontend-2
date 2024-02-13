//import Mapa from './componets/Mapa/Mapa'
import 'bootstrap/dist/css/bootstrap.min.css';
import Mapa from './Mapa/Mapa'
import '../Style/style.css';
import Nav from './Nav';

function GestionarDisositivos() {

    return (
        <div className='pantalla_completa'>
            <div className='.container-fluid col-12'>
            <Nav/>
            </div>
            <div className='.container-fluid col-12'>
                <div className='col-12 d-flex flex-column h-100'>
                    <div className="btn-group-vertical col-12" role="group" aria-label="Vertical button group">

                        <button type="button" className="btn btn-primary">Agregar nuevo dispositivo</button>
                        <button type="button" className="btn btn-primary">Modificar Dispositivo</button>
                        <button type="button" className="btn btn-primary">Elminar Dispositivo</button>
                        <button type="button" className="btn btn-primary">Mostar Lista de Dispositivo</button>
                    </div>
                </div>
                <div className='col-8 d-flex flex-column h-100'>
                    <div className=''>
                        <Mapa />
                    </div>


                </div>
            </div>
        </div>
    )
}

export default GestionarDisositivos
// <Mapa/>
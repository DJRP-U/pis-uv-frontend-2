import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { InicioSesion } from '../hooks/Conexion';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import mensajes from '../utilidades/Mensajes';
import { saveToken, saveValor } from '../utilidades/Sessionutil';
import AgregarUsuarioModal from './AgragarUsuarioModal';
const Login = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navegation = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        var datos = {
            "correo": data.correo,
            "clave": data.clave,
        };
        console.log(datos);
        InicioSesion(datos).then((info) => {

            if (info.code !== 200) {
                console.log(info.code)
                console.log("Entro a !== 200")
                mensajes(info.msg, 'error', 'Error');
            } else {
                if (info.token) {
                    console.log(info)
                    saveToken(info.token, info.rol);
                    saveValor('nombre', info.user);
                    saveValor('external', info.external);
                    saveValor('identificacion', info.iden);
                    console.log(info.token);
                    mensajes(info.msg);
                    navegation('/principal');
                } else {
                    mensajes(info.msg, 'error', 'Error');
                }

            }
        }
        );

        handleClose();
    };

    return (
        <div className='container' style={{ marginTop: '40px' }}>

        <div className="background-container" style={{ backgroundImage: 'url("<img src="/src/assets/unl.png" />")', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>

    <div className="text-center mt-8">
        <div className="p-0 d-inline-block">
            <div className="card" style={{ backgroundColor: 'rgba(193, 187, 185, 0.8)', color: '#C1BBB9' }}>
                <div className="card-body">
                    <div className="animation-area">
                        <div className="contenedor_completo">
                            <div className="wrapper fadeInDown">
                                <div id="formContent">
                                    <div className="fadeIn first">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/df/UNL3.png" id="icon" alt="User Icon" ></img>
                                    </div>
                                    <br />
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                id="correo"
                                                className="form-control fadeIn second"
                                                name="correo"
                                                placeholder="Ingrese su correo"
                                                {...register('correo', { required: true, pattern: /^\S+@\S+$/i })}
                                            />
                                            {errors.correo && errors.correo.type === 'required' &&
                                                <div className='alert alert-danger'>Por favor, ingrese el correo</div>}
                                            {errors.correo && errors.correo.type === 'pattern' &&
                                                <div className='alert alert-danger'>Ingrese un correo válido</div>}

                                            <br />

                                            <input
                                                type="password"
                                                id="clave"
                                                className="form-control fadeIn third"
                                                name="clave"
                                                placeholder="Ingrese su contraseña"
                                                {...register('clave', { required: true })}
                                            />
                                            {errors.clave && errors.clave.type === 'required' &&
                                                <div className='alert alert-danger'>Por favor, ingrese una contraseña</div>}
                                            <br />
                                            <button type="submit" className="btn btn-primary btn-lg" style={{ background: '#162b4e' }}>Iniciar Sesión </button>
                                            <br/>
                                            <br />
                                            <br />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>



    );
}

export default Login;

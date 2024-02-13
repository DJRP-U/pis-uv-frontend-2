export const saveToken = (token, rol) => {
    localStorage.setItem("token", token);
    localStorage.setItem("rol", rol);
}
 
export const getToken = () => {
    return localStorage.getItem('token');
}

export const getRol = () => {
    return localStorage.getItem('rol');
}

export const borrarSesion=()=>{
    localStorage.clear();
}

export const estaSesion =()=>{
    var token = localStorage.getItem('token');
    return (token && (token != 'undefined' || token!=null || token!='null'));
}

export const soloAdmin =()=>{
    var token = localStorage.getItem('token');
    var rol = atob(localStorage.getItem('rol'));
    return (token && (token != 'undefined' || token!=null || token!='null')&& rol=='admin');
}
export const soloProfesor =()=>{
    var token = localStorage.getItem('token');
    var rol = atob(localStorage.getItem('rol'));
    return (token && (token != 'undefined' || token!=null || token!='null')&& rol=='profesor');
}

export const saveValor = (clave, valor) => {
    localStorage.setItem(clave, valor);
}

export const getValor = (clave) => {
    return localStorage.getItem(clave);
    
}
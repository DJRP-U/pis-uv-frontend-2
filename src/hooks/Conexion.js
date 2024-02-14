import mensajes from "../utilidades/Mensajes";

const URL = "http://localhost:3006/api"
export const URLex =  URL + "/document/";

export const CalificarEntregable = async (data, key) => {
    const headers = {
        "x-api-token": key,
        "Content-Type": "application/json", 
    };
    const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(URL +'/entregable/calificar',requestOptions);
        const datos = await response.json();
        return datos;
    } catch (error) {
        console.log("Error:", error);
        // Manejo de errores
        throw error;
    }
};
export const ObtenerCobsola = async (data, key) => {
    var cabecera = {
        "x-api-token": key,
        "Content-Type": "application/json",
    }
    const datos = await (await fetch(URL+'/codigos/' + data,  {
        method: "GET",
        headers: cabecera
    })).json();
  //  console.log((datos.info));
    return datos;
}   

export const InicioSesion = async (data) => {
    var cabeceras = { 
        "Accept": 'application/json',
        "Content-Type": 'application/json'
     };
    const datos = await (await fetch(URL + "/sesion", {
        method: "POST",
        headers: cabeceras,
        body: JSON.stringify(data)
    })).json();
    console.log(datos+"  "+JSON.stringify(data));
    return datos;
};

export const GuardarPersona = async (key, data) => {
    const headers = {
        "Content-Type": "application/json",
        "x-api-token": key
    };
    const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(URL +'/personas/guardar', requestOptions);
        const datos = await response.json();
        return datos;
    } catch (error) {
        console.log("Error:", error);
        throw error;
    }
};

export const ListarRoles = async ()=>{
    var cabecera = {
        "Content-Type": "application/json",
    }
    const datos = await (await fetch(URL + "/rol/listar", {
        method: "GET",
        headers: cabecera
    })).json();
    return datos;
}

export const toggleCuenta = async (data) => {

    var cabeceras = { 
        "Accept": 'application/json',
        "Content-Type": 'application/json'
     };
    const datos = await (await fetch(URL + "/cuenta/toggle", {
        method: "POST",
        headers: cabeceras,
        body: JSON.stringify(data)
    })).json();

    if (datos.code == 500) {
        mensajes("ERROR","warning","Error del servidor")
    }


    console.log(datos+"  "+JSON.stringify(data));
    return datos;
}

export const AprobarSolicitud = async (data) => {

    var cabeceras = { 
        "Accept": 'application/json',
        "Content-Type": 'application/json'
     };
    const datos = await (await fetch(URL + "/solicitudes/aceptar", {
        method: "POST",
        headers: cabeceras,
        body: JSON.stringify(data)
    })).json();
    console.log(datos+"  "+JSON.stringify(data));
    if (datos.code == 500) {
        mensajes(datos.msg,"warning","Error del servidor");
    }
    return datos;
}


export const Personas = async (key) => {

    var cabecera = {
        
        "x-api-token": key
    }
    const datos = await (await fetch(URL + "/personas", {
        method: "GET",
        headers: cabecera
    })).json();
    return datos;

}

export const ObtenerPersona = async (external) => {
    
    const datos = await (await fetch(URL + "/personas/obtener/"+external, {
        method: "GET",
    })).json();
    return datos;

}

export const Cuentas = async (key) => {

    var cabecera = {

        "x-api-token": key
    }
    const datos = await (await fetch(URL + "/cuenta", {
        method: "GET",
        headers: cabecera
    })).json();
    return datos;

}

export const Cursa = async (key) => {

    var cabecera = {

        "x-api-token": key
    }
    const datos = await (await fetch(URL + "/cursa", {
        method: "GET",
        headers: cabecera
    })).json();
    return datos;

}

export const Funciones = async (key) => {

    var cabecera = {

        "x-api-token": key
    }
    const datos = await (await fetch(URL + "/funcion", {
        method: "GET",
        headers: cabecera
    })).json();
    return datos;

}

export const Grupos = async (key) => {

    var cabecera = {

        "x-api-token": key
    }
    const datos = await (await fetch(URL + "/grupo", {
        method: "GET",
        headers: cabecera
    })).json();
    return datos;

}

//Materias
export const Materias = async (key) => {
    const cabeceras = {        
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URL + "/materia/listar", {
        method: "GET",
        headers: cabeceras
    })).json();    
    return datos;
}
export const Matriculas = async (key) => {
    const cabeceras = {        
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URL + "/materia/listar", {
        method: "GET",
        headers: cabeceras
    })).json();    
    return datos;
}
export const PersonasSinMatricula = async (key) => {
    const cabeceras = {        
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URL + "/persons/obtener/nomatriculado", {
        method: "GET",
        headers: cabeceras
    })).json();    
    return datos;
}

export const GuardarMaterias = async (data, key) => {
    const headers = {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(URL + "/materia/guardar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    return datos;
}

export const ModificarMateria = async (data, key) => {
    const headers = {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "X-API-TOKEN": key        
    };
    const datos = await (await fetch(URL + "/materia/modificar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    return datos;
}
export const AsignarCurso = async (data, key) => {
    const headers = {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "X-API-TOKEN": key        
    };
    const datos = await (await fetch(URL + "/matricula/asignar/curso", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    return datos;
}
export const ModificarPersona = async (data, key) => {
    const headers = {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "X-API-TOKEN": key        
    };
    const datos = await (await fetch(URL + "/personas/modificar", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })).json();
    return datos;
}

export const ObtenerMateria = async (data, key) => {
    const cabeceras = {
        "X-API-TOKEN": key        
    };
    const datos = await (await fetch(URL + "/materia/obtener/" + data, {
        method: "GET",
        headers: cabeceras
    })).json();
    //console.log(datos);
    return datos;
}


export const MateriasCursa = async (data, key) => {
    const cabeceras = {
        "X-API-TOKEN": key        
    };
    const datos = await (await fetch(URL + "/materia/cursa/" + data, {
        method: "GET",
        headers: cabeceras
    })).json();
    //console.log(datos);
    return datos;
}

export const MateriasParticipantes = async (data, key) => {
    const cabeceras = {
        "X-API-TOKEN": key        
    };
    const datos = await (await fetch(URL + "/materia/participantes/" + data, {
        method: "GET",
        headers: cabeceras
    })).json();
    //console.log(datos);
    return datos;
}


//practica
/*
export const GuardarPractica = async (data, key, dato) => {
    const headers = {
        "x-api-token": key,
        "Content-Type": "multipart/form-data", 
    };
    const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
        file: dato
    };
    try {
        const response = await fetch(URL +'/practicas/guardar',requestOptions);
        const datos = await response.json();
        return datos;
    } catch (error) {
        console.log("Error:", error);
        // Manejo de errores
        throw error;
    }
};*/

export const GuardarPractica = async (data, key) => {
    const headers = {
        "x-api-token": key,
    };
    const requestOptions = {
        method: "POST",
        headers: headers,
        body: data, // Envía el FormData directamente como cuerpo
    };

    try {
        const response = await fetch(URL + '/practicas/guardar', requestOptions);
        const datos = await response.json();
        return datos;
    } catch (error) {
        console.log("Error:", error);
        throw error;
    }
};


export const ModificarPractica = async (data, key) => {
    const headers = {
        "x-api-token": key,
   
    };
    const requestOptions = {
        method: "POST",
        headers: headers,
        body: data
    };

    try {
        const response = await fetch(URL +'/pracicas/modificar',requestOptions);
        const datos = await response.json();
        return datos;
    } catch (error) {
        console.log("Error:", error);
        // Manejo de errores
        throw error;
    }
};

export const Practicas = async (key) => {

    var cabecera = {

        "x-api-token": key,
        "Content-Type": "application/json",
    }
    const datos = await (await fetch(URL + "/practicas", {
        method: "GET",
        headers: cabecera
    })).json();
    return datos;

}
export const PracticasEliminar = async (external,key) => {
    var cabecera = {
        "x-api-token": key,
        "Content-Type": "application/json",
    }
    const datos = await (await fetch(URL + "/practicas/eliminar"+external, {
        method: "GET",
        headers: cabecera
    })).json();
    return datos;

}

export const PracticaExternal = async (external,key) => {
    var cabecera = {
        "x-api-token": key,
        "Content-Type": "application/json",
    }
    const datos = await (await fetch(URL + "/practicas/obtener/"+external, {
        method: "GET",
        headers: cabecera
    })).json();
    return datos;
}
export const PracticaMateria = async (external,key) => {
    var cabecera = {
        "x-api-token": key,
        "Content-Type": "application/json",
    }
    const datos = await (await fetch(URL + "/practicas/materia/"+external, {
        method: "GET",
        headers: cabecera
    })).json();
    return datos;
}


export const PracticaEliminar = async ( external,key) => {
    var cabecera = {
        "x-api-token": key,
        "Content-Type": "application/json",
    }
    const datos = await (await fetch(URL + "/practicas/eliminar/"+external, {
        method: "GET",
        headers: cabecera
    })).json();
    return datos;
}
export const PracticaDoc = async ( external) => {
    var cabecera = {
        "Content-Type": "application/json",
    }
    const datos = await (await fetch(URL + "/document/"+external, {
        method: "GET",
        headers: cabecera
    }));
    return datos;
}

//entregable
export const listarEntregables = async (key) => {
    var cabecera = {
        "x-api-token": key
    }
    const datos = await (await fetch(URL + "/entregable/listar", {
        method: "GET",
        headers: cabecera
    })).json();
    return datos;
}
export const EntregableIDIDN= async (id,identi,key) => {
    var cabecera = {
        "x-api-token": key
    }
    const datos = await (await fetch(URL + "/entregable/"+id+"/"+identi, {
        method: "GET",
        headers: cabecera
    })).json();
    return datos;
}
export const EntregablePractica= async (identi,key) => {
    var cabecera = {
        "x-api-token": key
    }
    const datos = await (await fetch(URL + "/entregabl/obtenerP/"+identi, {
        method: "GET",
        headers: cabecera
    })).json();
    return datos;
}
export const EntregableModificar= async (data,key) => {
        const headers = {
            "x-api-token": key,
        };
        const requestOptions = {
            method: "POST",
            headers: headers,
            body: (data)
        };
        try {
            const response = await fetch(URL +'/entregable/modificar',requestOptions);
            const datos = await response.json();
            return datos;
        } catch (error) {
            console.log("Error:", error);
            // Manejo de errores
            throw error;
        }
    };

export const GuardarEntregable = async (data, key) => {
    const headers = {
        "x-api-token": key,
    };
    const requestOptions = {
        method: "POST",
        headers: headers,
        body: data
    };
    try {
        const response = await fetch(URL +'/entregable/guardar',requestOptions);
        const datos = await response.json();
        return datos;
    } catch (error) {
        console.log("Error:", error);
        // Manejo de errores
        throw error;
    }
};


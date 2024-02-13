import Swal from 'sweetalert2';
import storage from './storage/storage';
import axios from 'axios';

export const show_alert = (msj,icon) =>{
    Swal.fire({title:msj, icon: icon, buttonsStyling: true})
}

export const sendRequest = async(method, params, url, redir='',token=true) =>{
    if (token) {
        const autToken = storage.get('authToken');
        axios.defaults.headers.common['Authorization'] = 'Bearer'+autToken;
    }
    let res;
    await axios({method:method, url:url, data:params}).then(
        response =>{
            res = response.data,
            (method != 'GET') ? show_alert(response.data.message,'success'):'',
            setTimeout(()=> 
            (redir !== '') ? window.location.href = redir : '',2000
            )
        }
    ).catch((errors) => {
        let desc='';
        res = errors.response.data,
        errors.response.data.errors.map((e) => {desc = desc + ' '+ e})
        show_alert(desc,'error')
    })
    return res;
}

export const confirm = async() =>{

}

export default show_alert;
import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3001" // Colocar mais tarde a URL em um .env
})

axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

async function getUser() {
    try{
        const query = await api.get('/checkSession', {withCredentials: true})
        const user = query.data.session
        console.log(user.authenticated)
        if (user.authenticated)  
        {
            return Object({isLogged: true, user})
        } else {
            return Object({isLogged: false, user: {
                username: '',
                userid: null,
                genero: '',
                authenticated: false
            }})
        } 
    }catch(err){
        err
    }
}


export default api
export {getUser, api}
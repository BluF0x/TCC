import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3001" // Colocar mais tarde a URL em um .env
})

axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';


export default api
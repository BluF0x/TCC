import axios from 'axios'

const URL = "http://localhost:3001"

const api = axios.create({
    baseURL:  URL // Colocar mais tarde a URL em um .env
})

axios.defaults.headers.get['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

const getPicPath = (img) =>{
    return (URL + "/images/" + img)
}

async function getUser() {
    try{
        const query = await api.get('/checkSession', {withCredentials: true})
        const user = query.data.session
        console.log(user)
        if (user.authenticated)  
        {
            return Object({isLogged: true, user})
        } else {
            return Object({isLogged: false, user: {
                username: '',
                userid: null,
                genero: '',
                authenticated: false,
                admin: 0
            }})
        } 
    }catch(err){
        err
    }
}


async function getCommentsByUser(reviewerId) {
    try {
        const query = await api.get(`/commentsByReviewer/${reviewerId}`, { withCredentials: true });
        return query.data.comments;
    } catch (err) {
        console.log(err);
        return [];
    }
}

async function getAllCommentsByUser(reviewerId) {
    try {
        const query = await api.get(`/AllcommentsByReviewer/${reviewerId}`, { withCredentials: true });
        return query.data.comments;
    } catch (err) {
        console.log(err);
        return [];
    }
}

async function getTenisById(tenisId) {
    try {
        const query = await api.get(`/tenisId/${tenisId}`);
        return query.data.tenis; 
    } catch (err) {
        console.log(err);
        return null;
    }
}

export default api
export {getUser, api, getCommentsByUser, getTenisById, getPicPath, URL, getAllCommentsByUser}
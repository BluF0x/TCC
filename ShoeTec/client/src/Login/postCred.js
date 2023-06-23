import api from "../services/api";

async function cadastrarUsuario(cred) {
    delete cred.confirmPassword

    try{
        const query = await api.post("/users", cred)
        return query;
    } catch(err) {
        return err
    }
    

}

async function logarUsuario(cred) { 
    console.log("Logando")
}

export default {cadastrarUsuario, logarUsuario}
import api from "../services/api";

async function cadastrarUsuario(cred) {
    delete cred.confirmPassword

    const query = await api.post("/users", cred)
    console.log(query)

    return query;
}

async function logarUsuario(cred) { 
    console.log("Logando")
}

export default {cadastrarUsuario, logarUsuario}
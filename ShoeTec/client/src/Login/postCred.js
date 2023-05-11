import api from "../services/api";

async function cadastrarUsuario(cred) {
    delete cred.confirmPassword

    const query = await api.post("/users", cred)
    // const query = await api.post("/users",
    // {
    // name: "jdalfksçkjladfs",
	// email: "fjsadhladfhsk@gmail.com",
	// pass: "1234",
	// pais: "Brasil",
	// estado: null,
	// cidade: null,
	// genero: "M",
	// esportes: ["a", "e", "f"]
    //  }
    // )  
    console.log(query)

}

async function logarUsuario(cred) { 
    console.log("Logando")
}

export default {cadastrarUsuario, logarUsuario}
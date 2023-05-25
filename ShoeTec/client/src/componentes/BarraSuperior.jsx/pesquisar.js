import api from "../../services/api"

const pesquisar =  {
    query : "",
    params : [],
    pesquisar: async function() {
        try{
            return api.get("/tenis/5")
        } catch{
            return console.log("error")
        }
    }
}

export default pesquisar
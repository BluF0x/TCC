import {React, useState, useEffect} from "react";
import { getUser, api } from "../services/api";
import BarraNav from "../componentes/BarraNav/BarrabNav";


export default function EditarFotoPerfil() {
    const [arquivo, setArquivo] = useState(null)
    const [user, setUser] = useState({})

    useEffect(()=>{
    getUser()
        .then(
        (value)=>{
            console.log(value)
            setUser(value.user)
        },
        (reason)=>{
            console.log(reason)
        })
        .catch((reason)=>{
            console.log(reason)
        })
    }, [])
    

    const handleArquivo = (e) =>{
        setArquivo(e.target.files[0])
    }

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('image', arquivo);
        formData.append('userId', user.userid);
        api.post(`/uploadUserPicture`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
        .then(response => {
            console.log(response.data);
            window.alert("Foto de perfil mudada com sucesso!")

            // Handle success, show a message, update UI, etc.
        })
        .catch(error => {
        console.error(error);
            window.alert("Erro")
            // Handle errors
        });
    }
    
    return (
        <div>
            {/* <div style={{marginTop: 60}}>🐰🥚</div>
            <BarraNav/> */}
            <div>
                <input type="file" onChange={e=>handleArquivo(e)}/>
                <button onClick={e=>handleUpload(e)}>Mudar perfil</button>
            </div>
        </div>
    )
}
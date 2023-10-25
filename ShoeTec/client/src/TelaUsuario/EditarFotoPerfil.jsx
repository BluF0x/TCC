import { React, useState, useEffect } from "react";
import Userpic from '../assets/imgs/userpic.jpg';
import { getUser, api } from "../services/api";
import BarraNav from "../componentes/BarraNav/BarrabNav";
import './editar-perfil.css';


export default function EditarFotoPerfil() {
    const [arquivo, setArquivo] = useState(null)
    const [user, setUser] = useState({})
    const [endImg, setEndImg] = useState('')

    useEffect(() => {
        getUser()
            .then(
                (value) => {
                    console.log(value)
                    setUser(value.user)
                },
                (reason) => {
                    console.log(reason)
                })
            .catch((reason) => {
                console.log(reason)
            })
    }, [])


    const handleArquivo = (e) => {
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
        <>
        <div className="container-editarfoto">
            <div className="container-tela-editarfoto">
                {/* <div style={{marginTop: 60}}>🐰🥚</div>
            <BarraNav/> */}
                
                    <div className="editarperfil-foto">
                        {arquivo ? <img src={URL.createObjectURL(arquivo)} alt='Foto de Usuário' className="editaruser-foto"></img> : <img src={Userpic} alt="Foto de Usuário" className="editaruser-foto"></img>}
                        <h1 className="titulo-editarfoto">Preview de Imagem</h1>
                    </div>  

                <input type="file" name='arquivo' onChange={e => handleArquivo(e)} />
                <button className='btn-editarfoto' onClick={e => handleUpload(e)}>Mudar foto de perfil</button>
            </div>
        </div>
        </>
    )
}
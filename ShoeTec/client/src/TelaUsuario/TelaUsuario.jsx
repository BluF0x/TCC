import { useState } from "react";
import BarraSuperior from '../componentes/BarraSuperior.jsx/barra-superior.jsx'
import Arthur from '../assets/imgs/arthur.jpg';
import './tela-usuario.css'

export function TelaUsuario() {

    return (
        <div className="container-tela-usuario">
            <BarraSuperior/>
            <div className="space">🥚🐰</div>
            <div className="container-content">
                <PerfilUsuario/>
                <ListaComentarios/>
            </div>
        </div>
    )

    function PerfilUsuario() {
        return(
            <div className="perfil-container">
                <div className="perfil-foto">
                <img className="user-foto" src={Arthur} alt="Foto Usuário"></img>
                </div>
                <div className="perfil-cardname">
                    <h1 className="perfil-nome">
                        Arthur Bauer Cardoso
                    </h1>
                </div>
                
                <div className="perfil-icons">
                <img className="favicon" src="https://img.icons8.com/ios-filled/25/000000/basketball.png"/>
                <img className="favicon" src="https://img.icons8.com/ios-filled/25/000000/basketball.png"/>
                <img className="favicon" src="https://img.icons8.com/ios-filled/25/000000/basketball.png"/>
                <img className="favicon" src="https://img.icons8.com/ios-filled/25/000000/basketball.png"/>
                <img className="favicon" src="https://img.icons8.com/ios-filled/25/000000/basketball.png"/>
                </div>

                <div className="perfil-descricao">
                    <p className="perfil-descricao-p"> 1º lugar 10km Giassi Sombrio 2020 sub-24</p>
                </div>

                <div className="perfil-edit">
                <button type="button" className="btn-edit-profile">Editar Perfil</button>
                </div>
                
                
            </div>
        )
    }

    function ListaComentarios() {
        return(
            <div className="comentarios-container">
                Comentarios
            </div>
        )
    }

}
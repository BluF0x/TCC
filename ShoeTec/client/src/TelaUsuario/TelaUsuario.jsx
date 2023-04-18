import { useState } from "react";
import BarraSuperior from '../componentes/BarraSuperior.jsx/barra-superior.jsx'
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
                Perfil
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
import { useState, useEffect } from "react";
import api from "../services/api";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import './adm.css';

export function TelaADM() {
    const userAdmin = Cookies.get('admin')

    return (
        <>
            {userAdmin === "1" ? (
                <div className="container-tela-adm">
                <h2 className='titulo-adm'>Tênis:</h2>
                <div className='div-adm div-tenis-adm'>
                    <Link className="link-adm" to='/CadastrarTenis'>Tênis</Link>
                </div>

                <h2 className='titulo-adm'>Usuários:</h2>
                <div className='div-adm div-usuario'>
                    <Link className="link-adm" to='/EditarUsuario'>Usuário</Link>
                </div>

                <h2 className='titulo-adm'>Comentários:</h2>
                <div className='div-adm div-comentario'>
                    <Link className="link-adm" >Comentários</Link>
                </div>

                <div className='div-adm-voltar'>
                    <Link className="link-adm-voltar" to='/'>Voltar</Link>
                </div>
            </div>
            ) : (<h1>Permissão Negada</h1>)}

        </>
    )
}
import React from "react"
import {Link} from "react-router-dom"
import homen from "../../assets/imgs/homen.jpg"
import Cookies from "js-cookie"
import "../../index.css"
import "./menu-bem-vindo.css"


function TelaBemVindo() {
    const isLogged = Cookies.get('loggedIn')

    return (
        <div className="container-bem-vindo">
            <h1 className="titulo">Bem-Vindo(a){Cookies.get("username") ? `, ${Cookies.get('username')}` : '!' }</h1>
            <div className="img">
                <img src={homen} id="img-tela"></img>
            </div>
            <div className="background">
            </div>
            <Link to={isLogged ? "/TelaUsuario" : "/Login"} className="menus menu-entrar">
                {isLogged ? "Tela de usuário" : "Entrar"}
            </Link>
            
            <Link className="menus menu-reviews">
                Reviews
            </Link>
            <Link className="menus menu-gerenciar">
                Gerenciar comentários
            </Link>
        </div>
    )
}

export default TelaBemVindo
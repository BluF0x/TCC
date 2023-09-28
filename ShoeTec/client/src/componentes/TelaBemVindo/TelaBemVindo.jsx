import React from "react"
import { Link } from "react-router-dom"
import homen from "../../assets/imgs/homen.jpg"
import Cookies from "js-cookie"
import { useState, useEffect } from "react";
import "../../index.css"
import "./menu-bem-vindo.css"


function TelaBemVindo() {
    const isLogged = Cookies.get('loggedIn')
    const userGenero = Cookies.get('genero')
    const userAdmin = Cookies.get('admin')
    const [tituloClasse, setTituloClasse] = useState("titulo");

    useEffect(() => {
        const titulo = isLogged ? Cookies.get("username") : "";
        const tituloLength = titulo.length;


        if (tituloLength < 30) {
            setTituloClasse("titulo");
        } else {
            setTituloClasse("titulo-longo");
        }
    }, [isLogged]);

    return (
        <div className="container-bem-vindo">
            <h1 className={tituloClasse}>
                {userGenero == "M" ? "Bem vindo " : userGenero == "F" ? "Bem vinda " : "Bem vindo(a) "}
                {isLogged ? Cookies.get('username') : ''}

            </h1>
            <div className="img">
                <img src={homen} id="img-tela"></img>
            </div>
            <div className="background">
            </div>
            <Link to={isLogged ? `/TelaUsuario/${Cookies.get("id")}` : "/Login"} className="menus menu-entrar">
                {isLogged ? "Tela de usuário" : "Entrar"}
            </Link>

            {userAdmin === "1" ? (
                <Link className="menus menu-adm" to='/TelaADM'>
                    Admin
                </Link>
                
            ) : (
                <>
                    <Link className="menus menu-reviews">
                        Reviews
                    </Link>
                    <Link className="menus menu-gerenciar">
                        Gerenciar comentários
                    </Link>
                </>
            )}
        </div>
    )
}

export default TelaBemVindo
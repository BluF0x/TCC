import React from "react"
import { Link } from "react-router-dom"
import homen from "../../assets/imgs/homen.jpg"
import Cookies from "js-cookie"
import { useState, useEffect } from "react";
import "../../index.css"
import "./menu-bem-vindo.css"
import { api, getUser } from '../../services/api'



function TelaBemVindo() {
    // const isLogged = Cookies.get('loggedIn')
    const userGenero = Cookies.get('genero')
    const [tituloClasse, setTituloClasse] = useState("titulo");
    const [isLogged, setIsLogged] = useState(false)
    const [user, setUser] = useState({
        user: {
            username: '',
            userid: null,
            genero: '',
            authenticated: false,
            admin: 0
        }
    })

    useEffect(() => {
        getUser()
            .then(
                (value) => {
                    console.log(value)
                    setIsLogged(value.isLogged)
                    setUser(value.user)
                },
                (reason) => {
                    console.log(reason)
                })
            .catch((reason) => {
                console.log(reason)
            })

    }, []);

    useEffect(() => {
        const conteudoH1 = `${user.genero === "M" ? "Bem vindo " : user.genero === "F" ? "Bem vinda " : "Olá, "}${isLogged ? user.username : ''}`;
        if (conteudoH1.length < 30) {
            setTituloClasse("titulo");
        } else {
            setTituloClasse("titulo-longo");
        }
    }, [user.genero, isLogged, user.username]);

    return (
        <div className="container-bem-vindo">
            <h1 className={tituloClasse}>
                {user.genero == "M" ? "Bem vindo " : user.genero == "F" ? "Bem vinda " : "Olá "}
                {isLogged ? user.username : ''}

            </h1>
            <div className="img">
                <img src={homen} id="img-tela"></img>
            </div>
            <div className="background">
            </div>
            <Link to={isLogged ? `/TelaUsuario/${user.userid}` : "/Login"} className="menus menu-entrar">
                {isLogged ? "Tela de usuário" : "Entrar"}
            </Link>

            {user.admin == "1" ? (
                <>
                <Link className="menus menu-adm" to='/TelaADM'>
                    Admin
                </Link>
                <Link className="menus menu-gerenciar">
                    Gerenciar comentários
                </Link>
                </>

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
import React from "react"
import {Link} from "react-router-dom"
import homen from "../../assets/imgs/homen.jpg"
import "../../index.css"
import "./menu-bem-vindo.css"


function TelaBemVindo() {
    return (
        <div className="container-bem-vindo">
            <h1 className="titulo">Bem Vindo</h1>
            <div className="img">
                <img src={homen} id="img-tela"></img>
            </div>
            <div className="menus">
                <div>
                    <Link>
                        Meu Perfil
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TelaBemVindo
import React from "react"
import homen from "../../assets/imgs/homen.jpg"
import "../../index.css"
import "./menu-bem-vindo.css"


function TelaBemVindo() {
    return (
        <div className="container-bem-vindo">
            <span>
                <h1 className="titulo">Bem Vindo</h1>
                <div>
                    <img src={homen} id="img-tela"></img>
                </div>
                <div className="menus">
                    a
                </div>
            </span>
        </div>
    )
}

export default TelaBemVindo
import React from "react";
import BarraNav from "../componentes/BarraNav/BarrabNav";
import { Link, useNavigate } from "react-router-dom";
import './lost.css'

export default function Lost() {
    const navigate = useNavigate()

    return(
        <div>
            <BarraNav></BarraNav>
            <div className="nav">🐰🥚</div>
            <div className="lost">
                <h1 className="lost-text"><b>404: Página não encontrada, ou não existe :(</b></h1>
                <Link to='/' className="link">Voltar</Link>
            </div>
        </div>
    )
}
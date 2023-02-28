import React from 'react'
import './componentes.css'
import '../index.css'
import filter_fill from '../assets/filter_fill.svg' 

/*
 * Barra superior do site
*/ 

function BarraSuperior() {
    return(
        <div class="barra-superior">

            {/*Barra de navegação lateral*/}
            <div class="items-barra-superior flex0" id="item1">1</div> 

            <BarraDePesquisa></BarraDePesquisa>

            {/*Modo escuro*/}
            <div class="items-barra-superior">4</div>

            {/*Perfil*/}
            <div class="items-barra-superior">5</div>
        </div>
    )
}

function BarraDePesquisa() {
    return (
        <div class="items-barra-superior" id="barra-pesquisa">
            <input type="text" placeholder="Pesquisar" id="pesquisar"></input>
            <button id="btn-filtrar" >
                <img src={filter_fill} className="icon" alt="filtrar"></img>
            </button>
        </div>
    )
}

export default BarraSuperior

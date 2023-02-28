import React from 'react'
import './componentes.css'

/*
 * Barra superior do site
 * 
*/ 

function BarraSuperior() {
    return(
        <div class="barra-superior">
            {/*Barra de navegação lateral*/}
            <div class="items-barra-superior">1</div> 
            {/*Barra de pesquisa*/}
            <div class="items-barra-superior" id="barra-pesquisa">
                <input type="text" id="pesquisar"></input>
                <input type="button" id="btn-filtrar" value="filtrar"></input>
            </div>
            {/*Modo escuro*/}
            <div class="items-barra-superior">4</div>
            {/*Perfil*/}
            <div class="items-barra-superior">5</div>
        </div>
    )
}

export default BarraSuperior

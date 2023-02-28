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
            <form>
                <input type="text" id="pesquisar"></input>
                <input type="button" id="pesquisar-btn" value="pesquisar"></input>
            </form>
            </div>
            {/*Modo escuro*/}
            <div class="items-barra-superior">4</div>
            {/*Perfil*/}
            <div class="items-barra-superior">5</div>
        </div>
    )
}

export default BarraSuperior

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
            <div class="test">1</div> 
            {/*Barra de pesquisa*/}
            <div class="test" id="test2">
            <form>
                <input type="text" id="pesquisar"></input>
                <input type="button" id="pesquisar-btn" value="pesquisar"></input>
            </form>
            </div>
            {/*Modo escuro*/}
            <div class="test">4</div>
            {/*Perfil*/}
            <div class="test">5</div>
        </div>
    )
}

export default BarraSuperior

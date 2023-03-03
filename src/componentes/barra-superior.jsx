import {React, useState} from 'react'
import './componentes.css'
import '../index.css'
import filter_fill from '../assets/filter_fill.svg' 
import menu_icon from '../assets/menu_icon.svg'
import conta_icon from '../assets/conta_icon.svg'
import logo from '../assets/logo.svg'

/*
 * Barra superior do site
*/ 

function BarraSuperior() {

    return(
        <div class="barra-superior">


            <ItemNav icon={menu_icon} alt="test" link="#">
            </ItemNav>
            <ItemNav icon={conta_icon} alt="test" link="#" />

            <BarraDePesquisa></BarraDePesquisa>

            <ItemNav icon={logo} alt="test" link="../index.html" />

        </div>
    )
}

function ItemNav(props) {
    const [itemAberto, setNav] = useState(false)

    return (
        <div className='menu-nav'>
            <ul>
                <a href={props.link} onClick={() => {setNav(!itemAberto)}}>
                    <img src={props.icon} alt={props.alt}  className="icon"></img>
                </a>

                {itemAberto && props.children}
            </ul>
        </div>
        
    )
}

function DropNav() {
    function ItemDropNav() {
        return (
            <a href='#' className='item-drop-nav'>
                {props.children}
            </a>

        )
    }

    return (
        <div className='drop-nav'>
            <ItemDropNav>   </ItemDropNav>
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

import {React, useState, createRef} from 'react'
import filter_fill from '../../assets/svg/filter_fill.svg' 
import menu_icon from '../../assets/svg/menu_icon.svg'
import conta_icon from '../../assets/svg/conta_icon.svg'
import logo from '../../assets/svg/logo.svg'
import nightMode from '../../assets/svg/night_mode.svg'
import './barra-superior.css'
import '../../index.css'

/*
 * Barra superior do site
*/ 

function BarraSuperior() {

    return(
        <div class="barra-superior">


            <ItemNav icon={menu_icon} alt="test" link="#">
                    <ItemDropNav href={"#"} icone={nightMode}> 
                        Modo escuro
                    </ItemDropNav>
                    <ItemDropNav href={"#"} > BB  </ItemDropNav>
                    <ItemDropNav href={"#"} > BB  </ItemDropNav>
            </ItemNav>
            <ItemNav icon={conta_icon} alt="test" link="./test.html" />

            <BarraDePesquisa></BarraDePesquisa>

            <ItemNav icon={logo} alt="test" link="../index.html" />

        </div>
    )
}

ItemNav.defaultProps ={ 
    class: "menu-nav"
}

function ItemNav(props) {
    const [itemAberto, setNav] = useState(false)


    function DropNav(props) {
        return (
            <div className='drop-nav' ref={referencia} >
                {props.children}
            </div>
        )
    }
    let referencia = createRef()

    function handleClickOutside(e) {
        console.log(e.target)
        if (referencia.current && !referencia.current.contains(e.target)) {
            setNav(!itemAberto)
        }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return (
        <div className={props.class}>
            <ul>
                <a href={props.link} onClick={() => {setNav(!itemAberto)}} >
                    <img src={props.icon} alt={props.alt}  className="icon"></img>
                </a>
                    {/* Se o componente tem elementos filhos e itemAberto é verdadiero,
                        ele adiciona DropNav e passa os elementos filho */}
                    {itemAberto && props.children && <DropNav> {props.children} </DropNav>}
            </ul>
        </div>
        
    )
}
function ItemDropNav(props) {return (
        <a href={props.href} className='item-drop-nav'>
            {props.icon}
            {props.children}
        </a>

    )
}



function BarraDePesquisa() {
    return (
        <div class="items-barra-superior" id="barra-pesquisa">
            <input type="text" placeholder="Pesquisar" id="pesquisar"></input>
            {/* <button id="btn-filtrar" >
                <img src={filter_fill} className="icon" alt="filtrar"></img>
            </button> */}
            <ItemNav class={'btn-filtrar'} icon={filter_fill} link="#">
                    <ItemDropNav>
                    </ItemDropNav>
                    <ItemDropNav>

                    </ItemDropNav>
                    <ItemDropNav>

                    </ItemDropNav>
            </ItemNav>
        </div>
    )
}

export default BarraSuperior

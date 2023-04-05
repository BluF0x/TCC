import {React, useState, createRef} from 'react'
import {Link} from 'react-router-dom'
import filter_fill from '../../assets/svg/filter_fill.svg' 
import menu_icon from '../../assets/svg/menu_icon.svg'
import conta_icon from '../../assets/svg/conta_icon.svg'
import logo from '../../assets/imgs/SneakerTecLogo.png'
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
                    <ItemDropNav href={'/'} icone={nightMode}> 
                        Modo escuro
                    </ItemDropNav>
            </ItemNav>
            <ItemNav icon={conta_icon} alt="test" link="/Login" />

            <BarraDePesquisa></BarraDePesquisa>

            <ItemNav icon={logo} alt="test" link="/" />

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
            <div className='drop-nav' ref={referenciaDrop} >
                {props.children}
            </div>
        )
    }
    const referenciaDrop = createRef()
    const referenciaItem = createRef()

    function handleClick(e) {
        if (referenciaDrop.current && !referenciaDrop.current.contains(e.target)) {
            setNav(!itemAberto)
            console.log("Drop:" + referenciaDrop.current)
        } 
    }

    document.addEventListener("mousedown", handleClick);

    return (
        <div className={props.class} ref={referenciaItem}>
            <ul>
                <Link to={props.link} onClick={() => {setNav(!itemAberto)}} >
                    <img src={props.icon} alt={props.alt}  className="icon"></img>
                </Link>
                    {/* Se o componente tem elementos filhos e itemAberto é verdadiero,
                        ele adiciona DropNav e passa os elementos filho */}
                    {itemAberto && props.children && <DropNav> {props.children} </DropNav>}
            </ul>
        </div>
        
    )
}

function ItemDropNav(props) {return (
        <Link to={props.href} className='item-drop-nav'>
            {props.icon}
            {props.children}
        </Link>

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

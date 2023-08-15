import {React, useState, createRef, useEffect} from 'react'
import {Link} from 'react-router-dom'
import filter_fill from '../../assets/svg/filter_fill.svg' 
import menu_icon from '../../assets/svg/menu_icon.svg'
import conta_icon from '../../assets/svg/conta_icon.svg'
import logo from '../../assets/imgs/SneakerTecLogo.png'
import nightMode from '../../assets/svg/night_mode.svg'
import './barra-superior.css'
import '../../index.css'
import pesquisar from './pesquisar'
import Cookies from 'js-cookie'

/*
 * Barra superior do site
*/ 

function BarraSuperior() {
    const [darkMode, setDarkMode] = useState()


    useEffect(() =>{
        if(!localStorage.getItem("darkMode")){
            localStorage.setItem("darkMode", "light")
        } 
        setDarkMode(localStorage.getItem("darkMode"))
    }, [localStorage])

    function toggleDarkMode() {
        darkMode == "light" ? localStorage.setItem("darkMode", "dark") : localStorage.setItem("darkMode", "light")
    }

    const sair = () =>{
        console.log("saiu")
        Cookies.remove('username')
        Cookies.remove('loggedIn')
    }

    return(
        <div className="barra-superior">


            <ItemNav icon={menu_icon} alt="test" link="#" className="Modo-icon">
                    <ItemDropNav href={'/'} icone={nightMode} onClick={toggleDarkMode()}> 
                        Modo escuro
                    </ItemDropNav>
                    <ItemDropNav href={'/'}  onClick={()=>{console.log("hello")}}> 
                        Sair
                    </ItemDropNav>
            </ItemNav>
            <ItemNav icon={conta_icon} alt="test" link="/TelaUsuario" className="Conta-icon"/>

            <BarraDePesquisa></BarraDePesquisa>

            <ItemNav icon={logo} class={"menu-nav menu-no-bg"} alt="test" link="/" />
            

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
            {props.children}
            <img src={props.icone} className='iconeBtn'></img>
        </Link>

    )
}



function BarraDePesquisa() {
    const [queryResult, setQueryResult] = useState(undefined)

    const handleInput = async (e) =>{
        e.preventDefault()
        const res = await pesquisar.pesquisar()
        console.log(res)
    }
    return (
        <div className="items-barra-superior" id="barra-pesquisa">
            <input type="text" placeholder="Pesquisar" id="pesquisar" onChange={e=>handleInput(e)}></input>
            {/* <button id="btn-filtrar" >
                <img src={filter_fill} className="icon" alt="filtrar"></img>
            </button> */}
            {queryResult}
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

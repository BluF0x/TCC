import {React, useState} from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import logo from '../../assets/imgs/SneakerTecLogo.png'
import userLogo from '../../assets/svg/conta_icon.svg'
import filter from '../../assets/svg/filter_fill.svg'
import menu from '../../assets/svg/menu_icon.svg'
import './BarraNav.css';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


function BarraNav() {
    const [popupUserOpen, setPopupUserOpen] = useState(false)
    const navigate = useNavigate()
    const isLogged = Cookies.get('loggedIn')

    const goToUserScreen = () =>{
        isLogged ? navigate('/TelaUsuario') : navigate('/Login')
    }

    const logout=(e)=> {
        console.log(e)
        Cookies.remove('id')
        Cookies.remove('genero')
        Cookies.remove('username')
        Cookies.remove('loggedIn')

        navigate('/')

        //comunicação com server
    }

    const toggleMenuNav=() => {
        setPopupUserOpen(!popupUserOpen)
        console.log(popupUserOpen)
    }

    function MenuNav() {
        return (
            <div className="menu-list">
                <ul>
                    <li className="menu-list-item" onClick={e=>goToUserScreen()}>{isLogged ? 'Tela de usuário' : 'Logar'}</li>
                    <li className="menu-list-item" onClick={(e)=>{logout(e)}}>Sair</li>
                </ul>
            </div>
        )
    }

    return(
        <div className="barra-superior">
            <Popup
            trigger={
            <div className="menu-nav" onClick={(e)=>toggleMenuNav()}>
                <img src={menu} alt="Menu de navegação" className="icon"></img>
            </div>
            }
            on={'click'}
            closeOnDocumentClick
            position={'bottom left'}
            >
                <MenuNav/>
            </Popup>
            <div className="menu-nav">
                <Link to={Cookies.get('loggedIn') ? '/TelaUsuario' : '/Login'}>
                    <img src={userLogo} alt='Tela de usuário' className="icon"></img>
                </Link>
            </div>
            <div className="items-barra-superior" id="barra-pesquisa">
                <input type="text" placeholder="Pesquisar" id="pesquisar" onChange={(e)=>{console.log(e.target.value)}}></input>
                <Popup
                trigger={
                    <div className="btn-filtrar">
                        <img src={filter} className="icon" />
                    </div>
                }
                closeOnDocumentClick
                position={'bottom left'}
                >
                </Popup>
            </div>
            <div className="menu-nav menu-no-bg">
                <Link to='/'>
                    <img src={logo} alt='Logo da SneakerTech' className="icon"></img>
                </Link>
            </div>
        </div>
    )
}


export default BarraNav
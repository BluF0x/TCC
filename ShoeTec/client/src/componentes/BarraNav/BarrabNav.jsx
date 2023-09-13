import {React, useState} from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import logo from '../../assets/imgs/SneakerTecLogo.png'
import userLogo from '../../assets/svg/conta_icon.svg'
import filter from '../../assets/svg/filter_fill.svg'
import menu from '../../assets/svg/menu_icon.svg'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import './BarraNav.css';


function BarraNav() {
    const [popupUserOpen, setPopupUserOpen] = useState(false)
    const navigate = useNavigate()
    const isLogged = Cookies.get('loggedIn')

    const goToUserScreen = () =>{
        console.log(isLogged)
        // isLogged ? navigate('/TelaUsuario/', {state: {id: Cookies.get('id')}}) : navigate('/Login')
        navigate("/Login")
    }

    const logout=(e)=> {

        try{
            const queryResult = api.get('/userLogout')
            console.log(queryResult)
            Cookies.remove('id')
            Cookies.remove('genero')
            Cookies.remove('username')
            Cookies.remove('loggedIn')
        } catch(err) {
            console.log(err)
        }



        navigate('/')
    }

    const toggleMenuNav=() => {
        setPopupUserOpen(!popupUserOpen)
        console.log(isLogged)
    }

    function MenuNav() {
        return (
            <div className="menu-list">
                <ul>
                    <Link to={ isLogged ? `/TelaUsuario/${Cookies.get('id')}` : '/Login'} className="menu-list-item" >
                        Tela usuario
                    </Link>
                    <li className="menu-list-item" onClick={(e)=>{logout(e)}}>Sair</li>
                </ul>
            </div>
        )
    }

    function MenuFiltrar() {
        return (
            <div className="menu-list">
                <ul>
                    <li className="menu-list-item" >
                        <input type="checkbox"></input>
                    </li>
                    <li className="menu-list-item" >
                        <input type="checkbox"></input>
                    </li>
                    <li className="menu-list-item" >
                        <input type="checkbox"></input>
                    </li>
                    <li className="menu-list-item" >
                        <input type="checkbox"></input>
                    </li>
                    <li className="menu-list-item" ></li>
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
                <Link to={ isLogged ? `/TelaUsuario/${Cookies.get('id')}` : '/Login'} >
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
                    <MenuFiltrar/>
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
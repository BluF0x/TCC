import {React, useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import logo from '../../assets/imgs/SneakerTecLogo.png'
import userLogo from '../../assets/svg/conta_icon.svg'
import filter from '../../assets/svg/filter_fill.svg'
import menu from '../../assets/svg/menu_icon.svg'
import { useNavigate, useLocation } from "react-router-dom";
import "../../services/api";
import './BarraNav.css';
import { getUser, api } from "../../services/api";


function BarraNav() {
    const [popupUserOpen, setPopupUserOpen] = useState(false)
    const [isLogged, setIsLogged] = useState(false)
    const [user, setUser] = useState({
        user: {
            username: '',
            userid: null,
            genero: '',
            authenticated: false
        }
    })
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        getUser()
            .then(
            (value)=>{
                console.log(value)
                setIsLogged(value.isLogged)
                setUser(value.user)
            },
            (reason)=>{
                console.log(reason)
            })
            .catch((reason)=>{
                console.log(reason)
            })
    }, [])

    const goToUserScreen = () =>{
        console.log(isLogged)
        navigate("/Login")
    }

    const logout=(e)=> {


        try{
            api.get('/userLogout', {withCredentials: true})
                .then((val)=>{
                    console.log(val)
                    location.pathname != '/' ? navigate('/') : window.location.reload(false)
                })
        } catch(err) {
            console.log(err)
        }
    }


    const toggleMenuNav=() => {
        setPopupUserOpen(!popupUserOpen)
        console.log(isLogged)
    }

    function MenuNav() {
        return (
            <div className="menu-list">
                <ul>
                    <Link to={ isLogged ? `/TelaUsuario/${user.userid}` : '/Login'} className="menu-list-item" >
                        Tela usuario
                    </Link>
                    <li className="menu-list-item" onClick={(e)=>{logout(e)}}>Sair</li>
                </ul>
            </div>
        )
    }

    const BarraPesquisa = () => {
        const [search, setSearch] = useState({searchName: ""})
        const [queryPesquisa, setQueryPesquisa] = useState()
        const [isPesquisando, setIsPesquisando] = useState(false)

        const elementRef = useRef(null)

        useEffect(() => {
            const handleClickOutside = (event) => {
                console.log(elementRef.current)
                if (elementRef.current && !elementRef.current.contains(event.target)) {
                    // Clicked outside the element, do something
                    setIsPesquisando(false)
                }
            };

            const handleDocumentClick = (event) => {
            handleClickOutside(event);
            };

            // Attach event listener to the document
            document.addEventListener('mousedown', handleDocumentClick);

            // Clean up the event listener on component unmount
            return () => {
            document.removeEventListener('mousedown', handleDocumentClick);
            };
        }, []); // Empty dependency array means this effect will run once after initial render

        const mudarFiltro = (e) =>{
            console.log(e.target)
            setSearch({...search,  marca: e.target.value})
            api.get('/searchTenis', {params: search})
            .then((val)=>{
                console.log(val.data.query)
                setQueryPesquisa(val.data.query)
                setIsPesquisando(true)
            })
        }

        const mudarFiltroEsporte = (e) =>{
            console.log(e.target)
            setSearch({...search,  esporte: e.target.value})
            api.get('/searchTenis', {params: search})
            .then((val)=>{
                console.log(val.data.query)
                setQueryPesquisa(val.data.query)
                setIsPesquisando(true)
            })
        }
       
        const pesquisar = async(e) => {
            const pesquisa = e.target.value
            console.log(pesquisa)
            if (pesquisa != "") {
                setSearch({searchName: pesquisa})
                api.get('/searchTenis', {params: search})
                .then((val)=>{
                    console.log(val.data.query)
                    setQueryPesquisa(val.data.query)
                    setIsPesquisando(true)
                })
            } else {
                setIsPesquisando(false)
                setSearch({searchName: pesquisa})
                setQueryPesquisa([])
            }
        }
    
        return (
            <div className="items-barra-superior" id="barra-pesquisa" ref={elementRef}>
                <input type="text" placeholder="Pesquisar" id="pesquisar" onChange={(e)=>pesquisar(e)}></input>
                <div className="barra-pesquisa container-itens-query " >
                    { isPesquisando && 
                        queryPesquisa.map((val)=>{
                            return (
                                <Link to={'/TelaTenis/' + val.tenis_id} className="item-query">
                                    {val.nome}
                                </Link>
                            )
                        })
                    }
                </div>
                <Popup
                    className="popup"
                    trigger={
                        <div className="btn-filtrar">
                            <img src={filter} className="icon" />
                        </div>
                    }
                    closeOnDocumentClick
                    position={'bottom left'}
                    >
                    <div className="menu-list">
                        <ul>
                            <li className="menu-list-item" >
                                <select name="marca" onChange={e=>mudarFiltro(e)} className="select-nav">
                                    <option value={null}>Selecione a marca</option>
                                    <option value="Nike">Nike</option>
                                    <option value="Adidas">Adidas</option>
                                    <option value="Olympus">Olympus</option>
                                </select>
                                <select name="marca" onChange={e=>mudarFiltroEsporte(e)} className="select-nav">
                                    <option value={null}>Selecione o esporte</option>
                                    <option value="Futebol">Futebol</option>
                                    <option value="Futsal">Futsal</option>
                                    <option value="Corrida">Corrida</option>
                                    <option value="Voleibal">Voleibal</option>
                                    <option value="Basquete">Basquete</option>
                                    <option value="Tênis">Tênis</option>
                                    <option value="Handebol">Handebol</option>
                                    <option value="Musculação">Musculação</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </Popup>
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
                <Link to={ isLogged ? `/TelaUsuario/${user.userid}` : '/Login'} >
                    <img src={userLogo} alt='Tela de usuário' className="icon"></img>
                </Link>
            </div>
            <BarraPesquisa/>
            <div className="menu-nav menu-no-bg">
                <Link to='/'>
                    <img src={logo} alt='Logo da SneakerTech' className="icon"></img>
                </Link>
            </div>
        </div>
    )
}


export default BarraNav
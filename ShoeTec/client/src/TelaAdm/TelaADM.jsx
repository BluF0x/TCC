import { useState, useEffect } from "react";
import { api, getUser } from '../services/api'
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import './adm.css';

export function TelaADM() {
    const [isLogged, setIsLogged] = useState(false)
    const [user, setUser] = useState({
        user: {
            username: '',
            userid: null,
            genero: '',
            authenticated: false,
            admin: 0
        }
    })

    useEffect(() => {
        getUser()
            .then(
                (value) => {
                    console.log(value)
                    setIsLogged(value.isLogged)
                    setUser(value.user)
                },
                (reason) => {
                    console.log(reason)
                })
            .catch((reason) => {
                console.log(reason)
            })

    }, []);

    return (
        <>
            {user.admin == "1" ? (
                <div className="container-adm">
                    <div className="container-tela-adm">
                        <div className="wrap-adm">
                            <div className="titulo-div-adm">
                                <h2 className='titulo-adm'>Tênis:</h2>
                            </div>
                            <div className='div-adm div-tenis-adm'>
                                <Link className="link-adm" to='/CadastrarTenis'>Tênis</Link>
                            </div>

                            <div className="titulo-div-adm">
                                <h2 className='titulo-adm'>Usuários:</h2>
                            </div>
                            <div className='div-adm div-usuario'>
                                <Link className="link-adm" to='/EditarUsuario'>Usuário</Link>
                            </div>

                            <div className="titulo-div-adm">
                                <h2 className='titulo-adm'>Comentários:</h2>
                            </div>
                            <div className='div-adm div-comentario'>
                                <Link className="link-adm" >Comentários</Link>
                            </div>

                            <div className='div-adm-voltar'>
                                <Link className="link-adm-voltar" to='/'>Voltar</Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (<h1>Permissão Negada</h1>)}

        </>
    )
}
import React from 'react';
import Cookies from "js-cookie";
import RemoverIcon from '../assets/icons/remover.png'
import ExcluirIcon from '../assets/icons/excluir.png'
import AdicionarIcon from '../assets/icons/adicionar.png'
import { useState, useEffect } from "react";
import { api, getUser } from '../services/api'
import { Link, useNavigate } from "react-router-dom";
import VoltarIconLaranja from '../assets/icons/voltarlaranja.png'
import postCred from '../Login/postCred.js';
import inputValidation from '../Login/inputValidation.js';
import Popup from 'reactjs-popup';
import './adm.css';

export function EditarUsuario(props) {
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

    const [isPopupOpen, setPopupOpen] = useState(false)
    const [mensagemQuery, setMensagemQuery] = useState('')
    const [credenciais, setCredenciais] = useState(
        {
            esporte: [],
            cidade: null,
            estado: null,
        }
    )


    const handleCredenciais = (e) => {
        inputValidation.setCreds(e, setCredenciais, credenciais) //setCreds adiciona o input a credenciais
    }

    const handleUpdateAdminStatus = async (usuario_id) => {
        const credenciaisComId = {
            isAdmin: 1,
            id: usuario_id,
        };

        try {
            const queryResult = await postCred.updateAdminStatus(credenciaisComId);

            if (queryResult.status >= 200 && queryResult.status < 300) {
                setPopupOpen(true);
                setMensagemQuery(`ADM acionado com sucesso!\nCod: ${queryResult.status}`);
            } else {
                setPopupOpen(true);
                setMensagemQuery(`Falha ao acionar ADM.\nRazão: ${queryResult.response.data.error.details[0].message} \nCod: ${queryResult.response.status}`);
            }
        } catch (error) {
            console.error('Erro ao atualizar status de administrador:', error);
        }
    };

    const handleUpdateAdminStatusRemove = async (usuario_id) => {
        const credenciaisComId = {
            isAdmin: 0,
            id: usuario_id,
        };

        try {
            const queryResult = await postCred.updateAdminStatus(credenciaisComId);

            if (queryResult.status >= 200 && queryResult.status < 300) {
                setPopupOpen(true);
                setMensagemQuery(`ADM removido com sucesso!\nCod: ${queryResult.status}`);
            } else {
                setPopupOpen(true);
                setMensagemQuery(`Falha ao remover ADM.\nRazão: ${queryResult.response.data.error.details[0].message} \nCod: ${queryResult.response.status}`);
            }
        } catch (error) {
            console.error('Erro ao atualizar status de administrador:', error);
        }
    };

    const handleDeleteUser = async (usuario_id) => {
        const credenciaisId = {
            id: usuario_id,
        };

        try {
            const queryResult = await postCred.deleteUserId(credenciaisId);

            if (queryResult.status >= 200 && queryResult.status < 300) {
                setPopupOpen(true);
                setMensagemQuery(`Usuário deletado com sucesso!\nCod: ${queryResult.status}`);
            } else {
                setPopupOpen(true);
                setMensagemQuery(`Falha ao deletar usuário.\nRazão: ${queryResult.response.data.error.details[0].message} \nCod: ${queryResult.response.status}`);
            }
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
        }
    };

    return (
        <>
            <Popup
                position="top center"
                closeOnDocumentClick
                open={isPopupOpen}
            >
                <div className='popup'>
                    <div className='mensagem-login-cad'>{mensagemQuery}</div>
                    <Link className='login-form-button-cad' onClick={() => setPopupOpen(false)}>Fechar</Link>

                    <div className='text-center-popupcad'>
                        <Link to={`/TelaADM`} className='voltar-popup'>Voltar</Link>
                    </div>
                </div>
            </Popup>

            {user.admin == "1" ? (
                <div className='container-adm'>
                    <div className="container-form-adm-edit">
                        <Link to={`/TelaADM`}>
                            <img className="voltar-icon-editar" src={VoltarIconLaranja} alt="Voltar" />
                        </Link>
                        <h1 className="titulo-form-adm">Usuário</h1>

                        <TabelaUsersADM
                            cred={credenciais}
                            setCred={setCredenciais}
                            setPopupOpen={setPopupOpen}
                            setMensagemQuery={setMensagemQuery}
                            handleUpdateAdminStatus={handleUpdateAdminStatus}
                            handleUpdateAdminStatusRemove={handleUpdateAdminStatusRemove}
                            handleDeleteUser={handleDeleteUser}
                        />

                    </div>
                </div>

            ) : (<div>Permissão Negada</div>)}
        </>
    )
}

function TabelaUsersADM(props) {
    const [users, setUsers] = useState([])
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

    const setPopupOpen = props.setPopupOpen
    const setMensagemQuery = props.setMensagemQuery

    useEffect(() => {
        if (user.admin == "1") {
            api.get('/getUsers')
                .then((res) => {
                    if (res.status === 200) {
                        setUsers(res.data);
                    }
                })
                .catch((error) => {
                    console.error('Erro ao buscar os usuários:', error);
                });
        }
    }, [user.admin]);

    const handleUpdateAdminStatus = async (usuario_id) => {
        const credenciaisComId = {
            isAdmin: 1,
            id: usuario_id,
        };

        try {
            const queryResult = await postCred.updateAdminStatus(credenciaisComId);

            if (queryResult.status >= 200 && queryResult.status < 300) {
                setPopupOpen(true);
                setMensagemQuery(`ADM acionado com sucesso!\nCod: ${queryResult.status}`);
            } else {
                setPopupOpen(true);
                setMensagemQuery(`Falha ao acionar ADM.\nRazão: ${queryResult.response.data.error.details[0].message} \nCod: ${queryResult.response.status}`);
            }
        } catch (error) {
            console.error('Erro ao atualizar status de administrador:', error);
        }
    };

    const handleUpdateAdminStatusRemove = async (usuario_id) => {
        const credenciaisComId = {
            isAdmin: 0,
            id: usuario_id,
        };

        try {
            const queryResult = await postCred.updateAdminStatus(credenciaisComId);

            if (queryResult.status >= 200 && queryResult.status < 300) {
                setPopupOpen(true);
                setMensagemQuery(`ADM removido com sucesso!\nCod: ${queryResult.status}`);
            } else {
                setPopupOpen(true);
                setMensagemQuery(`Falha ao remover ADM.\nRazão: ${queryResult.response.data.error.details[0].message} \nCod: ${queryResult.response.status}`);
            }
        } catch (error) {
            console.error('Erro ao atualizar status de administrador:', error);
        }
    };

    const handleDeleteUser = async (usuario_id) => {
        const credenciaisId = {
            id: usuario_id,
        };

        try {
            const queryResult = await postCred.deleteUserId(credenciaisId);

            if (queryResult.status >= 200 && queryResult.status < 300) {
                setPopupOpen(true);
                setMensagemQuery(`Usuário deletado com sucesso!\nCod: ${queryResult.status}`);
            } else {
                setPopupOpen(true);
                setMensagemQuery(`Falha ao deletar Usuário.\nRazão: ${queryResult.response.data.error.details[0].message} \nCod: ${queryResult.response.status}`);
            }
        } catch (error) {
            console.error('Erro ao deletar usuário:', error);
        }
    };
    return (
        <div className="table-container-adm">
            <table className="user-table-adm">
                <thead>
                    <tr>
                        <th className='th-adm'>ID</th>
                        <th className='th-adm'>Nome</th>
                        <th className='th-adm'>Email</th>
                        <th className='th-adm'>ADM</th>
                        <th className='th-adm'>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.usuario_id}>
                            <td className='td-adm'>{user.usuario_id}</td>
                            <td className='td-adm'>{user.name}</td>
                            <td className='td-adm'>{user.email}</td>
                            <td className='td-adm'>
                                <div className="btn-container">
                                    <input
                                        type="checkbox"
                                        checked={user.admin === 1}
                                    />
                                    {user.admin === 1 ? (
                                        <button className='btn-addadm' onClick={() => handleUpdateAdminStatusRemove(user.usuario_id)}>
                                            <img className="remover" src={RemoverIcon} alt="Remover ADM" />
                                            <span className="text-excluir">Remover</span>
                                        </button>
                                    ) : (
                                        <button className='btn-addadm' onClick={() => handleUpdateAdminStatus(user.usuario_id)}>
                                            <img className="adicionar" src={AdicionarIcon} alt="Adcionar ADM" />
                                            <span className="text-excluir">Adicionar</span>
                                        </button>
                                    )}
                                </div>
                            </td>
                            <td className='td-adm'>
                                <div className="btn-container">
                                    <button className="btn-adm-removeuser" onClick={() => handleDeleteUser(user.usuario_id)}>
                                        <img className="excluir" src={ExcluirIcon} alt="Excluir" />
                                        <p className="text-align-excluir">
                                            <span className="text-excluir">Excluir</span>
                                        </p>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
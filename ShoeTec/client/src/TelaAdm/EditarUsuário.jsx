import React from 'react';
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import postCred from '../Login/postCred.js';
import inputValidation from '../Login/inputValidation.js';
import Popup from 'reactjs-popup';
import './adm.css';

export function EditarUsuario(props) {
    const userAdmin = Cookies.get('admin')
    const [estadoLogin, setEstadoLogin] = useState(true)

    const [isAdmin, setIsAdmin] = useState(false);
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

    useEffect(() => {

        try {
            api.get(`/getUser/${Cookies.get('id')}`)
                .then((res) => {
                    console.log(res)
                    if (res.status == 200) {
                        console.log(res)
                        setUser(res.data.result[0])
                    }
                })
        }
        catch (err) {
            console.log(err)
        }

    }, [])

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

            {userAdmin === "1" ? (
                <div className='container-adm'>
                    <div className="container-form-adm-edit">
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
    const userAdmin = Cookies.get('admin')
    const [users, setUsers] = useState([]);

    const setPopupOpen = props.setPopupOpen
    const setMensagemQuery = props.setMensagemQuery

    useEffect(() => {
        if (userAdmin === "1") {
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
    }, [userAdmin]);

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
                                <input
                                    type="checkbox"
                                    checked={user.admin === 1}
                                />
                                {user.admin === 1 ? (
                                    <button className='btn-addadm' onClick={() => handleUpdateAdminStatusRemove(user.usuario_id)}>Remove</button>)
                                    : (<button className='btn-addadm' onClick={() => handleUpdateAdminStatus(user.usuario_id)}>ADM</button>)
                                }
                            </td>
                            <td className='td-adm'>
                                <button className='btn-adm-removeuser' onClick={() => handleDeleteUser(user.usuario_id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
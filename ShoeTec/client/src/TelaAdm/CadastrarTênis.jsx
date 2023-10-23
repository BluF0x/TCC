import React from 'react';
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { api, getUser } from "../services/api";
import { Link } from "react-router-dom";
import postCred from '../Login/postCred.js';
import inputValidation from '../Login/inputValidation.js';
import Popup from 'reactjs-popup';
import './adm.css';

export function CadastrarTenis() {
    const [estadoLogin, setEstadoLogin] = useState(true)
    const [isPopupOpen, setPopupOpen] = useState(false)
    const [mensagemQuery, setMensagemQuery] = useState('')
    const [credenciais, setCredenciais] = useState(
        {
            esporte: [],
            cidade: null,
            estado: null,
        }
    )

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

    const handleCredenciais = (e) => {
        inputValidation.setCreds(e, setCredenciais, credenciais) //setCreds adiciona o input a credenciais
    }

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
                    <div className="container-form-adm">
                        <h1 className="titulo-form-adm">Tênis</h1>
                        <CadastrarTenisADM
                            cred={credenciais}
                            setCred={handleCredenciais}
                            estadoLog={estadoLogin}
                            setEstadoLog={setEstadoLogin}
                            setPopupOpen={setPopupOpen}
                            setMensagemQuery={setMensagemQuery} />
                    </div>
                </div>

            ) : (<div>Permissão Negada</div>)}
        </>
    )
}

function InputFormAdmTenis(props) {
    const [warning, setWarning] = useState(undefined)
    const nome = props.nome
    const steps = props.steps
    if (props.tipo != "checkbox" && props.tipo != "radio") {
        return (
            <>
                <div className="wrap-input-adm">
                    <input
                        className={!props.var ? 'input-adm' : props.var == "" ? 'input-adm' : 'has-val input-adm'}
                        type={props.tipo}
                        name={props.nome}
                        value={props.var}
                        onChange={e => {
                            const valor = e.target.value
                            props.handleInput(e, setWarning)
                            // Esse loop executa todas as funções dentro do array steps, que verifica o input do usuario
                            if (steps) {
                                let isWarning = []
                                for (let i = 0; i < steps.length; i++) {
                                    const result = steps[i].params ? steps[i].function(valor, ...steps[i].params) : steps[i].function(valor)
                                    isWarning.push(result.status)
                                    if (!result.status) {
                                        setWarning(result.warning)
                                    } else if (!isWarning.includes(undefined)) {
                                        setWarning(undefined)
                                    }
                                }
                            }

                        }}
                        required
                    />
                    <span className="focus-input-adm" data-placeholder={props.placeholder}></span>
                </div>
                <div className='wrap-warning'>
                    {warning}
                </div>
            </>
        )
    } else if (props.tipo == "radio") {
        return (
            <div className="wrap-input-cadastro-tenis" onChange={e => props.handleInput(e, setWarning)}>
                <h3 className='titulo-esporte-tenis'>{props.titulo}*</h3>
                {props.membros.map(
                    v => {
                        return (
                            <p className='input-p-tenis'>
                                <input
                                    className='input-btn-tenis'
                                    id={v.id}
                                    name={props.nome}
                                    type="radio"
                                    value={v.valor}
                                />
                                <label className="label-radio" for={v.id}>{v.label}</label>
                            </p>
                        )
                    }
                )}
                <div className='wrap-warning'>
                    <div className='warning-radio'>
                        {warning}
                    </div>
                </div>
            </div>
        )
    }
}

function CadastrarTenisADM(props) {
    const isLogged = Cookies.get('loggedIn')

    const credenciais = props.cred
    const handleCredenciais = props.setCred
    const estadoLogin = props.estadoLog
    const setEstadoLogin = props.setEstadoLog
    const setPopupOpen = props.setPopupOpen
    const setMensagemQuery = props.setMensagemQuery

    const cadastrartenis = async (e) => {
        e.preventDefault()

        const queryResult = await postCred.createTenis(credenciais)

        if (queryResult.status > 199 && queryResult.status < 500) {
            console.log(queryResult)
            setPopupOpen(true)
            setMensagemQuery(`Tênis cadastrado com sucesso!\nCod: ${queryResult.status}`)
            setEstadoLogin(true)

        } else {
            console.log(queryResult)
            setPopupOpen(true)
            setMensagemQuery(`Falha ao cadastrar tênis.\nRazão: ${queryResult.response.data.error.details[0].message} \nCod: ${queryResult.response.status}`)
        }
    }

    return (
        <div className='container-adm-tenis'>
            <InputFormAdmTenis
                nome={"nome"}
                handleInput={handleCredenciais}
                placeholder={"Nome"}
                var={credenciais.nome}
            />

            <InputFormAdmTenis
                nome={"descr"}
                handleInput={handleCredenciais}
                placeholder={"Descrição"}
                var={credenciais.descr}
            />

            <InputFormAdmTenis
                nome={"medium_price"}
                handleInput={handleCredenciais}
                placeholder={"Preço médio"}
                tipo={'number'}
                var={credenciais.medium_price}
            />

            <InputFormAdmTenis membros={[
                {
                    id: "futebol",
                    valor: "Futebol",
                    label: "Futebol"
                },
                {
                    id: "futsal",
                    valor: "Futsal",
                    label: "Futsal"
                },
                {
                    id: "corrida",
                    valor: "Corrida",
                    label: "Corrida"
                },
                {
                    id: "volei",
                    valor: "voleibal",
                    label: "Voleibal"
                },
                {
                    id: "basquete",
                    valor: "Basquete",
                    label: "Basquete"
                },
                {
                    id: "tenis",
                    valor: "Tenis",
                    label: "Tênis"
                },
                {
                    id: "handebol",
                    valor: "Handebol",
                    label: "Handebol"
                },
                {
                    id: "musculacao",
                    valor: "Musculacao",
                    label: "Musculação"
                },
            ]}
                tipo={"radio"}
                titulo={"Esporte"}
                handleInput={handleCredenciais}
                nome={"esporte"}
            />

            <InputFormAdmTenis
                nome={"marca"}
                handleInput={handleCredenciais}
                placeholder={"Marca"}
                var={credenciais.marca}
            />

            <InputFormAdmTenis
                nome={"categoria"}
                handleInput={handleCredenciais}
                placeholder={"Categoria"}
                var={credenciais.categoria}
            />

            <InputFormAdmTenis
                nome={"peso"}
                handleInput={handleCredenciais}
                placeholder={"Peso"}
                var={credenciais.peso}
            />

            <InputFormAdmTenis
                nome={"dropt"}
                handleInput={handleCredenciais}
                placeholder={"Drop (Entressola)"}
                var={credenciais.dropt}
            />

            <InputFormAdmTenis
                nome={"solado"}
                handleInput={handleCredenciais}
                placeholder={"Solado"}
                var={credenciais.solado}
            />

            <InputFormAdmTenis
                nome={"cabedal"}
                handleInput={handleCredenciais}
                placeholder={"Cabedal"}
                var={credenciais.cabedal}
            />

            <InputFormAdmTenis
                nome={"palmilha"}
                handleInput={handleCredenciais}
                placeholder={"Palmilha*"}
                var={credenciais.palmilha}
            />

            <InputFormAdmTenis
                nome={"entressola"}
                handleInput={handleCredenciais}
                placeholder={"Entressola*"}
                var={credenciais.entressola}
            />

            <InputFormAdmTenis
                nome={"trava"}
                handleInput={handleCredenciais}
                placeholder={"Trava"}
                var={credenciais.trava}
            />

            <InputFormAdmTenis
                nome={"img"}
                handleInput={handleCredenciais}
                placeholder={"Imagem 1"}
                var={credenciais.img}
            />

            <InputFormAdmTenis
                nome={"img2"}
                handleInput={handleCredenciais}
                placeholder={"Imagem 2"}
                var={credenciais.img2}
            />

            <InputFormAdmTenis
                nome={"img3"}
                handleInput={handleCredenciais}
                placeholder={"Imagem 3"}
                var={credenciais.img3}
            />

            <InputFormAdmTenis
                nome={"img4"}
                handleInput={handleCredenciais}
                placeholder={"Imagem 4"}
                var={credenciais.img4}
            />

            <InputFormAdmTenis
                nome={"desconto"}
                handleInput={handleCredenciais}
                placeholder={"Desconto"}
                var={credenciais.desconto}
            />

            <InputFormAdmTenis
                nome={"cupom"}
                handleInput={handleCredenciais}
                placeholder={"Cupom (link)"}
                var={credenciais.cupom}
            />

            <div className="container-adm-btn">
                <Link className="login-adm-btn-voltar" to='/TelaADM'>Voltar</Link>
                <button className="login-adm-btn-cad" onClick={(e) => cadastrartenis(e)} type='submit'>Cadastrar</button>
            </div>
        </div>
    )
}

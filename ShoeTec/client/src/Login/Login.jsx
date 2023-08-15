import { useEffect, useState } from 'react';
import {Link} from "react-router-dom"
import SneakerTecLogo from '../assets/imgs/SneakerTecLogo.png';
import postCred from './postCred';
import inputValidation from './inputValidation';
import Cookies from 'js-cookie'
import api from '../services/api';
import Popup from 'reactjs-popup';
import './login.css';


export function Login() {
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

    // Função para adicionar o input as credenciais
    const handleCredenciais = (e) =>{
        inputValidation.setCreds(e, setCredenciais, credenciais) //setCreds adiciona o input a credenciais
    } 


    function loginOuCriar() {
        setEstadoLogin(!estadoLogin)
    }


    return (
        <>

        <Popup
        position="top center"
        closeOnDocumentClick
        open={isPopupOpen}
        >
            <div className='popup'>
                <div >{mensagemQuery}</div>
                <button className='login-form-button' onClick={()=>setPopupOpen(false)}>Fechar</button>
                
                <div className='text-center'>
                    <Link to="/" className='voltar'>Voltar</Link>
                </div>
            </div>
        </Popup>
        

        <div className="container">
            <div className="container-login">
                <div className={estadoLogin ? "wrap-login" : "wrap-cadastro "}>
                    {
                    estadoLogin ?  
                        <LoginForm 
                            cred={credenciais} 
                            setCred={handleCredenciais} 
                            estadoLog={estadoLogin} 
                            setEstadoLog={setEstadoLogin} 
                            setPopupOpen={setPopupOpen}
                            setMensagemQuery={setMensagemQuery}
                            
                        /> : 
                        <CadastrarForm
                            cred={credenciais} 
                            setCred={handleCredenciais} 
                            estadoLog={estadoLogin} 
                            setEstadoLog={setEstadoLogin} 
                            setPopupOpen={setPopupOpen}
                            setMensagemQuery={setMensagemQuery}
                        />
                    }
                </div>
            </div>
        </div>
        </>
    );
}

InputForm.deafaultProps = { 
    tipo: "text",
    steps: [''],
    var: ""
}

function InputForm(props) {
    const [warning, setWarning] = useState(undefined)
    const nome = props.nome
    const steps = props.steps 

    if (props.tipo != "checkbox" && props.tipo != "radio"){
        /*
        * Cada input deve ter os seguintes props:
        * nome: 
        * tipo: tipo de input, como por exemplo email ou password
        * var: é o valor das credenciais, basicamente o valor do input
        * handleInput: é a função para adicionar o valor as credenciais
        * placeholder: é o "titulo" do input
        * steps: etapas de verificação de input, como por exemplo, ter no minimo x caracteres.
        * Essas etapas vem em um array de objetos, que tem no mínimo o parametro function, que 
        * é a função a ser executada para verificar o input. Params é os parametros adicionais 
        * da função; todas as funções vem de inputValidation.js
        */
        return(
            <>
            <div className="wrap-input-cadastro">
                <input 
                className = {!props.var ? 'input' : props.var == "" ?  'input' : 'has-val input' }
                type = {props.tipo}
                name = {props.nome}
                value = {props.var}
                onChange = {e => {
                    const valor = e.target.value
                    props.handleInput(e, setWarning)
                    // Esse loop executa todas as funções dentro do array steps, que verifica o input do usuario
                    if (steps){
                        let isWarning = []
                        for (let i =0; i < steps.length ; i++){
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
                <span className="focus-input" data-placeholder={props.placeholder}></span>
            </div>
            <div className='wrap-warning'>
                {warning}
            </div>
            </>
        )
    } else if (props.tipo == "radio") {
        return(
            <div className="wrap-input-cadastro" onChange={e=>props.handleInput(e, setWarning)}>
                <h3 className='titulo-genero'>{props.titulo}</h3>
                {props.membros.map(
                v=>{
                    return (
                        <p className='input-p'>
                        <input 
                            className = 'input-btn'
                            id={v.id}
                            name={props.nome}
                            type = "radio"
                            value = {v.genero}
                        />
                        <label className="label-radio"  for={v.id}>{v.label}</label>
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
    } else if (props.tipo == "checkbox") {
        return(
        <div className="wrap-input-cadastro">
            <h3 className='titulo-genero'>{props.titulo}</h3>
            {props.membros.map(
                v=>{
                    return(
                    <p className='input-p'>
                        <input 
                        className = 'input-btn'
                        id={v.id}
                        name={props.nome}
                        type = "checkbox"
                        value = {v.valor}
                        onChange={e=>props.handleInput(e, setWarning)}
                        />
                        <label className="label-radio"  for={v.id}>{v.label}</label>
                    </p>
                    )
                }
            )}
            <div className='wrap-warning'>
                <div className='warning-checkbox'>
                    {warning}
                </div>
            </div>
        </div>
        )
    }
}

function LoginForm(props) {
    const credenciais = props.cred
    const handleCredenciais = props.setCred
    const estadoLogin = props.estadoLog
    const setEstadoLogin = props.setEstadoLog
    const setPopupOpen = props.setPopupOpen
    const setMensagemQuery = props.setMensagemQuery

    const logar = async (e) => {
        e.preventDefault()
        // console.log(credenciais)

        try{
            const response = await api.post('/users/login', credenciais)

            const data = response.data.sessao
            const expira = new Date(Date.parse(data.cookie.expires))
            const nome = data.username
            const genero = data.genero

            console.log(data)

            Cookies.set('loggedIn', true, {expires: expira})
            Cookies.set('username', nome, {expires: expira})
            Cookies.set('genero', genero, {expires: expira})

            setPopupOpen(true)
            setMensagemQuery("Logado com sucesso!")
        }catch(err) {
            console.log(err)
        }
    }

    return(
    <form className="login-form" key="login">
        <h1 className="login-form-title">
            Bem vindo de volta!
        </h1>

        <span className="login-form-title">
            <img src={SneakerTecLogo} alt="Logo SneakerTec"></img>
        </span>

        <InputForm 
        nome={"email"} 
        handleInput={handleCredenciais} 
        placeholder={"Email"} 
        var={credenciais.email}
        />

        <InputForm 
        nome={"password"} 
        handleInput={handleCredenciais} 
        placeholder={"Senha"} 
        var={credenciais.password}
        tipo={"password"} 
        />

        <div className="container-login-form-btn">
            <button className="login-form-btn" onClick={(e) => logar(e)} type="submit">Login</button>
        </div>

        <div className="text-center">
            <span className="text1">Não possui conta?</span>
            <a href="#" className="text2" onClick={()=>{setEstadoLogin(!estadoLogin)}}>Criar conta.</a>
        </div>
        <div className='text-center'>
            <Link to="/" className='voltar'>Voltar</Link>
        </div>
    </form>
    )
}

function CadastrarForm(props) {
    const credenciais = props.cred
    const handleCredenciais = props.setCred
    const estadoLogin = props.estadoLog
    const setEstadoLogin = props.setEstadoLog
    const setPopupOpen = props.setPopupOpen
    const setMensagemQuery = props.setMensagemQuery

    const cadastrar = async (e) =>{
        e.preventDefault()

        const queryResult = await postCred.cadastrarUsuario(credenciais)

        //Por enquanto, um alert será usado; mudar depois
        if (queryResult.status > 200 && queryResult.status < 300) {
            console.log(queryResult)
            setPopupOpen(true)
            setMensagemQuery(`Usuário criado com sucesso!\nCod: ${queryResult.status}`)
            setEstadoLogin(true)

        } else {
            console.log(queryResult)
            setPopupOpen(true)
            setMensagemQuery(`Falha ao criar usuário.\nRazão: ${queryResult.response.data.error.details[0].message} \nCod: ${queryResult.response.status}`)
        }
    }

    return (
        <>

        <form className="login-form">
            <h1 className="login-form-title">
                Bem vindo!
            </h1>
            <span className="login-form-title">
                <img src={SneakerTecLogo} alt="Logo SneakerTec"></img>
            </span>

            <InputForm 
                nome={"name"} 
                handleInput={handleCredenciais} 
                placeholder={"Nome"} 
                var={credenciais.name}
                steps={[{function: inputValidation.required}]}
            />

            <InputForm 
            nome={"email"} 
            handleInput={handleCredenciais} 
            placeholder={"Email"} 
            var={credenciais.email}
            tipo={"email"}
            steps={[{function: inputValidation.required}]}
            />

            <InputForm nome={"pass"} 
            handleInput={handleCredenciais} 
            placeholder={"Senha"} 
            creds={credenciais} 
            var={credenciais.pass} 
            tipo={"password"} 
            steps={[
            {function: inputValidation.minimun, params: [8, "A senha"]},
            {function: inputValidation.required }
            ]}
            />

            <InputForm 
            nome={"confirmPassword"} 
            handleInput={handleCredenciais} 
            placeholder={"Confirmar senha"} 
            var={credenciais.confirmPassword} 
            tipo={"password"} 
            steps={[
            {function: inputValidation.isEqual, params: [credenciais.password] }
            ]}
            />

            <InputForm 
            nome={"pais"} 
            handleInput={handleCredenciais} 
            placeholder={"Pais"} 
            var={credenciais.pais}
            steps={[{function: inputValidation.required}]}
            />

            <InputForm 
            nome={"estado"} 
            handleInput={handleCredenciais} 
            placeholder={"Estado*"} 
            var={credenciais.estado}
            />

            <InputForm 
            nome={"cidade"} 
            handleInput={handleCredenciais} 
            placeholder={"Cidade*"} 
            var={credenciais.cidade}
            />



            <InputForm membros={[
                {
                    id: "masc",
                    label: "Masculino",
                    genero: "M"
                },
                {
                    id: "fem",
                    label: "Feminino",
                    genero: "F"
                },
                {
                    id: "outro",
                    label: "Outro",
                    genero: "O"
                },
                {
                    id: "naoindentifico",
                    label: "Prefiro não identificar",
                    genero: "N"
                }
            ]} 
            tipo={"radio"} 
            titulo={"Gênero"}
            handleInput={handleCredenciais}
            nome={"genero"}
            />

            <InputForm 
                tipo={"checkbox"} 
                titulo={"Esportes que você pratica:"}
                handleInput={handleCredenciais}
                nome={"esporte"}
                membros={[
                    {
                        id:"futebol",
                        valor: "futebol",
                        label: "Futebol"
                    },
                    {
                        id:"futsal",
                        valor: "futsal",
                        label: "Futsal"
                    },
                    {
                        id:"corrida",
                        valor: "corrida",
                        label: "Corrida"
                    },
                    {
                        id:"volei",
                        valor: "voleibal",
                        label: "Voleibal"
                    },
                    {
                        id:"basquete",
                        valor: "basquete",
                        label: "Basquete"
                    },
                    {
                        id:"tenis",
                        valor: "tenis",
                        label: "Tênis"
                    },
                    {
                        id:"handebol",
                        valor: "handebol",
                        label: "Handebol"
                    },
                    {
                        id:"musculacao",
                        valor: "musculacao",
                        label: "Musculação"
                    },
                ]}
            />


            <div className="container-login-form-btn">
                    <button className="login-form-btn" onClick={(e)=>cadastrar(e)} type='submit'>Criar conta</button>
            </div>

            <div className="text-center">
                <span className="text1">Possui conta?</span>
                <a href="#" className="text2" onClick={()=>{setEstadoLogin(!estadoLogin)}}>Criar conta.</a>
            </div>
            <div className='text-center '>
                <Link to="/" className='voltar'>Voltar</Link>
            </div>
        </form>
        </>
    )
}

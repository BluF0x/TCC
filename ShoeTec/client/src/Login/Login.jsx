import { useEffect, useState } from 'react';
import {Link} from "react-router-dom"
// import LoginFrom from './LoginForm.jsx'
import SneakerTecLogo from '../assets/imgs/SneakerTecLogo.png';
import api from '../services/api';
import './login.css';
// import LoginForm from './LoginForm.jsx';


export function Login() {
    const [estadoLogin, setEstadoLogin] = useState(true)
    const [credenciais, setCredenciais] = useState({esporte: []})
    const [warning, setWarninng] = useState("hello")

    // Função para adicionar o input as credenciais
    const handleCredenciais = (e) =>{
        const nome = e.target.name
        const valor = e.target.value
        const warning = document.createElement("div")
        e.target.parentElement.appendChild(warning)


        /* Primeiro, é checado se o tipo de input não é uma checkbox, 
         * já que a maioria dos inputs não é, esse caso é melhor ser 
         * checado primeiro. Caso o input seja uma checkbox, é verificado
         * se a checkbox em si está marcada, caso esteja, ela é adicionada 
         * a um array, caso não, ela é filtrada do array.
         */
        if(e.target.type !== "checkbox"){
            setCredenciais({
                ...credenciais,
                [nome] : valor
            })
        } else {
            const checked = e.target.checked
            if (checked) {
                setCredenciais({
                    ...credenciais,
                    esporte: [...credenciais.esporte, valor]
                })
            } else {
                const filtrado = credenciais.esporte.filter(esporte=>{return esporte !== valor})
                console.log(filtrado)
                setCredenciais({
                    ...credenciais,
                    esporte:  filtrado 
                })
            }
        }
    } 


    function loginOuCriar() {
        setEstadoLogin(!estadoLogin)
    }


    return (
        <>

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
                        /> : 
                        <CadastrarForm
                            cred={credenciais} 
                            setCred={handleCredenciais} 
                            estadoLog={estadoLogin} 
                            setEstadoLog={setEstadoLogin} 
                        />
                    }
                </div>
            </div>
        </div>
        </>
    );
}

InputForm.deafaultProps = { 
    tipo: "text"
}

function InputForm(props) {
    if (props.tipo != "checkbox" && props.tipo != "radio"){
        return(
            <>
            <div className="wrap-input-cadastro">
                <input 
                className = {props.var !== "" ? 'has-val input' : 'input'}
                type = {props.tipo}
                name = {props.nome}
                value = {props.var}
                onChange = {e => props.handleInput(e)}
                required
                />
                <span className="focus-input" data-placeholder={props.placeholder}></span>
            </div>
            <div className='wrap-warning'>
                {props.warning}
            </div>
            </>
        )
    } else if (props.tipo == "radio") {
        return(
            <div className="wrap-input-cadastro" onChange={e=>props.handleInput(e)}>
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
                    onChange={e=>props.handleInput(e)}
                    />
                    <label className="label-radio"  for={v.id}>{v.label}</label>
                    </p>
                    )
                }
            )}
        </div>
        )
    }
}

function LoginForm(props) {
    const credenciais = props.cred
    const handleCredenciais = props.setCred
    const estadoLogin = props.estadoLog
    const setEstadoLogin = props.setEstadoLog

    return(
    <form className="login-form" key="login">
        <h1 className="login-form-title">
            Bem vindo de volta!
        </h1>

        <span className="login-form-title">
            <img src={SneakerTecLogo} alt="Logo SneakerTec"></img>
        </span>

        <InputForm nome={"email"} handleInput={handleCredenciais} placeholder={"Email"} var={credenciais.email}/>

        <InputForm nome={"password"} handleInput={handleCredenciais} placeholder={"Senha"} var={credenciais.password}/>

        <div className="container-login-form-btn">
            <button className="login-form-btn">Login</button>
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

    const cadastrar = (e) =>{
        e.preventDefault()
    }

    return (
        <form className="login-form">
            <h1 className="login-form-title">
                Bem vindo!
            </h1>
            <span className="login-form-title">
                <img src={SneakerTecLogo} alt="Logo SneakerTec"></img>
            </span>

            <InputForm 
                nome={"nome"} 
                handleInput={handleCredenciais} 
                placeholder={"Nome"} 
                var={credenciais.nome}
            />

            <InputForm nome={"email"} handleInput={handleCredenciais} placeholder={"Email"} var={credenciais.email}/>

            <InputForm nome={"password"} handleInput={handleCredenciais} placeholder={"Senha"} var={credenciais.password}/>

            <InputForm nome={"confirmPassword"} handleInput={handleCredenciais} placeholder={"Senha"} var={credenciais.password}/>

            <InputForm nome={"pais"} handleInput={handleCredenciais} placeholder={"Pais"} var={credenciais.pais}/>

            <InputForm nome={"estado"} handleInput={handleCredenciais} placeholder={"Estado*"} var={credenciais.estado}/>

            <InputForm nome={"cidade"} handleInput={handleCredenciais} placeholder={"Cidade*"} var={credenciais.cidade}/>



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
                    label: "Não indentifico",
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
                titulo={"Esporte:"}
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
                        valor: "futebol",
                        label: "Futebol"
                    },
                ]}
            />

        <div className="wrap-input-cadastro">
            <h3 className='titulo-genero'>Esportes que você pratica</h3>
                    <p className='input-p'>
                    <input 
                    className = 'input-btn'
                    id="futebol"
                    name="esporte"
                    type = "checkbox"
                    value = "futebol"
                    onChange={e=>handleCredenciais(e)}
                    />
                    <label className="label-radio"  for="futebol">Futebol</label>
                    </p>

                    <p className='input-p'>
                    <input 
                    className = 'input-btn'
                    id="futsal"
                    name="esporte"
                    type = "checkbox"
                    value = "futsal"
                    onChange={e=>handleCredenciais(e)}
                    />
                    <label className="label-radio" for="futsal">Futsal</label>
                    </p>

                    <p className='input-p'>
                    <input 
                    className = 'input-btn'
                    id="corrida"
                    name="esporte"
                    type = "checkbox"
                    value = "corrida"
                    onChange={e=>handleCredenciais(e)}
                    />
                    <label className="label-radio" for="corrida">Corrida</label>
                    </p>

                    <p className='input-p'>
                    <input 
                    className = 'input-btn'
                    id="volei"
                    name="esporte"
                    type = "checkbox"
                    value = "volei"
                    onChange={e=>handleCredenciais(e)}
                    />
                    <label className="label-radio" for="volei">Voleibol</label>
                    </p>

                    <p className='input-p'>
                    <input 
                    className = 'input-btn'
                    id="basquete"
                    name="esporte"
                    type = "checkbox"
                    value = "basquete"
                    onChange={e=>handleCredenciais(e)}
                    />
                    <label className="label-radio" for="basquete">Basquete</label>
                    </p>

                    <p className='input-p'>
                    <input 
                    className = 'input-btn'
                    id="tenis"
                    name="esporte"
                    type = "checkbox"
                    value = "tenis"
                    onChange={e=>handleCredenciais(e)}
                    />
                    <label className="label-radio" for="tenis">Tênis</label>
                    </p>

                    <p className='input-p'>
                    <input 
                    className = 'input-btn'
                    id="handebol"
                    name="esporte"
                    type = "checkbox"
                    value = "handebol"
                    onChange={e=>handleCredenciais(e)}
                    />
                    <label className="label-radio" for="handebol">Handebol</label>
                    </p>

                    <p className='input-p'>
                    <input 
                    className = 'input-btn'
                    id="musculacao"
                    name="esporte"
                    type = "checkbox"
                    value = "musculacao"
                    onChange={e=>handleCredenciais(e)}
                    />
                    <label className="label-radio" for="musculacao">Musculação</label>
                    </p>
                    
            </div>

            <div className="container-login-form-btn">
                    <button className="login-form-btn" onClick={e=>cadastrar(e)} type='submit'>Criar conta</button>
            </div>

            <div className="text-center">
                <span className="text1">Possui conta?</span>
                <a href="#" className="text2" onClick={()=>{setEstadoLogin(!estadoLogin)}}>Criar conta.</a>
            </div>
            <div className='text-center '>
                <Link to="/" className='voltar'>Voltar</Link>
            </div>
        </form>
    )
}

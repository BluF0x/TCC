import { useState } from 'react';
import {Link} from "react-router-dom"
// import LoginFrom from './LoginForm.jsx'
import SneakerTecLogo from '../assets/imgs/SneakerTecLogo.png';
import './login.css';
// import LoginForm from './LoginForm.jsx';


export function Login() {
    const [estadoLogin, setEstadoLogin] = useState(true)

    const [credenciais, setCredenciais] = useState({})

    const handleCredenciais = (e) =>{
        const nome = e.target.name
        const valor = e.target.value
        console.log(`NOME: ${nome}; VALOR: ${valor}`)
        setCredenciais({
            ...credenciais,
            [nome] : valor
        })
        console.log(credenciais)
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
                    // estadoLogin ?  
                        // <LoginForm 
                        //     cred={credenciais} 
                        //     setCred={handleCredenciais} 
                        //     estadoLog={estadoLogin} 
                        //     setEstadoLog={setEstadoLogin} 
                        // /> : 
                        // <CadastrarForm
                        //     cred={credenciais} 
                        //     setCred={handleCredenciais} 
                        //     estadoLog={estadoLogin} 
                        //     setEstadoLog={setEstadoLogin} 
                        // />
                        <LoginForm 
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

        <div className="wrap-input">
            <input 
            className = {credenciais.email !== "" ? 'has-val input' : 'input'}  
            name="email"
            value={credenciais.email}
            onChange={(e)=>{handleCredenciais(e)}}
            />
            <span className="focus-input" data-placeholder="Email"></span>
        </div>

        <div className="wrap-input">
            <input 
            className = {credenciais.password !== "" ? 'has-val input' : 'input'}
            type = "password"
            name = "password"
            value = {credenciais.password}
            onChange = {e => handleCredenciais(e)}
            />
            <span className="focus-input" data-placeholder="Password"></span>
        </div>

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

    return (
        <form className="login-form">
            <h1 className="login-form-title">
                Bem vindo!
            </h1>
            <span className="login-form-title">
                <img src={SneakerTecLogo} alt="Logo SneakerTec"></img>
            </span>

            <div className="wrap-input-cadastro">
                <input 
                className = {credenciais.enome !== "" ? 'has-val input' : 'input'}
                type = "text"
                name = 'nome'
                value = {credenciais.nome}
                onChange = {e => handleCredenciais(e)}
                />
                <span className="focus-input" data-placeholder="Nome Completo"></span>
            </div>

            <div className="wrap-input-cadastro">
                <input 
                className = {credenciais.email !== "" ? 'has-val input' : 'input'}  
                type="email"
                name='email'
                value={credenciais.email}
                onChange={e => handleCredenciais(e)}
                />
                <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input-cadastro">
                <input 
                className = {credenciais.pais !== "" ? 'has-val input' : 'input'}
                type = "text"
                name = 'pais'
                value = {credenciais.pais}
                onChange = {e => handleCredenciais(e)}
                />
                <span className="focus-input" data-placeholder="País"></span>
            </div>

            <div className="wrap-input-cadastro">
                <input 
                className = {credenciais.estado !== "" ? 'has-val input' : 'input'}
                type = "text"
                name = 'estado'
                value = {credenciais.estado}
                onChange = {e => handleCredenciais(e)}
                />
                <span className="focus-input" data-placeholder="Estado"></span>
            </div>

            <div className="wrap-input-cadastro">
                <input 
                className = {credenciais.cidade !== "" ? 'has-val input' : 'input'}
                type = "text"
                name = 'cidade'
                value = {credenciais.cidade}
                onChange = {e => handleCredenciais(e)}
                />
                <span className="focus-input" data-placeholder="Cidade"></span>
            </div>

            <div className="wrap-input-cadastro">
                <input 
                className = {credenciais.password !== "" ? 'has-val input' : 'input'}
                type = "password"
                name='password'
                value = {credenciais.password}
                onChange = {e => handleCredenciais(e)}
                />
                <span className="focus-input" data-placeholder="Senha"></span>
            </div>

            <div className="wrap-input-cadastro">
                <input 
                className = {credenciais.confirmPassword !== "" ? 'has-val input' : 'input'}
                type = "password"
                name = 'confirmPassword'
                value = {credenciais.confirmPassword}
                onChange = {e => handleCredenciais(e)}
                />
                <span className="focus-input" data-placeholder="Confirme senha"></span>
            </div>

            <div className="wrap-input-cadastro" onChange={e=>handleCredenciais(e)}>
                <h3 className='titulo-genero'>Gênero:3</h3>

                <input 
                className = 'input-btn'
                id="masc"
                name="genero"
                type = "radio"
                value = {"masculino"}
                />
                <label className="label-radio"  for="masc">Masculino</label>

                <input 
                className = 'input-btn'
                id="fem"
                name="genero"
                type = "radio"
                value = {"feminino"}
                />
                <label className="label-radio" for="fem">Feminino</label>

                <input 
                className = 'input-btn'
                id="outro"
                name="genero"
                type = "radio"
                value = {"outro"}
                />
                <label className="label-radio" for="outro">Outro</label>

                <input 
                className = 'input-btn'
                id="naoidentificado"
                name="genero"
                type = "radio"
                value = {"naoidentificado"}
                />
                <label className="label-radio" for="naoidentificado">Não quero identificar</label>
            </div>

        <div className="wrap-input-cadastro">
            <h3 className='titulo-genero'>Esportes que você pratica:</h3>
                    <input 
                    className = 'input-btn'
                    id="futebol"
                    name="esporte"
                    type = "checkbox"
                    // value = {futebol}
                    />
                    <label className="label-radio"  for="futebol">Futebol</label>

                    <input 
                    className = 'input-btn'
                    id="futsal"
                    name="esporte"
                    type = "checkbox"
                    // value = {futsal}
                    />
                    <label className="label-radio" for="futsal">Futsal</label>

                    <input 
                    className = 'input-btn'
                    id="corrida"
                    name="esporte"
                    type = "checkbox"
                    // value = {corrida}
                    />
                    <label className="label-radio" for="corrida">Corrida</label>

                    <input 
                    className = 'input-btn'
                    id="volei"
                    name="esporte"
                    type = "checkbox"
                    // value = {volei}
                    />
                    <label className="label-radio" for="volei">Voleibol</label>

                    <input 
                    className = 'input-btn'
                    id="basquete"
                    name="esporte"
                    type = "checkbox"
                    // value = {basquete}
                    />
                    <label className="label-radio" for="basquete">Basquete</label>

                    <br />
                    <br />

                    <input 
                    className = 'input-btn'
                    id="tenis"
                    name="esporte"
                    type = "checkbox"
                    // value = {tenis}
                    />
                    <label className="label-radio" for="tenis">Tênis</label>

                    <input 
                    className = 'input-btn'
                    id="handebol"
                    name="esporte"
                    type = "checkbox"
                    // value = {handebol}
                    />
                    <label className="label-radio" for="handebol">Handebol</label>

                    <input 
                    className = 'input-btn'
                    id="musculacao"
                    name="esporte"
                    type = "checkbox"
                    // value = {musculacao}
                    />
                    <label className="label-radio" for="musculacao">Musculação</label>
                    
            </div>

            <div className="container-login-form-btn">
                    <button className="login-form-btn">Criar conta</button>
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

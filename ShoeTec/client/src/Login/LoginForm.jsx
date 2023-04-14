import {useState} from "react"
import { Link } from "react-router-dom";
import SneakerTecLogo from '../assets/imgs/SneakerTecLogo.png';

export default function LoginForm() {

    const [estadoLogin, setEstadoLogin] = useState(true)
    const [credenciais, setCredenciais] = useState({})
    const [test, setTest] = useState()

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
                    onChange={e=>handleCredenciais(e)}
                    />
                    <span className="focus-input" data-placeholder="Email"></span>
                </div>

                <div className="wrap-input">
                    <input 
                    className = {credenciais.password !== "" ? 'has-val input' : 'input'}
                    type = "password"
                    name="password"
                    value = {credenciais.password}
                    onChange = {e => handleCredenciais(e)}
                    />
                    <span className="focus-input" data-placeholder="Password"></span>
                </div>
                <div>

                    <button className="login-form-btn" onClick={(e)=>{
                        e.preventDefault()
                        console.log(credenciais)
                    }}>log</button>
                </div>

                <div className="container-login-form-btn">
                    <button className="login-form-btn">Login</button>
                </div>


                <div className="text-center">
                    <span className="text1">Não possui conta?</span>
                    <a href="#" className="text2" onClick={loginOuCriar}>Criar conta.</a>
                </div>
                <div className='text-center'>
                    <Link to="/" className='voltar'>Voltar</Link>
                </div>
            </form>
            )
}
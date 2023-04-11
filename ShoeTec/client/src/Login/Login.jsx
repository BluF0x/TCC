import { useState } from 'react';
import {Link} from "react-router-dom"
import SneakerTecLogo from '../assets/imgs/SneakerTecLogo.png';
import './login.css';


export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [pais, setPais] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [masculino, setMasculino] = useState("");
  const [feminino, setFeminino] = useState("");
  const [outro, setOutro] = useState("");
  const [naoidentificado, setNaoIdentificado] = useState("");
  const [estadoLogin, setEstadoLogin] = useState(true)

  function loginOuCriar() {
    setEstadoLogin(!estadoLogin)
  }

  return (
    <>

    <div className="container">
        <div className="container-login">
            <div className={estadoLogin ? "wrap-login" : "wrap-cadastro "}>
                {estadoLogin ? <LoginForm /> : <CadastrarForm />}
            </div>
        </div>
    </div>
    </>
  );
    function LoginForm() {
        return(
        <form className="login-form">
            <h1 className="login-form-title">
                Bem vindo de volta!
            </h1>
            <span className="login-form-title">
                <img src={SneakerTecLogo} alt="Logo SneakerTec"></img>
            </span>

            <div className="wrap-input">
                <input 
                className = {email !== "" ? 'has-val input' : 'input'}  
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input">
                <input 
                className = {password !== "" ? 'has-val input' : 'input'}
                type = "password"
                value = {password}
                onChange = {e => setPassword(e.target.value)}
                />
                <span className="focus-input" data-placeholder="Password"></span>
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

    function CadastrarForm() {
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
                    className = {nome !== "" ? 'has-val input' : 'input'}
                    type = "text"
                    value = {nome}
                    onChange = {e => setNome(e.target.value)}
                    />
                    <span className="focus-input" data-placeholder="Nome Completo"></span>
                </div>

                <div className="wrap-input-cadastro">
                    <input 
                    className = {email !== "" ? 'has-val input' : 'input'}  
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                    <span className="focus-input" data-placeholder="Email"></span>
                </div>

                <div className="wrap-input-cadastro">
                    <input 
                    className = {pais !== "" ? 'has-val input' : 'input'}
                    type = "text"
                    value = {pais}
                    onChange = {e => setPais(e.target.value)}
                    />
                    <span className="focus-input" data-placeholder="País"></span>
                </div>

                <div className="wrap-input-cadastro">
                    <input 
                    className = {estado !== "" ? 'has-val input' : 'input'}
                    type = "text"
                    value = {estado}
                    onChange = {e => setEstado(e.target.value)}
                    />
                    <span className="focus-input" data-placeholder="Estado"></span>
                </div>

                <div className="wrap-input-cadastro">
                    <input 
                    className = {cidade !== "" ? 'has-val input' : 'input'}
                    type = "text"
                    value = {cidade}
                    onChange = {e => setCidade(e.target.value)}
                    />
                    <span className="focus-input" data-placeholder="Cidade"></span>
                </div>

                <div className="wrap-input-cadastro">
                    <input 
                    className = {password !== "" ? 'has-val input' : 'input'}
                    type = "password"
                    value = {password}
                    onChange = {e => setPassword(e.target.value)}
                    />
                    <span className="focus-input" data-placeholder="Password"></span>
                </div>

                <div className="wrap-input-cadastro">
                    <input 
                    className = {confirmPassword !== "" ? 'has-val input' : 'input'}
                    type = "password"
                    value = {confirmPassword}
                    onChange = {e => setConfirmPassword(e.target.value)}
                    />
                    <span className="focus-input" data-placeholder="Confirm password"></span>
                </div>

                <div className="wrap-input-cadastro">
                    <h3 className='titulo-genero'>Gênero:</h3>
                        <input 
                        className = 'input-btn'
                        id="masc"
                        name="genero"
                        type = "radio"
                        value = {masculino}
                        />
                        <label className="label-radio"  for="masc">Masculino</label>

                        <input 
                        className = 'input-btn'
                        id="fem"
                        name="genero"
                        type = "radio"
                        value = {feminino}
                        />
                        <label className="label-radio" for="fem">Feminino</label>

                        <input 
                        className = 'input-btn'
                        id="outro"
                        name="genero"
                        type = "radio"
                        value = {outro}
                        />
                        <label className="label-radio" for="outro">Outro</label>

                        <input 
                        className = 'input-btn'
                        id="naoidentificado"
                        name="genero"
                        type = "radio"
                        value = {naoidentificado}
                        />
                        <label className="label-radio" for="naoidentificado">Não quero identificar</label>
                </div>

                <div className="container-login-form-btn">
                        <button className="login-form-btn">Criar conta</button>
                </div>

                <div className="text-center">
                    <span className="text1">Possui conta?</span>
                    <a href="#" className="text2" onClick={loginOuCriar}>Entrar</a>
                </div>
                <div className='text-center '>
                    <Link to="/" className='voltar'>Voltar</Link>
                </div>
            </form>
        )
    }

}

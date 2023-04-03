import { useState } from 'react';
import SneakerTecLogo from '../assets/imgs/SneakerTecLogo.png';
import './login.css';


export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>

    <div className="container">
        <div className="container-login">
            <div className="wrap-login">
                <form className="login-form">
                    <h1 className="login-form-title">
                        Bem vindo!
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
                        <a href="#" className="text2">Criar conta.</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
  );
}


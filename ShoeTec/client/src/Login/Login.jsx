import { useEffect, useState } from 'react';
import {Link} from "react-router-dom"
// import LoginFrom from './LoginForm.jsx'
import SneakerTecLogo from '../assets/imgs/SneakerTecLogo.png';
import './login.css';
// import LoginForm from './LoginForm.jsx';


export function Login() {
    const [estadoLogin, setEstadoLogin] = useState(true)
    const [credenciais, setCredenciais] = useState({esporte: []})

    // Função para adicionar o input as credenciais
    const handleCredenciais = (e) =>{
        const nome = e.target.name
        const valor = e.target.value

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
                <span className="focus-input" data-placeholder="País*"></span>
            </div>

            <div className="wrap-input-cadastro">
                <input 
                className = {credenciais.estado !== "" ? 'has-val input' : 'input'}
                type = "text"
                name = 'estado'
                value = {credenciais.estado}
                onChange = {e => handleCredenciais(e)}
                />
                <span className="focus-input" data-placeholder="Estado*"></span>
            </div>

            <div className="wrap-input-cadastro">
                <input 
                className = {credenciais.cidade !== "" ? 'has-val input' : 'input'}
                type = "text"
                name = 'cidade'
                value = {credenciais.cidade}
                onChange = {e => handleCredenciais(e)}
                />
                <span className="focus-input" data-placeholder="Cidade*"></span>
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
                <h3 className='titulo-genero'>Gênero</h3>

                <p className='input-p'>
                <input 
                className = 'input-btn'
                id="masc"
                name="genero"
                type = "radio"
                value = {"M"}
                />
                <label className="label-radio"  for="masc">Masculino</label>
                </p>

                <p className='input-p'>
                <input 
                className = 'input-btn'
                id="fem"
                name="genero"
                type = "radio"
                value = {"F"}
                />
                <label className="label-radio" for="fem">Feminino</label>
                </p>

                <p className='input-p'>
                <input 
                className = 'input-btn'
                id="outro"
                name="genero"
                type = "radio"
                value = {"O"}
                />
                <label className="label-radio" for="outro">Outro</label>
                </p>

                <p className='input-p'>
                <input 
                className = 'input-btn'
                id="naoidentificado"
                name="genero"
                type = "radio"
                value = {"N"}
                />
                <label className="label-radio" for="naoidentificado">Não quero identificar</label>
                </p>
            </div>

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

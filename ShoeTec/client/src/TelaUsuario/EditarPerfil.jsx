import { useState, useEffect } from "react";
// import BarraSuperior from '../componentes/BarraSuperior/barra-superior'
import BarraNav from "../componentes/BarraNav/BarrabNav";
import Userfoto from '../assets/imgs/arthur.jpg';
import api from "../services/api";
import './tela-usuario.css'
import './editar-perfil.css'
import Cookies from "js-cookie";
import postCred from '../Login/postCred.js';
import inputValidation from '../Login/inputValidation.js';
import Popup from 'reactjs-popup';
import { Link } from "react-router-dom"

export function EditarPerfil() {
    const [User, setUser] = useState({})

    const [ultimosPosts, setUltimosPosts] = []
    const [AsicsNovablast, setAsicsNovablast] = useState("Tênis Asics Novablast")
    const [DescricaoComentario, setDescricaoComentario] = useState("O tênis apresenta um bom amortecimento, mas peca quanto à estabilidade.")

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
                        <Link to={`/TelaUsuario/${Cookies.get("id")}`} className='voltar-popup'>Voltar</Link>
                    </div>
                </div>
            </Popup>

            <div className="container-tela-usuario">
                <BarraNav />
                <div className="space">🥚🐰</div>
                <div className="container-content">
                    <EditarUsuario
                        cred={credenciais}
                        setCred={handleCredenciais}
                        estadoLog={estadoLogin}
                        setEstadoLog={setEstadoLogin}
                        setPopupOpen={setPopupOpen}
                        setMensagemQuery={setMensagemQuery} />
                    <ListaComentarios />
                </div>
            </div>
        </>
    )


    InputFormEdit.deafaultProps = {
        tipo: "text",
        steps: [''],
        var: ""
    }

    function InputFormEdit(props) {
        const [warning, setWarning] = useState(undefined)
        const nome = props.nome
        const steps = props.steps

        if (props.tipo != "checkbox" && props.tipo != "radio") {
            return (
                <>
                    <div className="wrap-input-editar">
                        <input
                            className={!props.var ? 'input-edit' : props.var == "" ? 'input-edit' : 'has-val input-edit'}
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
                        <span className="focus-input-edit" data-placeholder={props.placeholder}></span>
                    </div>
                    <div className='wrap-warning'>
                        {warning}
                    </div>
                </>
            )
        } else if (props.tipo == "radio") {
            return (
                <div className="wrap-input-editar" onChange={e => props.handleInput(e, setWarning)}>
                    <h3 className='titulo-genero-edit'>{props.titulo}</h3>
                    {props.membros.map(
                        v => {
                            return (
                                <p className='input-p-edit'>
                                    <input
                                        className='input-btn-edit'
                                        id={v.id}
                                        name={props.nome}
                                        type="radio"
                                        value={v.genero}
                                    />
                                    <label className="label-radio-edit" for={v.id}>{v.label}</label>
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
            return (
                <div className="wrap-input-editar">
                    <h3 className='titulo-genero-edit'>{props.titulo}</h3>
                    {props.membros.map(
                        v => {
                            return (
                                <p className='input-p-edit'>
                                    <input
                                        className='input-btn-edit'
                                        id={v.id}
                                        name={props.nome}
                                        type="checkbox"
                                        value={v.valor}
                                        onChange={e => props.handleInput(e, setWarning)}
                                    />
                                    <label className="label-radio-edit" for={v.id}>{v.label}</label>
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

    function EditarUsuario(props) {
        const isLogged = Cookies.get('loggedIn')

        const credenciais = props.cred
        const handleCredenciais = props.setCred
        const estadoLogin = props.estadoLog
        const setEstadoLogin = props.setEstadoLog
        const setPopupOpen = props.setPopupOpen
        const setMensagemQuery = props.setMensagemQuery

        const editar = async (e) => {
            e.preventDefault()

            const id = Cookies.get('id');
            const credenciaisComId = {
                ...credenciais,
                id: id,
            };
            const queryResult = await postCred.updateUsuario(credenciaisComId)

        

            //Por enquanto, um alert será usado; mudar depois
            if (queryResult.status > 200 && queryResult.status < 300) {
                console.log(queryResult)
                setPopupOpen(true)
                setMensagemQuery(`Perfil editado com sucesso!\nCod: ${queryResult.status}`)
                setEstadoLogin(true)

            } else {
                console.log(queryResult)
                setPopupOpen(true)
                setMensagemQuery(`Falha ao editar perfil.\nRazão: ${queryResult.response.data.error.details[0].message} \nCod: ${queryResult.response.status}`)
            }
        }

        return (
            <div className="editar-container">
                <div className="perfil-editar-foto">
                    <img className="user-editar-foto" src={User.picture ? User.picture : Userfoto} alt="Foto Usuário"></img>
                </div>
                <form className="editar-form">
                    <h1 className="cad-form-edit-title">
                        Editar Perfil:
                    </h1>

                    <InputFormEdit
                        nome={"name"}
                        handleInput={handleCredenciais}
                        placeholder={"Nome"}
                        var={credenciais.name}
                        steps={[{ function: inputValidation.required }]}
                    />

                    <InputFormEdit
                        nome={"bio"}
                        handleInput={handleCredenciais}
                        placeholder={"Biografia"}
                        var={credenciais.bio}
                        steps={[{ function: inputValidation.required }]}
                    />

                    <InputFormEdit
                        nome={"pais"}
                        handleInput={handleCredenciais}
                        placeholder={"País"}
                        var={credenciais.pais}
                        steps={[{ function: inputValidation.required }]}
                    />

                    <InputFormEdit
                        nome={"estado"}
                        handleInput={handleCredenciais}
                        placeholder={"Estado*"}
                        var={credenciais.estado}
                    />

                    <InputFormEdit
                        nome={"cidade"}
                        handleInput={handleCredenciais}
                        placeholder={"Cidade*"}
                        var={credenciais.cidade}
                    />



                    <InputFormEdit membros={[
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
                        titulo={"Gênero:"}
                        handleInput={handleCredenciais}
                        nome={"genero"}
                    />

                    <InputFormEdit
                        tipo={"checkbox"}
                        titulo={"Esportes que você pratica:"}
                        handleInput={handleCredenciais}
                        nome={"esporte"}
                        membros={[
                            {
                                id: "futebol",
                                valor: "futebol",
                                label: "Futebol"
                            },
                            {
                                id: "futsal",
                                valor: "futsal",
                                label: "Futsal"
                            },
                            {
                                id: "corrida",
                                valor: "corrida",
                                label: "Corrida"
                            },
                            {
                                id: "volei",
                                valor: "voleibal",
                                label: "Voleibal"
                            },
                            {
                                id: "basquete",
                                valor: "basquete",
                                label: "Basquete"
                            },
                            {
                                id: "tenis",
                                valor: "tenis",
                                label: "Tênis"
                            },
                            {
                                id: "handebol",
                                valor: "handebol",
                                label: "Handebol"
                            },
                            {
                                id: "musculacao",
                                valor: "musculacao",
                                label: "Musculação"
                            },
                        ]}
                    />

                    <div className="container-edit-form-btn">
                        <button className="login-edit-btn-cad" onClick={(e) => editar(e)} type='submit'>Salvar</button>
                    </div>
                </form>
            </div>
        )
    }

    function ListaComentarios() {
        return (
            <div className="comentarios-container">
                <h2 className="titulo-comentario">Reviews:</h2>
                <ol className="lista-comentario">

                    <li className="li-lista-comentario">
                        <div class="comentario-user">
                            <div className="cabecalho-comentario">
                                <a className="calcado-review-user" href='#'>
                                    <span className="calcado">{AsicsNovablast}</span>
                                </a>
                            </div>
                            <p className="descricao-comentario">
                                {DescricaoComentario}
                            </p>
                        </div>
                    </li>

                    <li className="li-lista-comentario">
                        <div className="comentario-user">
                            <div class="cabecalho-comentario">
                                <a className="calcado-review-user" href='#'>
                                    <span className="calcado">{AsicsNovablast}</span>
                                </a>
                            </div>
                            <p className="descricao-comentario">
                                {DescricaoComentario}
                            </p>
                        </div>
                    </li>

                </ol>
            </div>
        )

        function Posts() {
            return (
                <div className="post">
                    Teste
                </div>
            )
        }
    }

}
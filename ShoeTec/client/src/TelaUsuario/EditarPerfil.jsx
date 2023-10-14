import { useState, useEffect } from "react";
import BarraNav from "../componentes/BarraNav/BarrabNav";
import Userfoto from '../assets/imgs/arthur.jpg';
import { api, getUser } from "../services/api";
import { getCommentsByUser } from "../services/api";
import './tela-usuario.css'
import './editar-perfil.css'
import Cookies from "js-cookie";
import postCred from '../Login/postCred.js';
import inputValidation from '../Login/inputValidation.js';
import Popup from 'reactjs-popup';
import { Link } from "react-router-dom"

export function EditarPerfil() {
    const [session, setSession] = useState({
        user: {
            userid: 0
        }
    })

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
        getUser()
            .then(
                (value) => {
                    console.log(value)
                    setSession(value.user)
                },
                (reason) => {
                    console.log(reason)
                })
            .catch((reason) => {
                console.log(reason)
            })

        try {
            api.get(`/getUser/${session.userid}`)
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
    }, []);


    const editar = async (e) => {
        e.preventDefault()

        const id = session.userid;
        const credenciaisComId = {
            ...credenciais,
            id: id,
        };
        const queryResult = await postCred.updateUsuario(credenciaisComId)

        // Por enquanto, um alert será usado; mudar depois
        if (queryResult.status > 199 && queryResult.status < 500) {
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
                        <Link to={`/TelaUsuario/${session.userid}`} className='voltar-popup'>Voltar</Link>
                    </div>
                </div>
            </Popup>

            <div className="container-tela-usuario">
                <BarraNav />
                <div className="space">🥚🐰</div>
                <div className="container-content">
                    <div className="editar-container">
                        <div className="perfil-editar-foto">
                            {/* <img className="user-editar-foto" src={User.picture != null || User.picture != undefined ? User.picture : Userfoto} alt="Foto Usuário"></img> */}
                        </div>
                        <form className="editar-form">
                            <h1 className="cad-form-edit-title">
                                Editar Perfil:
                            </h1>

                            <div className="wrap-input-editar">
                                <input
                                    className={!credenciais.name ? 'input-edit' : credenciais.name === "" ? 'input-edit' : 'has-val input-edit'}
                                    type="text"
                                    name="name"
                                    value={credenciais.name}
                                    onChange={(e) => handleCredenciais(e)}
                                    required
                                />
                                <span className="focus-input-edit" data-placeholder="Nome*"></span>
                            </div>
                            <div className='wrap-warning'>
                                
                            </div>

                            <div className="wrap-input-editar">
                                <input
                                    className={!credenciais.bio ? 'input-edit' : credenciais.bio === "" ? 'input-edit' : 'has-val input-edit'}
                                    type="text"
                                    name="bio"
                                    value={credenciais.bio}
                                    onChange={(e) => handleCredenciais(e)}
                                    required
                                />
                                <span className="focus-input-edit" data-placeholder="Biografia*"></span>
                            </div>
                            <div className='wrap-warning'>
                                
                            </div>

                            <div className="wrap-input-editar">
                                <input
                                    className={!credenciais.pais ? 'input-edit' : credenciais.pais === "" ? 'input-edit' : 'has-val input-edit'}
                                    type="text"
                                    name="pais"
                                    value={credenciais.pais}
                                    onChange={(e) => handleCredenciais(e)}
                                    required
                                />
                                <span className="focus-input-edit" data-placeholder="País*"></span>
                            </div>
                            <div className='wrap-warning'>
                                
                            </div>

                            <div className="wrap-input-editar">
                                <input
                                    className={!credenciais.estado ? 'input-edit' : 'has-val input-edit'}
                                    type="text"
                                    name="estado"
                                    value={credenciais.estado}
                                    onChange={(e) => handleCredenciais(e)}
                                />
                                <span className="focus-input-edit" data-placeholder="Estado*"></span>
                            </div>
                            <div className='wrap-warning'>
                                
                            </div>

                            <div className="wrap-input-editar">
                                <input
                                    className={!credenciais.cidade ? 'input-edit' : 'has-val input-edit'}
                                    type="text"
                                    name="cidade"
                                    value={credenciais.cidade}
                                    onChange={(e) => handleCredenciais(e)}
                                />
                                <span className="focus-input-edit" data-placeholder="Cidade*"></span>
                            </div>
                            <div className='wrap-warning'>
                                
                            </div>

                            <h3 className='titulo-genero-edit'>Gênero*: </h3>
                            <div className="wrap-input-editar" onChange={(e) => handleCredenciais(e)}>
                                <p className='input-p-edit'>
                                    <input
                                        className='input-btn-edit'
                                        id="masc"
                                        name="genero"
                                        type="radio"
                                        value="M"
                                    />
                                    <label className="label-radio-edit" for="masc">Masculino</label>
                                </p>
                                <p className='input-p-edit'>
                                    <input
                                        className='input-btn-edit'
                                        id="fem"
                                        name="genero"
                                        type="radio"
                                        value="F"
                                    />
                                    <label className="label-radio-edit" for="fem">Feminino</label>
                                </p>
                                <p className='input-p-edit'>
                                    <input
                                        className='input-btn-edit'
                                        id="outro"
                                        name="genero"
                                        type="radio"
                                        value="O"
                                    />
                                    <label className="label-radio-edit" for="outro">Outro</label>
                                </p>
                                <p className='input-p-edit'>
                                    <input
                                        className='input-btn-edit'
                                        id="naoindentifico"
                                        name="genero"
                                        type="radio"
                                        value="N"
                                    />
                                    <label className="label-radio-edit" for="naoindentifico">Prefiro não identificar</label>
                                </p>
                            </div>
                            <div className='wrap-warning'>
                                
                            </div>

                            <h3 className='titulo-genero-edit'>Esportes que você pratica*:</h3>
                            <div className="wrap-input-editar">
                                <p className='input-p-edit'>
                                    <input
                                        className='input-btn-edit'
                                        id="futebol"
                                        name="esporte"
                                        type="checkbox"
                                        value="futebol"
                                        onChange={(e) => handleCredenciais(e)}
                                    />
                                    <label className="label-radio-edit" for="futebol">Futebol</label>
                                </p>
                                <p className='input-p-edit'>
                                    <input
                                        className='input-btn-edit'
                                        id="futsal"
                                        name="esporte"
                                        type="checkbox"
                                        value="futsal"
                                        onChange={(e) => handleCredenciais(e)}
                                    />
                                    <label className="label-radio-edit" for="futsal">Futsal</label>
                                </p>
                                <p className='input-p-edit'>
                                    <input
                                        className='input-btn-edit'
                                        id="corrida"
                                        name="esporte"
                                        type="checkbox"
                                        value="corrida"
                                        onChange={(e) => handleCredenciais(e)}
                                    />
                                    <label className="label-radio-edit" for="corrida">Corrida</label>
                                </p>
                                <p className='input-p-edit'>
                                    <input
                                        className='input-btn-edit'
                                        id="volei"
                                        name="esporte"
                                        type="checkbox"
                                        value="voleibal"
                                        onChange={(e) => handleCredenciais(e)}
                                    />
                                    <label className="label-radio-edit" for="volei">Voleibal</label>
                                </p>
                                <p className='input-p-edit'>
                                    <input
                                        className='input-btn-edit'
                                        id="basquete"
                                        name="esporte"
                                        type="checkbox"
                                        value="basquete"
                                        onChange={(e) => handleCredenciais(e)}
                                    />
                                    <label className="label-radio-edit" for="basquete">Basquete</label>
                                </p>
                                <p className='input-p-edit'>
                                    <input
                                        className='input-btn-edit'
                                        id="tenis"
                                        name="esporte"
                                        type="checkbox"
                                        value="tenis"
                                        onChange={(e) => handleCredenciais(e)}
                                    />
                                    <label className="label-radio-edit" for="tenis">Tênis</label>
                                </p>
                                <p className='input-p-edit'>
                                    <input
                                        className='input-btn-edit'
                                        id="handebol"
                                        name="esporte"
                                        type="checkbox"
                                        value="handebol"
                                        onChange={(e) => handleCredenciais(e)}
                                    />
                                    <label className="label-radio-edit" for="handebol">Handebol</label>
                                </p>
                                <p className='input-p-edit'>
                                    <input
                                        className='input-btn-edit'
                                        id="musculacao"
                                        name="esporte"
                                        type="checkbox"
                                        value="musculacao"
                                        onChange={(e) => handleCredenciais(e)}
                                    />
                                    <label className="label-radio-edit" for="musculacao">Musculação</label>
                                </p>                                
                            </div>
                            <div className='wrap-warning'>
                                
                            </div>

                            <div className="container-edit-form-btn">
                                <button className="login-edit-btn-cad" onClick={(e) => editar(e)} type='submit'>Salvar</button>
                            </div>
                        </form>
                    </div>
                    <ListaComentarios />
                </div>
            </div>
        </>
    )
}


function TelaComentario({ tenisName, descricao }) {
    const [tenisNome, setTenisNome] = useState("");

    useEffect(() => {
        api.get(`/tenisId/${tenisName}`)
            .then((res) => {
                console.log(res);
                setTenisNome(res.data[0].nome);
            })
            .catch((error) => {
                console.error("Erro ao buscar o nome do tênis:", error);
            });
    }, [tenisName]);


    return (
        <div className="comentario-user">
            <div className="cabecalho-comentario">
                <a className="a-cabecalho-comentario">
                    <Link className="calcado-review-user" to={`/TelaTenis/${tenisName}`}>{tenisNome}</Link>
                </a>
            </div>
            <p className="descricao-comentario">{descricao}</p>
        </div>
    );
}

function ListaComentarios() {
    const [comments, setComments] = useState([]);
    const [session, setSession] = useState({
        user: {
            userid: 0
        }
    })

    useEffect(() => {
        getUser()
            .then(
                (value) => {
                    console.log(value)
                    setSession(value.user)
                },
                (reason) => {
                    console.log(reason)
                })
            .catch((reason) => {
                console.log(reason)
            })
        getCommentsByUser(`${session.userid}`)
        .then((result) => {
            setComments(result);
        })
        .catch((err) => {
            console.log(err);
        });
}, [`${session.userid}`]);

    return (
        <div className="comentarios-container">
            <h2 className="titulo-comentario">Reviews:</h2>
            <ol className="lista-comentario">
                {comments.map((comment, index) => (
                    <li className="li-lista-comentario" key={index}>
                        <TelaComentario
                            tenisName={comment.tenis_id}
                            descricao={comment.corpo_texto}
                        />
                    </li>
                ))}
            </ol>
        </div>
    );
}

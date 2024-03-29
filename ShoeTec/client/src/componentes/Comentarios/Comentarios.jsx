import { React, useState, useEffect } from "react";
import {api, URL} from "../../services/api";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import EnviarIcon from '../../assets/icons/enviar.png'
import CancelarIcon from '../../assets/icons/cancelar.png'
import ExcluirIcon from '../../assets/icons/excluir.png'
import ResponderIcon from '../../assets/icons/responder.png'
import MostrarIcon from '../../assets/icons/mostrar.png'
import OcultarIcon from '../../assets/icons/ocultar.png'
import Userpic from '../../assets/imgs/userpic.jpg'
import './comentarios.css';


const Comentarios = ({ inheritedComments = [], tenisId = 0, user = {
    user: {
        username: '',
        userid: null,
        genero: '',
        authenticated: false
    }}, isLogged = false }) => {

    const [comments, setComments] = useState([]);
    const [currentComment, setCurrentComment] = useState({ corpo_texto: '', subComments: [] });
    const [expanded, setExpanded] = useState(false);
    const [expandirMap, setExpandirMap] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        console.log(user)
        console.log(isLogged)

        setComments(inheritedComments);
    }, [inheritedComments, user]);


    const updateCurrentComment = (e) => {
        console.log(e.target.value);
        setCurrentComment({ corpo_texto: e.target.value, subComments: [] });
    };

    const addComment = async (e) => {
        e.preventDefault();
        setCurrentComment(currentComment);
        const res = await api.post('/comment', {
            nota: 3,
            corpo: currentComment.corpo_texto,
            reviewerId: user.userid,
            parenteId: null,
            tenisId: tenisId
        });
        console.log(res);
        const newComment = {
            ...currentComment,
            review_id: res.data.result.insertId,
            reviewer_id: user.userid,
            reviewer_name: user.username,
            reviewer_pic:   user.pic
        };
        console.log(newComment)
        setComments([newComment, ...comments]);
        setCurrentComment({ corpo_texto: '', subComments: [] }); // Clear the input field after adding the comment
    };

    const handleMostrarMaisClick = () => {
        setExpanded(!expanded);
    };

    const handleMostrarSubClick = (value) => {
        setExpandirMap({
            ...expandirMap,
            [value.review_id]: !expandirMap[value.review_id]
        });
    };

    const excluirComentario = async (e, value) => {
        e.preventDefault()
        console.log(`Id do comentario: ${value.review_id}`)
        api.get(`/deleteComment/${value.review_id}`, { withCredentials: true })
            .then((res) => {
                console.log(res)
            })
    }

    //---------------------------------------------------------
    //REPLY COMPONENT
    //---------------------------------------------------------

    const ReplyComponent = (props) => {
        let parentComment = props.parent;
        const [currentComment, setCurrentComment] = useState({ corpo_texto: "", subComments: [] });
        const [isHidden, setIsHidden] = useState(false);
        const [comments, setComments] = useState(parentComment.subComments);

        useEffect(() => {
            // console.log(comments)
        })

        const updateCurrentComment = (e) => {
            setCurrentComment({ corpo_texto: e.target.value, subComments: [] });
        };

        const addComment = async (e) => {
            e.preventDefault();
            setCurrentComment(currentComment);
            const res = await api.post('/comment', {
                nota: 3,
                corpo: currentComment.corpo_texto,
                reviewerId: user.userid,
                parenteId: parentComment.review_id,
                tenisId: tenisId
            });
            console.log(res);
            const newComment = {
                ...currentComment,
                review_id: res.data.result.insertId,
                reviewer_id: user.userid,
                reviewer_name: user.username,
                reviewer_pic:  user.pic
            };
            console.log(newComment)
            parentComment.subComments = [...parentComment.subComments, newComment]
            console.log(parentComment)
            setComments([newComment, ...comments]);
            setCurrentComment({ corpo_texto: '', subComments: [] }); // Clear the input field after adding the comment
        };

        return (
            <div className="opcoes-mensagens">
                {user.authenticated && (
                    <>
                        {isHidden ? (
                            <div className="container-comentario-responder">
                                <input
                                    className="reply"
                                    placeholder="Comentar"
                                    value={currentComment.corpo_texto}
                                    onChange={e => updateCurrentComment(e)}
                                    onKeyDown={e=> {if (e.key === "Enter") {addComment(e)}}}
                                />
                                <div className="buttons-coment">
                                    <button className="button" onClick={e => { setIsHidden(!isHidden) }}>
                                        <img className='img-button cancel' src={CancelarIcon} alt="Cancelar" />
                                    </button>
                                    <button className="button" onClick={e => addComment(e)}>
                                        <img className='img-button envit' src={EnviarIcon} alt="Enviar" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="container-coment-init">
                                <button className='button-coment-init' onClick={e => setIsHidden(!isHidden)}>
                                    <img className='responder' src={ResponderIcon} alt="Responder" />
                                    Responder
                                </button>
                            </div>
                        )}
                    </>
                )}
                {comments.map((value, key) => {
                    return (
                        <>
                            <div key={key} className="conteiner-comentario sub-comentario">
                                <div className="comentario-img-user">
                                    <img className="img-usuario" src={value.reviewer_pic ? URL + "/images/" + value.reviewer_pic : Userpic} alt="Foto do Usuário" />
                                </div>
                                <div className="comentario-texto-info">
                                    <Link to={`/TelaUsuario/${value.reviewer_id}`} className="comentario-texto-titulo">
                                        {`${value.reviewer_name}`}
                                    </Link>
                                    {value.deletado ?
                                        <div>
                                            [EXCLUIDO]
                                        </div>
                                        :
                                        <div className="comentario-texto">
                                            {value.corpo_texto.length > 500 && !expanded
                                                ? value.corpo_texto.slice(0, 500) + "..."
                                                : value.corpo_texto}
                                        </div>
                                    }

                                    {value.corpo_texto.length > 500 && (
                                        <span className='button-text-mostrar' onClick={handleMostrarMaisClick}>
                                            {expanded ? "Mostrar Menos" : "Mostrar Mais..."}
                                        </span>
                                    )}

                                    {value.reviewer_id === user.userid || user.admin == 1 ?
                                        <div className="excluir-button">
                                            <button className="button excluir-btn" onClick={e => excluirComentario(e, value)}>
                                                <img className="excluir" src={ExcluirIcon} alt="Excluir" />
                                                <p className="text-align-excluir">
                                                    <span className="text-excluir">Excluir</span>
                                                </p>
                                            </button>
                                        </div>
                                    : undefined}
                                </div>
                            </div>
                            <div className="replycoment-comentario-sub">
                                <ReplyComponent parent={value} />
                            </div>
                        </>
                    )
                })}
            </div>
        )
    }

    //---------------------------------------------------------
    // END REPLY COMPONENT
    //---------------------------------------------------------

    return (
        <div className="main-container">
            {isLogged ?
                <div>
                    <h1 className="title-coment">
                        Comentários
                    </h1>
                    <div className="container-comentario-init">
                        <input
                            className="reply-init"
                            placeholder="Comentar"
                            value={currentComment.corpo_texto}
                            onChange={e => updateCurrentComment(e)}
                            onKeyDown={e=> {if (e.key === "Enter") {addComment(e)}}}
                        />
                        <button className="button" onClick={e => addComment(e)}>
                            <img className='img-button envit' src={EnviarIcon} alt="Enviar" />
                        </button>
                    </div>
                </div>
                :
                <div className="container-comentario">
                    <h3>
                        Faça <Link to="/Login">Login</Link> para comentar
                    </h3>
                </div>}
            <div>
                {comments.map((value, key) => {
                    return (
                        <>
                            <div key={key} className="container-comentario">
                                <div className="comentario-img-user">
                                    <img className="img-usuario" src={value.reviewer_pic ? URL + "/images/" + value.reviewer_pic : Userpic} alt="Foto do Usuário" onClick={e=>navigate(`/TelaUsuario/${value.reviewer_id}`)} />
                                    {/* {value.reviewer_id} */}
                                </div>
                                <div className="comentario-texto-info">
                                    <Link to={`/TelaUsuario/${value.reviewer_id}`} className="comentario-texto-titulo">
                                        {`${value.reviewer_name}`}
                                    </Link>
                                    {!value.deletado ?
                                        <div className="comentario-texto">
                                            {value.corpo_texto.length > 500 && !expanded
                                                ? value.corpo_texto.slice(0, 500) + "..."
                                                : value.corpo_texto}
                                        </div>
                                        :
                                        <div>
                                            [EXCLUIDO]
                                        </div>
                                    }
                                    {value.corpo_texto.length > 500 && (
                                        <span className="button-text-mostrar" onClick={handleMostrarMaisClick}>
                                            {expanded ? "Mostrar Menos" : "Mostrar Mais..."}
                                        </span>
                                    )}
                                    {value.reviewer_id === user.userid || user.admin == 1 ?
                                        <div className="excluir-button">
                                            <button className="button excluir-btn" onClick={e => excluirComentario(e, value)}>
                                                <img className="excluir" src={ExcluirIcon} alt="Excluir" />
                                                <p className="text-align-excluir">
                                                    <span className="text-excluir">Excluir</span>
                                                </p>
                                            </button>
                                        </div>
                                    : undefined}

                                </div>
                                {value.subComments.length > 0 && (
                                    <button className="button-ocultarmostrar"  onClick={() => handleMostrarSubClick(value)}>
                                        <img className='responder' src={expandirMap[value.review_id] ? MostrarIcon : OcultarIcon} alt={expandirMap[value.review_id] ? "Mostrar" : "Ocultar"} />
                                        <span className='text-btn-ocultmost'>{expandirMap[value.review_id] ? "Mostrar Subcomentários" : "Ocultar Subcomentários"}</span>
                                    </button>
                                )}
                            </div>

                            {!expandirMap[value.review_id] && (
                                <div className="replycoment-comentario">
                                    <ReplyComponent parent={value} />
                                </div>
                            )}
                        </>
                    );
                })}
            </div>
        </div>
    )
}


export default Comentarios
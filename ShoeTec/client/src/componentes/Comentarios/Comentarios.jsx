import { React, useState, useEffect } from "react";
import api from "../../services/api";
import './comentarios.css';
import { Link, useMatch } from "react-router-dom";
import Cookies from "js-cookie";
import EnviarIcon from '../../assets/icons/enviar.png'
import CancelarIcon from '../../assets/icons/cancelar.png'
import Userpic from '../../assets/imgs/userpic.jpg'

const Comentarios = ({inheritedComments = [], tenisId=0, user={ user: {
      username: '',
      userid: null,
      genero: '',
      authenticated: false
    }}, isLogged = false}) =>{
    const [comments, setComments] = useState([]);
    const [currentComment, setCurrentComment] = useState({ comment: '', subComments: [] });
    const [expanded, setExpanded] = useState(false);
    const [reviewerInfo, setReviewerInfo] = useState(user);

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
        try {
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
            setCurrentComment(currentComment.review_id = res.data.result.insertId)
            setComments([currentComment, ...comments]);
        } catch (err) {
            window.alert("Ocorreu um erro");
        }
    };

    const handleMostrarMaisClick = () => {
        setExpanded(!expanded);
    };
    const excluirComentario = async (e, value) => {
        e.preventDefault()
        console.log(`Id do comentario: ${value.review_id}`)
        const res = await api.get(`/deleteComment/${value.review_id}`)
        .then(
            console.log(res)

        )
    }

    const ReplyComponent = (props) => {
        const parentComment = props.parent;
        const [currentComment, setCurrentComment] = useState({ comment: "", subComments: [] });
        const [isHidden, setIsHidden] = useState(false);
        const [comments, setComments] = useState(parentComment.subComments);

        useEffect(()=>{
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
            setCurrentComment(currentComment.review_id = res.data.result.insertId)
            setComments([currentComment, ...comments]);
        };

        return (
            <div>
                {user.authenticated && (
                    <>
                        {isHidden ? (
                            <div className="container-comentario">
                                <input
                                    className="reply"
                                    placeholder="Comentar"
                                    value={currentComment.corpo_texto}
                                    onChange={e => updateCurrentComment(e)}
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
                            <div>
                                <button className='button-coment-init' onClick={e => setIsHidden(!isHidden)}>Responder</button>
                            </div>
                        )}
                    </>
                )}
                {comments.map((value, key) => {
                    return (
                        <div key={key} className="conteiner-comentario sub-comentario">
                            <div className="comentario-texto-titulo">
                                {`${value.reviewer_name}`}
                            </div>
                            { value.deletado ?
                            <div>
                                [EXCLUIDO]    
                            </div>
                            :
                            <div>{value.corpo_texto.length > 500 && !expanded
                                ? value.corpo_texto.slice(0, 500) + "..."
                                : value.corpo_texto}
                            </div>
                            }
                            {value.corpo_texto.length > 500 && (
                                <span className='button-text-mostrar' onClick={handleMostrarMaisClick}>
                                    {expanded ? "Mostrar Menos" : "Mostrar Mais..."}
                                </span>
                            )}
                            {/* <button className="button" onClick={}></button> */}
                            <ReplyComponent parent={value} />
                        </div>
                    )
                })}
            </div>
        )}


    return (
        <div className="main-container">
            {isLogged?
            <div>
                <h1 className="title-coment">
                    Comentários
                </h1>
                <div className="container-comentario-init">
                    <input
                        className="reply-init"
                        placeholder="Comentar"
                        value={currentComment.comment}
                        onChange={e => updateCurrentComment(e)}
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
                                <img className="img-usuario" src={Userpic} alt="Foto do Usuário" />
                            </div>
                            <div className="comentario-texto-info">
                                <div className="comentario-texto-titulo">{`${value.reviewer_name}`}</div>
                                <div className="comentario-texto">
                                    {value.corpo_texto.length > 500 && !expanded
                                        ? value.corpo_texto.slice(0, 500) + "..."
                                        : value.corpo_texto}
                                </div>
                                {value.corpo_texto.length > 500 && (
                                    <span className="button-text-mostrar" onClick={handleMostrarMaisClick}>
                                        {expanded ? "Mostrar Menos" : "Mostrar Mais..."}
                                    </span>
                                )}
                            <button onClick={e=>excluirComentario(e, value)}> Excluir </button>
                            </div> 
                            </div>
                            <div className="replycoment-comentario">
                                <ReplyComponent parent={value} />
                            </div>
                       </>
                    );
                })}
            </div>
        </div>
    )
}


export default Comentarios
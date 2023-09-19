import { React, useState, useEffect } from "react";
import api from "../../services/api";
import './comentarios.css';
import { useMatch } from "react-router-dom";
import Cookies from "js-cookie";

export default function Comentarios(props) {
    const [comments, setComments] = useState([]);
    const [currentComment, setCurrentComment] = useState({ comment: '', subComments: [] });
    const inheritedComments = props.comments;
    const tenisId = props.tenisId;

    useEffect(() => {
        setComments(inheritedComments);
    }, [inheritedComments]);

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
                reviewerId: Cookies.get('id'),
                parenteId: null,
                tenisId: tenisId
            });
            console.log(res);
            setComments([currentComment, ...comments]);
        } catch (err) {
            window.alert("Ocorreu um erro");
        }
    };

    const ReplyComponent = (props) => {
        const parentComment = props.parent;
        const [currentComment, setCurrentComment] = useState({ comment: "", subComments: [] });
        const [isHidden, setIsHidden] = useState(false);
        const [comments, setComments] = useState(parentComment.subComments);

        const updateCurrentComment = (e) => {
            setCurrentComment({ corpo_texto: e.target.value, subComments: [] });
        };

        const addComment = async (e) => {
            e.preventDefault();
            setCurrentComment(currentComment);
            const res = await api.post('/comment', {
                nota: 3,
                corpo: currentComment.corpo_texto,
                reviewerId: Cookies.get('id'),
                parenteId: parentComment.review_id,
                tenisId: tenisId
            });
            console.log(res);
            setComments([currentComment, ...comments]);
        };

        return (
            <div>
                {isHidden ? (
                    <div className="container-comentario">
                        <input
                            className="reply"
                            placeholder="Comentar"
                            value={currentComment.corpo_texto}
                            onChange={e => updateCurrentComment(e)}
                        />
                        <button className="button" onClick={e => addComment(e)}>Comentar</button>
                        <button className="button" onClick={e => { setIsHidden(!isHidden) }}>Cancelar</button>
                    </div>
                ) : (
                    <div>
                        <button onClick={e => setIsHidden(!isHidden)}>Responder</button>
                    </div>
                )}
                {comments.map((value, key) => {
                    return (
                        <div key={key} className="conteiner-comentario sub-comentario">
                            <div>{value.corpo_texto}</div>
                            {/* <button className="button" onClick={}></button> */}
                            <ReplyComponent
                                parent={value}
                            />
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="main-container">
            <div>
                <h1>
                    Comentários
                </h1>
                <div className="container-comentario">
                    <input
                        className="reply"
                        placeholder="Comentar"
                        value={currentComment.comment}
                        onChange={e => updateCurrentComment(e)}
                    />
                    <button className="button" onClick={e => addComment(e)}>Comentar</button>
                </div>
            </div>
            <div>
                {comments.map((value, key) => {
                    return (
                        <div key={key} className="container-comentario">
                            <div >{value.corpo_texto}</div>
                            <ReplyComponent
                                parent={value}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

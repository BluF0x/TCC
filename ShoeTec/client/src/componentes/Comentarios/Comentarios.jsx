import {React, useState, useEffect, useCallback, useMemo} from "react";
import api from "../../services/api";
import './comentarios.css'
import { useMatch } from "react-router-dom";


/* Tem alguns jeitos de organizar os comentários e sub-comentários 
 * 1: pegar todos os comentários como um array e usar uma função 
 * para filtrar os comentários que tem o parent_id igual ao id do
 * comentário pai, isso é feito em TODOS os comentários; provavelmente
 * ineficiente
 * 2: usando statements do sql, é só pegar todos ou quase todos os comentários
 * que possúem o parent_id igual ao id do pai, esse método concede mais controle, 
 * porém faz mais calls a database
 * 
*/

export default function Comentarios(props) {
    const referenceId = props.referenceId
    let bufferComment = []

    const [comments, setComments] = useState([])
    const [currentComment, setCurrentComment] = useState({ comment: '', subComments: [] });
    let isDone = false

    useEffect(()=>{
        if (!isDone) {
            api.get(`/topComments/${referenceId}`)
            .then((res)=>{
                const comentarios = res.data.Resultado
                comentarios.forEach(element => {
                    bufferComment = [...bufferComment, 
                        {
                            comment: element.corpo_texto, 
                            subComments: [],
                            id: element.review_id,
                            user:  element.reviewer_id
                        }]
                    console.log(bufferComment)
                });
                setComments(bufferComment)
            }) 
            isDone = true
        }
    },[referenceId])

    const updateCurrentComment = useCallback((e) => {
        setCurrentComment({ comment: e.target.value, subComments: [] });
    }, []);

    const addComment = useCallback(
        (e) => {
            e.preventDefault();
            setComments([currentComment, ...comments]);
        },
        [comments]
    );

    const ReplyComponent = (props) => {
        const parentComment = props.parent
        const [currentComment, setCurrentComment] = useState({comment: "", subComments: []})
        const [isHidden, setIsHidden] = useState(false)
        const [comments, setComments] = useState(parentComment.subComments)
        let bufferComment = []
        let isDone = false

        useEffect(()=>{
        if (!isDone) {
            api.get(`/childComments/${parentComment.id}`)
            .then((res)=>{
                const comentarios = res.data.Resultado
                comentarios.forEach(element => {
                    bufferComment = [...bufferComment, 
                        {
                            comment: element.corpo_texto, 
                            subComments: [],
                            id: element.review_id,
                            user:  element.reviewer_id
                        }]
                    console.log(bufferComment)
                });
                setComments(bufferComment)
            }) 
            isDone = true
        }

        },[parentComment])

        


        const updateCurrentComment = useCallback((e) => {
            setCurrentComment({ comment: e.target.value, subComments: [] });
        }, []);

        const addComment = useCallback(
            (e) => {
                e.preventDefault();
                setComments([currentComment, ...comments]);
            },
            [comments]
        );

        return(
        <div>
            {isHidden ? (
                <div className="container-comentario">
                    <input 
                        className="reply"
                        placeholder="Comentar"
                        value={currentComment.comment}
                        onChange={e=>updateCurrentComment(e)}
                    /> 
                    <button className="button" onClick={e=>addComment(e)}>Comentar</button>
                    <button className="button" onClick={e=>{setIsHidden(!isHidden)}}>Cancelar</button>
                </div>
                ):( 
                <div>
                    <button onClick={e=>setIsHidden(!isHidden)}>Responder</button>
                </div>
            )}
            {comments.map((value, key) => {
                return(
                <div key={key} className="conteiner-comentario sub-comentario">
                    <div>{value.comment}</div>
                    <ReplyComponent
                    parent={value}
                    />
                </div>
                )
            })}
        </div>
        )
    }


    return(
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
                    onChange={e=>updateCurrentComment(e)}
                /> 
                <button className="button" onClick={e=>addComment(e)}>Comentar</button>
            </div>
            </div>
            <div>
                {comments.map((value, key) =>{
                    return (
                        <div key={key} className="container-comentario">
                            <div >{value.comment}</div>
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
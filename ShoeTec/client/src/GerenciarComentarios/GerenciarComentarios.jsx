import { useState, useEffect, useNavigate} from "react";
import BarraNav from "../componentes/BarraNav/BarrabNav";
import { api, getUser, getCommentsByUser, getAllCommentsByUser } from "../services/api";
import '../TelaUsuario/tela-usuario.css'
import './gerenciar-comentarios.css'
import { Link, useParams } from "react-router-dom"

export default function GerenciarComentarios() {
    const { id } = useParams()
    const [User, setUser] = useState({esportes: []})
    const [allcomments, setAllcomments] = useState([]);
    const [currentUser, setCurrentUser] = useState({
    })

    useEffect(() => {

        try {
            api.get(`/getUser/${id}`)
            .then((res) => {
                const userData = res.data.result[0];
                if (res.status == 200) {
                    setUser(userData);
                } 
            });
        }
        catch (err) {
            console.log(err)
        }
        getUser()
        .then(
            (value) => {
                setCurrentUser(value.user)
            },
            (reason) => {
                console.log(reason)
            })
        .catch((reason) => {
            console.log(reason)
        })
        getAllCommentsByUser(id)
            .then((result) => {
                setAllcomments(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);


    return (
        <>
        {currentUser.userid == id ? (
        <div className="container-tela-usuario">
            <BarraNav />
            <div className="space">🥚🐰</div>
            <ListaComentarios />
        </div>
        ) : (<h1>Permissão Negada</h1>)}
        </>
    )

    function TelaComentario({ tenisName, descricao }) {
        const [tenisNome, setTenisNome] = useState("");

        useEffect(() => {
            api.get(`/tenisId/${tenisName}`)
              .then((res) => {
                // console.log(res);
                setTenisNome(res.data[0].nome);
              })
              .catch((error) => {
                console.error("Erro ao buscar o nome do tênis:", error);
              });
          }, [tenisName]);


        return (
            
            <div className="comentario-user-gerenciar">
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
        return (
            <div className="comentarios-container-gerenciar">
                <h2 className="titulo-comentario">Comentários:</h2>
                <ol className="lista-comentario">
                    {allcomments.map((allcomments, index) => (
                        <li className="li-lista-comentario" key={index}>
                            <TelaComentario
                                tenisName={allcomments.tenis_id}
                                descricao={allcomments.corpo_texto}
                            />
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

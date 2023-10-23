import { useState, useEffect, useNavigate} from "react";
// import BarraSuperior from '../componentes/BarraSuperior/barra-superior'
import BarraNav from "../componentes/BarraNav/BarrabNav";
import Userfoto from '../assets/imgs/userpic.jpg';
import Basquete from '../assets/icons/basquete.png'
import Futebol from '../assets/icons/futebol.png'
import Futsal from '../assets/icons/futsal.png'
import Voleibol from '../assets/icons/voleibol.png'
import Ciclismo from '../assets/icons/ciclismo.png'
import Corrida from '../assets/icons/Corrida.png'
import Tênis from '../assets/icons/tênis.png'
import Handebol from '../assets/icons/handebol.png'
import Musculacao from '../assets/icons/musculacao.png'
import Localizacao from '../assets/icons/localizacao.png'
import { api, getUser, getCommentsByUser, getPicPath } from "../services/api";
import './tela-usuario.css'
import { Link, useParams } from "react-router-dom"

export function TelaUsuario() {
    const { id } = useParams()
    const [User, setUser] = useState({esportes: []})
    const [comments, setComments] = useState([]);
    const [userPic, setUserPic] = useState(Userfoto)
    const [currentUser, setCurrentUser] = useState({
    })

    useEffect(() => {

        try {
            api.get(`/getUser/${id}`)
            .then((res) => {
                const userData = res.data.result[0];
                if (res.status == 200) {
                    setUser(userData);
                    const pic = getPicPath(userData.picture)
                    console.log(pic)
                    if (userData.picture) setUserPic(pic)
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
        getCommentsByUser(id)
            .then((result) => {
                setComments(result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);


    return (
        <div className="container-tela-usuario">
            <BarraNav />
            <div className="space">🥚🐰</div>
            <div className="container-content">
                <PerfilUsuario userEsportes={User.esportes} />
                <ListaComentarios />
            </div>
        </div>
    )

    function PerfilUsuario({userEsportes}) {
        const [userSports, setUserSports] = useState(userEsportes);

        const sportIcons = {
            futebol: Futebol,
            futsal: Futsal,
            corrida: Corrida,
            basquete: Basquete,
            voleibal: Voleibol,
            tenis: Tênis,
            handebol: Handebol,
            musculacao: Musculacao
        };

        return (
            <div className="perfil-container">
                <div className="perfil-foto">
                    <img className="user-foto" src={userPic} alt="Foto Usuário"></img>
                </div>
                <div className="perfil-cardname">
                    <h1 className="perfil-nome">
                        {User.name}
                    </h1>
                </div>

                <div className="perfil-icons">
                    {userSports.map((sport) => (
                        <img className="favicon" src={sportIcons[sport]} alt={sport} key={sport} />
                    ))}
                </div>

                <div className="perfil-descricao">
                    <p className="perfil-descricao-p"> {User.bio}</p>
                </div>

                <div className="perfil-localizacao">
                    <div className="containerlocal">
                        <img className="favicon" src={Localizacao} alt="Localização" />
                        <p className="descricao-localizacao"> {User.cidade}, {User.estado} - {User.pais}</p>
                    </div>
                </div>

                <div className="perfil-edit">

                    {currentUser.userid == id &&
                        <div>
                            <Link to="/EditarPerfil" className="btn-edit-profile">
                                <h4>Editar perfil</h4>
                            </Link>
                            <Link to="/EditarFotoPerfil" className="btn-edit-profile">
                                <h4>Mudar foto de perfil</h4>
                            </Link>
                        </div>
                    }
                </div>


                <div className="wrap-pfp">
                    <img className="pfp"></img>
                </div>
                <div className="container-bio">

                </div>
            </div>
        )
    }


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
        )
    }
}

import { useState, useEffect, useNavigate} from "react";
// import BarraSuperior from '../componentes/BarraSuperior/barra-superior'
import BarraNav from "../componentes/BarraNav/BarrabNav";
import Userfoto from '../assets/imgs/arthur.jpg';
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
import { api, getUser, getCommentsByUser, getTenisById } from "../services/api";
import './tela-usuario.css'
import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom"

export function TelaUsuario() {
    const { id } = useParams()
    const [User, setUser] = useState({})
    const [comments, setComments] = useState([]);

    const [ultimosPosts, setUltimosPosts] = []
    const [AsicsNovablast, setAsicsNovablast] = useState("Tênis Asics Novablast")
    const [DescricaoComentario, setDescricaoComentario] = useState("O tênis apresenta um bom amortecimento, mas peca quanto à estabilidade.")
    const [currentUser, setCurrentUser] = useState({
        user: {
            username: '',
            userid: null,
            genero: '',
            authenticated: false
        }
    })

    useEffect(() => {

        try {
            api.get(`/getUser/${id}`)
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
        getUser()
            .then(
                (value) => {
                    console.log(value)
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
                <PerfilUsuario />
                <ListaComentarios />
            </div>
        </div>
    )

    function PerfilUsuario() {
        const isLogged = Cookies.get('loggedIn')
        const [userSports, setUserSports] = useState([]);

        useEffect(() => {

            try {
                api.get(`/getUser/${id}`)
                    .then((res) => {
                        console.log(res)
                        if (res.status == 200) {
                            console.log(res)
                            setUserSports(res.data.result[0].esportes);
                        }
                    })
            }
            catch (err) {
                console.log(err)
            }

        }, [])


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
                    <img className="user-foto" src={User.picture ? User.picture : Userfoto} alt="Foto Usuário"></img>
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

                    {currentUser.userid = id &&
                        <Link to="/EditarPerfil" className="btn-edit-profile">
                            <h4>Editar Perfil</h4>
                        </Link>
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

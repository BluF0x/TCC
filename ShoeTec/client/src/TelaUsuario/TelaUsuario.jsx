import { useState, useEffect } from "react";
import BarraSuperior from '../componentes/BarraSuperior/barra-superior'
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
import api from "../services/api";
import './tela-usuario.css'
import Cookies from "js-cookie";

export function TelaUsuario() {
    const [User, setUser] = useState({})

    const [ultimosPosts, setUltimosPosts] = []
    const [AsicsNovablast, setAsicsNovablast] = useState("Tênis Asics Novablast")
    const [DescricaoComentario, setDescricaoComentario] = useState("O tênis apresenta um bom amortecimento, mas peca quanto à estabilidade.")

    useEffect(() =>{

        try{
        api.get(`/getUser/${Cookies.get('id')}`)
        .then((res)=>{
            console.log(res)
            if(res.status == 200){
                console.log(res)
                setUser(res.data.result[0])
            }
        })
    }
    catch(err) {
        console.log(err)
    }

    },[])

    return (
        <div className="container-tela-usuario">
            <BarraSuperior/>
            <div className="space">🥚🐰</div>
            <div className="container-content">
                <PerfilUsuario/>
                <ListaComentarios/>
            </div>
        </div>
    )

    function PerfilUsuario() {
        return(
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
                <img className="favicon" src={Basquete} alt="Basquete"/>
                <img className="favicon" src={Futebol} alt="Futebol"/>
                <img className="favicon" src={Futsal} alt="Futsal"/>
                <img className="favicon" src={Voleibol} alt="Voleibol"/>
                <img className="favicon" src={Handebol} alt="Handebol"/>
                <img className="favicon" src={Corrida} alt="Corrida"/>
                <img className="favicon" src={Ciclismo} alt="Ciclismo"/>
                <img className="favicon" src={Musculacao} alt="Musculacao"/>
                <img className="favicon" src={Tênis} alt="Tênis"/>
                </div>
                
                <div className="perfil-descricao">
                    <p className="perfil-descricao-p"> {User.bio}</p>
                </div>

                <div className="perfil-localizacao">
                    <div className="containerlocal">
                    <img className="favicon" src={Localizacao} alt="Localização"/> 
                    <p className="descricao-localizacao"> {User.cidade} {User.estado}  {User.pais}</p>
                    </div>
                </div>

                <div className="perfil-edit">
                <button type="button" className="btn-edit-profile">Editar Perfil</button>
                </div>
                
                
                <div className="wrap-pfp">
                    <img className="pfp"></img>
                </div>
                <div className="container-bio">

                </div>
            </div>
        )
    }

    function ListaComentarios() {
        return(
            <div className="comentarios-container">
                <h2 className="titulo-comentario">Reviews:</h2>
                <ol className="lista-comentario">

                    <li className="li-lista-comentario">
                        <div class="comentario-user">
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
                    
                    <li className="li-lista-comentario">
                        <div class="comentario-user">
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
            return(
                <div className="post">
                    Teste
                </div>
            )
        }
    }

}
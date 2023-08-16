import { useState } from "react";
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
import './tela-usuario.css'

export function TelaUsuario() {
    const [ultimosPosts, setUltimosPosts] = []
    const [Nome, setNome] = useState("Arthur Bauer Cardoso")
    const [Esportes, setEsportes] = useState(['https://img.icons8.com/ios-filled/25/000000/basketball.png'])
    const [Descricao, setDescricao] = useState("1º lugar 10km Giassi Sombrio 2020 sub-24")
    const [Cidade, seCidade] = useState("São João do Sul")
    const [Estado, setEstado] = useState("Santa Catarina")
    const [País, setPaís] = useState("Brasil")
    const [AsicsNovablast, setAsicsNovablast] = useState("Tênis Asics Novablast")
    const [DescricaoComentario, setDescricaoComentario] = useState("O tênis apresenta um bom amortecimento, mas peca quanto à estabilidade.")

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
                <img className="user-foto" src={Userfoto} alt="Foto Usuário"></img>
                </div>
                <div className="perfil-cardname">
                    <h1 className="perfil-nome">
                        {Nome}
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
                    <p className="perfil-descricao-p"> {Descricao}</p>
                </div>

                <div className="perfil-localizacao">
                    <div className="containerlocal">
                    <img className="favicon" src={Localizacao} alt="Localização"/> 
                    <p className="descricao-localizacao"> {Cidade}, {Estado} - {País}</p>
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
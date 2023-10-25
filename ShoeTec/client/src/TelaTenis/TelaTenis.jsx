import BarraNav from "../componentes/BarraNav/BarrabNav";
import Comentarios from "../componentes/Comentarios/Comentarios";
import { useState, useEffect } from "react"
import Novablast from '../assets/imgs/Novablast.png'
import Novablast2 from '../assets/imgs/Novablast2.png'
import estrelaCheia from '../assets/svg/star_full.svg';
import estrelaMeia from '../assets/svg/half_star.svg';
import estrela from '../assets/svg/star.svg';
import { Link, useLocation, useParams } from "react-router-dom"
import './tela-tenis.css'
import '../LostPage/lost.css'
import { api, getUser } from "../services/api";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function TelaTenis() {
  // const params = useLocation()
  const { id } = useParams()
  const [tenis, setTenis] = useState({})

  // const [tenis.nota, setTotalReview] = useState(tenis.nota)
  // const [NomeTenis, setNomeTenis] = useState(tenis.nome)
  const [comments, setComments] = useState([])
  let bufferComment = []
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState({
    user: {
      username: '',
      userid: null,
      genero: '',
      authenticated: false
    }
  })


  useEffect(() => {
    getUser()
      .then(
        (value) => {
          console.log(value)
          setIsLogged(value.isLogged)
          setUser(value.user)
        },
        (reason) => {
          console.log(reason)
        })
      .catch((reason) => {
        console.log(reason)
      })
    api.get(`/tenisId/${id}`)
      .then((res) => {
        console.log(res)
        setTenis(res.data[0])
        console.log(Object.keys(tenis).length != 0)
      })
    api.get(`/getAllComments/${id}`)
      .then((res) => {
        console.log("res:")
        console.log(res)
        const result = res.data.Resultado

        setComments(res.data.Resultado)
      })
  }, [])




  const addEstrela = (nota) => {
    let listaEstrela = []
    let dif = 5 - nota
    const round = Math.floor(nota)
    const estrela = <Estrela />
    const meiaEstrela = <MeiaEstrela />
    const fullEstrela = <EstrelaCheia />

    for (let i = 0; i < round; i++) {
      listaEstrela.push(fullEstrela)
    }
    if ((nota - round) >= 0.5) {
      listaEstrela.push(meiaEstrela)
      dif--
    }
    for (let i = 0; i < dif; i++) {
      listaEstrela.push(estrela)
    }
    return (listaEstrela)
  }

  function Estrela() {
    return (
      <img src={estrela} className="star">
      </img>
    )
  }

  function EstrelaCheia() {
    return (
      <img src={estrelaCheia} className="star">
      </img>
    )
  }

  function MeiaEstrela() {
    return (
      <img src={estrelaMeia} className="star">
      </img>
    )
  }

  function Slider(props) {
    const [tenis, setTenis] = useState(props.tenis)
    const [slides, setCount] = useState(tenis.pictures);

    return (
      <div className="container-slide">
        <div className="slider">

          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination
            loop
          >
            { slides ?
              slides.map( (value, index) => {
                return(
                  <SwiperSlide>
                    <img className="img-slides" src={`http://localhost:3001/images/${value}`} alt={slides} />
                  </SwiperSlide>
                )
              })
              :
              <SwiperSlide>
                <img className="img-slides" src={Novablast}/>
              </SwiperSlide>
              }
          </Swiper>

        </div>


      </div>
    );
  }

  return (
    <>
      {tenis ?
        <div className="container-tela-tenis">
          <div >
            <BarraNav />
          </div>
          <div className="barra">!</div>
          <div className="container-content">
            <Slider tenis={tenis} />
            <PerfilTenis tenis={tenis} />
          </div>
          <div className="container-nota">
            <div className="estrela">
              {addEstrela(tenis.nota)}
            </div>

            <div className="frase-nota">
              A média de avaliação de {tenis.nome} é: {Math.floor(tenis.nota * 10) / 10}
            </div>
          </div>

          <div className='container-tabela'>
            <TabelaInfo tenisInfo={tenis} />
          </div>

          <Comentarios
            inheritedComments={comments}
            tenisId={id}
            user={user}
            isLogged={isLogged}
          />
        </div>
        :
        <div >
          <BarraNav />
          <div className="lost" style={{ paddingTop: 100 }}>
            <h1 className="lost-text">404: Tenis não encontrado</h1>
            <Link to="/" className="link">Voltar</Link>
          </div>
        </div>
      }
    </>
  )
}



function PerfilTenis(props) {

  const tenis = props.tenis


  return (
    <div className="container-descricao">

      <div className="tenis nome">
        <h1>{tenis.nome}</h1>
      </div>

      <div className="tenis preco">
        <p className='p preco-p'><span className="preco-p">R$ </span>  <span className='num-preco'>{tenis.medium_price}</span></p>
      </div>

      {tenis.desconto && (
        <div className="tenis cupom">
          <p className='p cupom-p'><a className="tipo-cupom" href={tenis.cupom} target="_blank">{tenis.desconto} </a></p>
        </div>
      )}

      <div className="tenis esporte">
        <p><span className="p subtitulo">Esporte: </span>  {tenis.esporte}</p>
      </div>

      <div className="tenis descrição">
        <p> <span className="p subtitulo">Descrição: </span> {tenis.descr}</p>
      </div>

    </div>
  );
}

function TabelaInfo(props) {
  let tenis = props.tenisInfo
  // const params = useLocation()
  // const tenis = params.state.tenis

  const [totalReview, setTotalReview] = useState(tenis.nota)
  const [NomeTenis, setNomeTenis] = useState(tenis.nome)
  const [MarcaTenis, setMarcaTenis] = useState(tenis.marca)
  const [EsporteTenis, setEsporteTenis] = useState(tenis.esporte)
  const [CategoriaTenis, setCategoriaTenis] = useState(tenis.categoria)
  const [PesoTenis, setPesoTenis] = useState(tenis.peso)
  const [EntressolaTenis, setEntressolaTenis] = useState(tenis.entressola)
  const [TravaTenis, setTravaTenis] = useState(tenis.trava)
  const [SoladoTenis, setSoladoTenis] = useState(tenis.solado)
  const [CabedalTenis, setCabedalTenis] = useState(tenis.cabedal)
  const [DropTenis, setDropTenis] = useState(tenis.dropt)


  return (
    <div className="tabela-container">
      <h2>Informações</h2>
      <table className="vertical-table">
        <tbody>
          {/* Verifica se cada valor é verdadeiro antes de renderizar a linha da tabela. */}
          {tenis.nome && (
            <tr>
              <th>Nome</th>
              <td>{tenis.nome}</td>
            </tr>
          )}
          {tenis.marca && (
            <tr>
              <th>Marca</th>
              <td>{tenis.marca}</td>
            </tr>
          )}
          {tenis.esporte && (
            <tr>
              <th>Esporte</th>
              <td>{tenis.esporte}</td>
            </tr>
          )}
          {tenis.categoria && (
            <tr>
              <th>Categoria</th>
              <td>{tenis.categoria}</td>
            </tr>
          )}
          {tenis.peso && (
            <tr>
              <th>Peso</th>
              <td>{tenis.peso}</td>
            </tr>
          )}
          {tenis.entressola && (
            <tr>
              <th>Entressola</th>
              <td>{tenis.entressola}</td>
            </tr>
          )}
          {tenis.trava && (
            <tr>
              <th>Trava</th>
              <td>{tenis.trava}</td>
            </tr>
          )}
          {tenis.solado && (
            <tr>
              <th>Solado</th>
              <td>{tenis.solado}</td>
            </tr>
          )}
          {tenis.cabedal && (
            <tr>
              <th>Cabedal</th>
              <td>{tenis.cabedal}</td>
            </tr>
          )}
          {tenis.dropt && (
            <tr>
              <th>Drop</th>
              <td>{tenis.dropt}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

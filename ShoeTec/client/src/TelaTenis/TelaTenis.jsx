import BarraNav from "../componentes/BarraNav/BarrabNav";
import { useState, useEffect } from "react"
import Novablast from '../assets/imgs/Novablast.png'
import Novablast2 from '../assets/imgs/Novablast2.png'
import estrelaCheia from '../assets/svg/star_full.svg';
import estrelaMeia from '../assets/svg/half_star.svg';
import estrela from '../assets/svg/star.svg';
import { useLocation } from "react-router-dom"
import './tela-tenis.css'

export function TelaTenis() {
  const params = useLocation()
  const tenis = params.state.tenis

  const [totalReview, setTotalReview] = useState(tenis.nota)
  const [NomeTenis, setNomeTenis] = useState(tenis.nome)
  

  const addEstrela=() =>{
    let listaEstrela = []
    let dif = 5 - totalReview
    const round = Math.floor(totalReview)
    const estrela = <Estrela/>
    const meiaEstrela = <MeiaEstrela/>
    const fullEstrela = <EstrelaCheia/>

    for(let i =0; i < round; i++ ){
        listaEstrela.push(fullEstrela)
    }
    if((totalReview - round)>= 0.5) {
        listaEstrela.push(meiaEstrela)
        dif--
    }
    for(let i=0; i < dif; i++){
        listaEstrela.push(estrela)
    }
    return(listaEstrela)
  }

  function Estrela() {
      return(
          <img src={estrela} className="star">
          </img>
      )
  }

  function EstrelaCheia() {
      return(
          <img src={estrelaCheia} className="star">
          </img>
      )
  }

  function MeiaEstrela() {
      return(
          <img src={estrelaMeia} className="star">
          </img>
      )
  }

  return(
      <div className="container-tela-tenis">
          <div >
              <BarraNav/>
          </div>
          <div className="barra">!</div>
          <div className="container-content">
              <Slider tenis={tenis}/>
              <PerfilTenis tenis={tenis}/>
          </div>
          <div className="container-nota">
            <div className="estrela">
              {addEstrela()}
            </div>

            <div className="frase-nota">
            A média de avaliação de {NomeTenis} é: {Math.floor(totalReview * 10) / 10}
            </div>
          </div>
        
          <div className='container-tabela'>
            <TabelaInfo/>
          </div>
          
      </div>
  )
}

function Slider(props) {
  const tenis = props.tenis
  console.log(tenis)

  const [NomeTenis, setNomeTenis] = useState(tenis.nome)
  const [count, setCount] = useState(1);
  
  useEffect(() => {
    document.getElementById('slider-' + count).checked = true;
  }, [count]);

  return (
    <div className="container-slide">
    <div className="slider">

      <div className="slides">
        <input type="radio" name="radio-btn" id="slider-1"/>
        <input type="radio" name="radio-btn" id="slider-2"/>
        <input type="radio" name="radio-btn" id="slider-3"/>
        <input type="radio" name="radio-btn" id="slider-4"/>

        <div className="slide first">
            <img src={Novablast} alt={NomeTenis}/>
        </div>
        <div className="slide">
            <img src={Novablast2} alt={NomeTenis}/>
        </div>
        <div className="slide">
            <img src={Novablast} alt={NomeTenis}/>
        </div>
        <div className="slide">
            <img src={Novablast2} alt={NomeTenis}/>
        </div>
        

        <div className="navigation-auto">
          <div className="auto-btn1"></div>
          <div className="auto-btn2"></div>
          <div className="auto-btn3"></div>
          <div className="auto-btn4"></div>
        </div>

      </div>
      
      <div className="manual-navigation">
          <label for="slider-1" className="manual-btn"></label>
          <label for="slider-2" className="manual-btn"></label>
          <label for="slider-3" className="manual-btn"></label>
          <label for="slider-4" className="manual-btn"></label>
        </div>

    
    </div>

    
    </div>
  );
}
  
  
function PerfilTenis(props) {

  const tenis = props.tenis


  return (
    <div className="container-descricao">
    
      <div className="tenis nome">
        <h1>{tenis.nome}</h1>
      </div>
    
      <div className="tenis preco">
        <p className='p preco-p'><span className="subtitulo">R$ </span>  <span className='num-preco'>{tenis.medium_price}</span></p>
      </div>


      <div className="tenis esporte">
        <p><span className="p subtitulo">Esporte: </span>  {"corrida"}</p>
      </div>

      <div className="tenis descrição">
        <p> <span className="p subtitulo">Descrição: </span> {tenis.descr}</p>
      </div>

    </div>
  );
}

function TabelaInfo() {
  const [NomeTenis, setNomeTenis] = useState("Tênis Asics Novablast 3")
  const [MarcaTenis, setMarcaTenis] = useState("Asics")
  const [EsporteTenis, setEsporteTenis] = useState("Corrida")
  const [CategoriaTenis, setCategoriaTenis] = useState("Amortecimento")
  const [PesoTenis, setPesoTenis] = useState("245g (41M) e 215g (37F)")
  const [EntressolaTenis, setEntressolaTenis] = useState("FF BLAST™ PLUS")
  const [SoladoTenis, setSoladoTenis] = useState("AHAR")
  const [CabedalTenis, setCabedalTenis] = useState("Engineered Mesh")
  const [DropTenis, setDropTenis] = useState("8mm")

  return (
    <div className="tabela-container">
      <h2>Informações</h2>
      <table className="vertical-table">
        <tbody>
          <tr>
            <th>Nome</th>
            <td>{NomeTenis}</td>
          </tr>
          <tr>
            <th>Marca</th>
            <td>{MarcaTenis}</td>
          </tr>
          <tr>
            <th>Esporte</th>
            <td>{EsporteTenis}</td>
          </tr>
          <tr>
            <th>Categoria</th>
            <td>{CategoriaTenis}</td>
          </tr>
          <tr>
            <th>Peso</th>
            <td>{PesoTenis}</td>
          </tr>
          <tr>
            <th>Entressola</th>
            <td>{EntressolaTenis}</td>
          </tr>
          <tr>
            <th>Solado</th>
            <td>{SoladoTenis}</td>
          </tr>
          <tr>
            <th>Cabedal</th>
            <td>{CabedalTenis}</td>
          </tr>
          <tr>
            <th>Drop</th>
            <td>{DropTenis}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

import BarraSuperior from "../componentes/BarraSuperior.jsx/barra-superior"
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
    console.log(params)

    const [totalReview, setTotalReview] = useState(4.6)
  const [NomeTenis, setNomeTenis] = useState("Tênis Asics Novablast 3")
  

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
                <BarraSuperior/>
            </div>
            <div className="barra">!</div>
            <div className="container-content">
                id: {params.state.id}
                <Slider/>
                <PerfilTenis/>
            </div>
            <div className="container-nota">
          <div className="estrela">
              {addEstrela()}
          </div>

          <div className="frase-nota">
            A média de avaliação de {NomeTenis} é: {totalReview}
            </div>
          </div>

        </div>
    )
}

function Slider() {

    const [NomeTenis, setNomeTenis] = useState("Tênis Asics Novablast 3")
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
  
          <div class="slide first">
              <img src={Novablast} alt={NomeTenis}/>
          </div>
          <div class="slide">
              <img src={Novablast2} alt={NomeTenis}/>
          </div>
          <div class="slide">
              <img src={Novablast} alt={NomeTenis}/>
          </div>
          <div class="slide">
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
  
  
  function PerfilTenis() {
    const [NomeTenis, setNomeTenis] = useState("Tênis Asics Novablast 3")
    const [EsporteTenis, setEsporteTenis] = useState("Corrida")
    const [DescricaoTenis, setDescricaoTenis] = useState("Para você correr e ter uma ótima performance, o Tênis ASICS Novablast 3 é a pedida certa. Seu diferencial é a tecnologia no cabedal Engineered Mesh: Uma malha de monofilamento oferece bom conforto e suporte. Entressola com a FF BLAST™ PLUS: Este material do amortecimento ajuda a manter o tênis leve e cria uma passada mais energizada. Solado: AHAR® (High Abrasion Resistant Rubber): Borracha carbonada de alta durabilidade. O cabedal (parte superior do calçado) em sintético e mesh (Fibras em malha com tramas abertas), com entressola em espuma e solado borracha, além de 75% feito com pet reciclado. O tênis Asics masculino conta com forro têxtil e reforço acolchoado no calcanhar que garante maior proteção.")
    const [Preco, setPreco] = useState("499,99")
  
    return (
      <div className="container-descricao">
      
        <div className="tenis nome">
          <h1>{NomeTenis}</h1>
        </div>
      
        <div className="tenis preco">
          <p className='p preco-p'><span className="subtitulo">R$ </span>  <span className='num-preco'>{Preco}</span></p>
        </div>


        <div className="tenis esporte">
          <p><span className="p subtitulo">Esporte: </span>  {EsporteTenis}</p>
        </div>

        <div className="tenis descrição">
          <p> <span className="p subtitulo">Descrição: </span> {DescricaoTenis}</p>
        </div>
  
      </div>
    );
  }
import {React, useState, useEffect} from "react";
import tenis from '../../assets/imgs/tenis_placeholder.jpeg';
import estrelaCheia from '../../assets/svg/star_full.svg';
import estrelaMeia from '../../assets/svg/half_star.svg';
import estrela from '../../assets/svg/star.svg';
import "./item-tenis.css";

function ItemTenis(props) {
    const [totalReview, setTotalReview] = useState()

    useEffect(()=>{
        setTotalReview(Math.floor(props.review * 10) / 10)
    })

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

    return (
        <div className="item-tenis">
            <img id="image-tenis" src={tenis}></img>
            
                <span className="propriedade-tenis" id="desc">
                    {props.desc}
                </span>
                <span className="propriedade-tenis nota">
                    Nota: {addEstrela()} 
                </span>
                <span className="propriedade-tenis " id="preço">
                    Preço: R${props.price}
                </span>
            <span><button className="compartilhar">compartilhar</button></span>
        </div>
    )
}

export default ItemTenis
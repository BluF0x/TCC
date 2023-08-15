import {React, useState, useEffect} from "react";
import tenis from '../../assets/imgs/tenis_placeholder.jpeg';
import estrelaCheia from '../../assets/svg/star_full.svg';
import estrelaMeia from '../../assets/svg/half_star.svg';
import estrela from '../../assets/svg/star.svg';
import "./item-tenis.css";
import { Link, useNavigate } from "react-router-dom";

function ItemTenis(props) {
    const [totalReview, setTotalReview] = useState()

    const navigate = useNavigate()
    const tenis = props.tenis

    const redirectPagTenis= (idTenis) => {
        navigate('/TelaTenis', {state: {tenis: idTenis}})
    }

    useEffect(()=>{
        setTotalReview(Math.floor(tenis.nota * 10) / 10)
    }, [])

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
        <div className="item-tenis" onClick={()=>{redirectPagTenis(tenis)}}>
            {/* <Link to="/TelaTenis"> */}
                <img id="image-tenis" src={tenis}></img>
                
                    <span className="propriedade-tenis" id="nome">
                        {tenis.nome}
                    </span>
                    <span className="propriedade-tenis nota"></span>
                    <span className="propriedade-tenis" id="desc">
                        {tenis.descr}
                    </span>
                    <span className="propriedade-tenis nota">
                        Nota: {addEstrela()} 
                    </span>
                    <span className="propriedade-tenis " id="preço">
                        Preço: R${tenis.medium_price}
                    </span>
                <span><button className="compartilhar">compartilhar</button></span>
            {/* </Link> */}
        </div>
    )
}

export default ItemTenis
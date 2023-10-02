import {React, useState, useEffect} from "react";
import tenis from '../../assets/imgs/Novablast.png';
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
        // navigate('/TelaTenis', {state: {tenis: idTenis}})
        navigate(`/TelaTenis/${idTenis}`)
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
            <img src={estrela} className='stars'>
            </img>
        )
    }

    function EstrelaCheia() {
        return(
            <img src={estrelaCheia} className='stars'>
            </img>
        )
    }

    function MeiaEstrela() {
        return(
            <img src={estrelaMeia} className='stars'>
            </img>
        )
    }

    return (
        <div className="item-tenis" onClick={()=>{redirectPagTenis(tenis.tenis_id)}}>
            {/* <Link to="/TelaTenis"> */}
                <img id="image-tenis" src={tenis}></img>
                
                    <span className="propriedade-tenis" id="nome">
                        {tenis.nome.length > 35
                    ? tenis.nome.substring(0, 35) + '...'
                    : tenis.nome}
                    </span>
                    <span className="propriedade-tenis nota"></span>
                    <span className="propriedade-tenis" id="desc">
                    {tenis.descr.length > 50
                    ? tenis.descr.substring(0, 50) + '...'
                    : tenis.descr}
                    </span>
                    <span className="propriedade-tenis nota">
                        {addEstrela()} 
                    </span>
                    <span className="propriedade-tenis " id="preço">
                        R${tenis.medium_price}
                    </span>
                <span><button className="compartilhar">Compartilhar</button></span>
            {/* </Link> */}
        </div>
    )
}

export default ItemTenis
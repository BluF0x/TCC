import React from "react";
import tenis from '../../assets/imgs/tenis_placeholder.jpeg';
import "./item-tenis.css";

function ItemTenis(props) {
    return (
        <div className="item-tenis">
            <img id="image-tenis" src={tenis}></img>
            
                <span className="propriedade-tenis" id="desc">
                    {props.desc}
                </span>
                <span className="propriedade-tenis left">
                    Nota: {props.review}
                </span>
                <span className="propriedade-tenis left" id="preço">
                    Preço: R${props.price}
                </span>
            <span><button className="compartilhar">compartilhar</button></span>
        </div>
    )
}

export default ItemTenis
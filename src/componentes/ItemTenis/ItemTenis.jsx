import React from "react";
import tenis from '../../assets/imgs/tenis_placeholder.jpeg'
import "./item-tenis.css";

function ItemTenis() {
    return (
        <div className="item-tenis">
            
            <img id="image-tenis" src={tenis}></img>
        </div>
    )
}

export default ItemTenis
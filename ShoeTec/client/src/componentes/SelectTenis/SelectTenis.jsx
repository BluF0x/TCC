import React from "react";
import ItemTenis from '../ItemTenis/ItemTenis.jsx'
import "./select-tenis.css"

function SelectTenis(props) {
    const listaTenis = props.lista

    return(
        <div className="select-container">
            <h1>{props.titulo}</h1>
            <div className="cards" >
            {listaTenis.map((val, key) =>{
                return <ItemTenis key={key} desc={val.desc} review={val.review} price={val.price} id={val.id}></ItemTenis>
            })}
            </div>
        </div>
    )
}

export default SelectTenis
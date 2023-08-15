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
                {console.log(val)}
                return <ItemTenis key={key} tenis={val}></ItemTenis>
            })}
            </div>
        </div>
    )
}

export default SelectTenis
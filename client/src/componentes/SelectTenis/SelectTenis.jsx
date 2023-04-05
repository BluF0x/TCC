import React from "react";
import "./select-tenis.css"

function SelectTenis(props) {

    return(
        <div className="select-container">
            <h1>{props.titulo}</h1>
            <div className="cards" >
                {props.children}
            </div>
        </div>
    )
}

export default SelectTenis
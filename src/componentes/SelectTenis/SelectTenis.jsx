import React from "react";
import "./select-tenis.css"

function SelectTenis(props) {

    return(
        <div className="select-container">
        <h1>Select tenis</h1>
            {props.children}
        </div>
    )
}

export default SelectTenis
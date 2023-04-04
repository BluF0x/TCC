import React from "react";
import "./select-tenis.css"

function SelectTenis(props) {
    function handleScroll(e) {
        console.log("scroll")
        console.log(e.currentTarget);

    }

    return(
        <div className="select-container">
            <h1>{props.titulo}</h1>
            <div className="cards" onScroll={handleScroll}>
                {props.children}
            </div>
        </div>
    )
}

export default SelectTenis
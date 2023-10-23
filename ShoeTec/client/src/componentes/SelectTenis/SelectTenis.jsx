import React from "react";
import ItemTenis from '../ItemTenis/ItemTenis.jsx'
import "./select-tenis.css"

function SelectTenis(props) {
    const { lista, esporteSelecionado } = props;

    const tênisFiltrados = esporteSelecionado
        ? lista.filter((tenis) => tenis.esporte === esporteSelecionado)
        : lista;

        if (tênisFiltrados.length === 0) {
            return null;
          }

    return (
        <div className="select-container">
            <h1>{props.titulo}</h1>
            <div className="cards" >
                {tênisFiltrados.map((val, key) => {
                    // {console.log(val)}
                    return <ItemTenis key={key} tenis={val}></ItemTenis>
                })}
            </div>
        </div>
    )
}

export default SelectTenis
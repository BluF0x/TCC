import {React, useState, useRef} from "react";
import './pop-up.css'

function PopUp(props) {
    const isAberto = props.isAberto
    const [isOpen, setIsOpen] = useState(isAberto)
    
    return(
    <>
    {isOpen ? 
        <div className="container-popup">
            <div className="wrapper-titulo">
                {props.titulo}
            </div>
            <div className="wrapper-mensagem">
                {props.mensagem}
            </div>
            <div className="wrapper-result">
                {props.result}
            </div>
            <div className="wrapper-status">
                {props.status ? 
                <>Cod. de status: {props.status}</>
                : undefined}
            </div>
        </div>
        :
        <></>
    }
    </>
    )
}

export default PopUp
import {React, useState, useEffect} from "react";
import './pop-up.css'

function PopUp(props) {
    const isAberto = props.isAberto
    const [isOpen, setIsOpen] = useState(isAberto)

    //Isso checa se foi clicado fora do popup e o fecha
    document.addEventListener("mousedown", e=>{
        const alvo = e.target
        const alvoParente = alvo.parentElement.className
        if ((alvo.className != "container-popup") ) {
            if(alvoParente != "container-popup") {
                setIsOpen(false)
            }
        }

    })

    useEffect(()=>{
        if(isOpen)  setTimeout(() => {
            setIsOpen(false)
        }, 5000)
    }, [isOpen])
    
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
            <div className={ props.status === true ? "wrapper-status success" : props.status != undefined ? "wrapper-status error" : "wrapper-status"}>
                {props.status != undefined ? 
                <>Cod. de status: {props.response}</>
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
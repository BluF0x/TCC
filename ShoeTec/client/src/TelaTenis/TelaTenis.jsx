import BarraSuperior from "../componentes/BarraSuperior.jsx/barra-superior"
import { useLocation } from "react-router-dom"
import './tela-tenis.css'

export function TelaTenis() {
    const params = useLocation()
    console.log(params)

    return(
        <div className="cima">
            <div >
                <BarraSuperior/>
            </div>
            <div className="barra">!</div>
            <div className="tela">
                id: {params.state.id}
            </div>
        </div>
    )
}
import { useState, useEffect } from 'react'
import BarraSuperior from './componentes/BarraSuperior.jsx/barra-superior.jsx'
import TelaBemVindo from './componentes/TelaBemVindo/TelaBemVindo.jsx'
import SelectTenis from './componentes/SelectTenis/SelectTenis.jsx'
import ItemTenis from './componentes/ItemTenis/ItemTenis.jsx'
import axios from 'axios'
import './App.css'

function Home() {
  const [listaTenis, setListaTenis] = useState([])
  const [darkMode, setDarkMode] = useState()

  useEffect(() =>{
    axios.get('https://zetcode.com/javascript/axios/', {
       headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then( (res)=>{console.log(res)} ).catch(console.log("n funcionou"))
  },[])

  const lista = []

  return (
    <div className={`App ${darkMode}`}>
      <div>
        <BarraSuperior />
      </div>
      <div className='conteudo'>
        <div className='tela-bem-vindo'>
          <TelaBemVindo />
        </div>
        <SelectTenis titulo="Tênis de corrida" lista={lista} />
      </div>
    </div>
  )
}

export default Home

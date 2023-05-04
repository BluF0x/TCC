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
    const getColors=async()=>{
      const response=await fetch('http://localhost:3001/users')
      const data=await response.json();
      console.log({data});
    }
    getColors()
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

import { useState, useEffect } from 'react'
import BarraSuperior from './componentes/BarraSuperior.jsx/barra-superior.jsx'
import TelaBemVindo from './componentes/TelaBemVindo/TelaBemVindo.jsx'
import SelectTenis from './componentes/SelectTenis/SelectTenis.jsx'
import ItemTenis from './componentes/ItemTenis/ItemTenis.jsx'
import api from './services/api.js'
import './App.css'

const URL = "http://localhost:3001"

function Home() {
  const [listaTenis, setListaTenis] = useState([])
  const [darkMode, setDarkMode] = useState()

  useEffect(() =>{

    // Api.get usa Axios para requisitar os tenis com o método GET
    api.get('/tenis')
    .then((res)=>{
      console.log(res)
      if(res.status == 200){
        setListaTenis(res.data.result)
      }
    })

  },[])


  return (
    <div className={`App ${darkMode}`}>
      <div>
        <BarraSuperior />
      </div>
      <div className='conteudo'>
        <div className='tela-bem-vindo'>
          <TelaBemVindo />
        </div>
        <SelectTenis titulo="Tênis de corrida" lista={listaTenis} />
      </div>
    </div>
  )
}

export default Home

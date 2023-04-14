import { useState, useEffect } from 'react'
import BarraSuperior from './componentes/BarraSuperior.jsx/barra-superior.jsx'
import TelaBemVindo from './componentes/TelaBemVindo/TelaBemVindo.jsx'
import SelectTenis from './componentes/SelectTenis/SelectTenis.jsx'
import ItemTenis from './componentes/ItemTenis/ItemTenis.jsx'
import './App.css'

function Home() {
  const [listaTenis, setListaTenis] = useState([])
  const [darkMode, setDarkMode] = useState()

  useEffect(() =>{
  },[])

  /**
   *  "Lista" é um placeholder temporário
   *  para simular os dados pegos da db.
   *  Por enquanto, "img" e "id" não são
   *  usados, porém serão ao ligar a db.
   */

  const lista=[{
    id:0, 
    img: ["", ""],
    desc: 'Tenis adidas',
    review: 3.14,
    price: 300
  }, 
  {
    id:1,
    img: '',
    desc: 'Tenis Nike',
    review: 4.725,
    price: 500
  },
  {
    id:3,
    img: '',
    desc: ' Nike',
    review: 1.12,
    price: 1200
  }]



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

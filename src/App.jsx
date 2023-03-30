import './App.css'
import BarraSuperior from './componentes/BarraSuperior.jsx/barra-superior.jsx'
import TelaBemVindo from './componentes/TelaBemVindo/TelaBemVindo'
import SelectTenis from './componentes/SelectTenis/SelectTenis'
import tenisPlaceholder from './assets/imgs/tenis_placeholder.jpeg'
import ItemTenis from './componentes/ItemTenis/ItemTenis.jsx'

function App() {
  const itens = [tenisPlaceholder, tenisPlaceholder, tenisPlaceholder]

  return (
    <div className="App">
      <div>
        <BarraSuperior />
      </div>
      <div className='conteudo'>
        <div className='tela-bem-vindo'>
          <TelaBemVindo />
        </div>
        <SelectTenis />
        <ItemTenis />
      </div>
    </div>
  )
}

export default App

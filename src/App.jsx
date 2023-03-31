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
        <SelectTenis titulo="Tênis de corrida">
          <ItemTenis price={500} desc="Tênis adidas " review={5} />
          <ItemTenis price={300} desc="Tênis adidas " review={2} />
          <ItemTenis price={100} desc="Tênis adidas " review={0} />
          <ItemTenis price={69} desc="Tênis adidas " review={4} />
          <ItemTenis price={69} desc="Tênis adidas " review={4} />
          <ItemTenis price={69} desc="Tênis adidas " review={4} />
          <ItemTenis price={69} desc="Tênis adidas " review={4} />
          <ItemTenis price={69} desc="Tênis adidas " review={4} />
          <ItemTenis price={69} desc="Tênis adidas " review={4} />
          <ItemTenis price={69} desc="Tênis adidas " review={4} />
          <ItemTenis price={69} desc="Tênis adidas " review={4} />
          <ItemTenis price={69} desc="Tênis adidas " review={4} />
          <ItemTenis price={69} desc="Tênis adidas " review={4} />
          <ItemTenis price={69} desc="Tênis adidas " review={4} />
          <ItemTenis price={69} desc="Tênis adidas " review={4} />
        </SelectTenis>
      </div>
    </div>
  )
}

export default App

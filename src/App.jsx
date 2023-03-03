import './App.css'
import BarraSuperior from './componentes/barra-superior.jsx'

function App() {

  let stilo = {
    width: "100%",
    height: "100%",
    backgroundColor: "red"
  }

  return (
    <div className="App">
      <div>
        <BarraSuperior />
      </div>
    </div>
  )
}

export default App

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Home"
import {Login} from "./Login/Login.jsx"
import {TelaUsuario} from './TelaUsuario/TelaUsuario.jsx'
import {TelaADM} from './TelaAdm/TelaADM.jsx'
import {TelaTenis} from './TelaTenis/TelaTenis.jsx'
import './App.css'
import { EditarPerfil } from "./TelaUsuario/EditarPerfil";

function App() {
  /*
  * O React funciona como uma "single page aplication",
  * ou seja, ele não possibilita link para outras páginas
  * portanto, é necessário uma biblioteca para implementar
  * essa funcionalidade, como react-router-dom, que roteia
  * para páginas separadas.
  */

  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/Login" Component={Login} />
        <Route path="/TelaUsuario/:id" Component={TelaUsuario} />
        <Route path="/TelaADM" Component={TelaADM} />
        <Route path="/TelaTenis" Component={TelaTenis} />
        <Route path="/EditarPerfil" Component={EditarPerfil} />
      </Routes>
    </Router>
  )
}

export default App

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Home"
import {Login} from "./Login/Login.jsx"
import {TelaUsuario} from './TelaUsuario/TelaUsuario.jsx'
import {TelaADM} from './TelaAdm/TelaADM.jsx'
import {CadastrarTenis} from './TelaAdm/CadastrarTênis.jsx'
import {EditarUsuario} from './TelaAdm/EditarUsuário.jsx'
import {TelaTenis} from './TelaTenis/TelaTenis.jsx'
import Lost from "./LostPage/Lost";
import { EditarPerfil } from "./TelaUsuario/EditarPerfil";
import './App.css'
import EditarFotoPerfil from "./TelaUsuario/EditarFotoPerfil";

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
        <Route path="*" Component={Lost} />
        <Route exact path="/" Component={Home} />
        <Route path="/Login" Component={Login} />
        <Route path="/TelaUsuario/:id" Component={TelaUsuario} />
        <Route path="/TelaADM" Component={TelaADM} />
        <Route path="/TelaTenis/:id" Component={TelaTenis} />
        <Route path="/EditarPerfil" Component={EditarPerfil} />
        <Route path="/CadastrarTenis" Component={CadastrarTenis} />
        <Route path="/EditarUsuario" Component={EditarUsuario} />
        <Route path="/EditarFotoPerfil" Component={EditarFotoPerfil} />
      </Routes>
    </Router>
  )
}

export default App

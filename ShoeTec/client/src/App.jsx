import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Home"
import {Login} from "./Login/Login.jsx"
import './App.css'

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
      </Routes>
    </Router>
  )
}

export default App

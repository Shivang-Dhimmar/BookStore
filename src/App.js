
import './App.css';
import {Header} from './Header';
import {Footer} from './Footer';
import {Home} from './Home';
import {Shivang} from './Shivang';
import {Books} from './Books';
import {BrowserRouter,NavLink,Route,Routes} from "react-router-dom";
function App() {
  return (
    <div className="App">
    <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path='/shivang' element={<Shivang/>}/>
          <Route path='/books' element={<Books/>}/>
        </Routes>
      </BrowserRouter>
      <h1><NavLink to="/books">Books</NavLink></h1>
    <Footer/>
    </div>
  );
}

export default App;

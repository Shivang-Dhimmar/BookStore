
import './App.css';
import {Header} from './Header';
import {Footer} from './Footer';
import {Home} from './Home';
import {Shivang} from './Shivang';
import {Books} from './Books';
import {BrowserRouter,NavLink,Route,Routes} from "react-router-dom";
function App() {
  const age=20;
  return (
    <div className="App">
    <BrowserRouter>
    <Header/> 
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path='/shivang' element={<Shivang age={age}/>}/>
          <Route path='/books' element={<Books/>}/>
        </Routes>
      
      <h1><NavLink to="/books">Books</NavLink></h1>
    <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;

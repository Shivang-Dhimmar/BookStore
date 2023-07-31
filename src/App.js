
import appStyle from "./App.css";
import {Header} from './Header';
import {Footer} from './Footer';
import {Home} from './Home';
import {Shivang} from './Shivang';
import {Books} from './Books';
import {BrowserRouter,NavLink,Route,Routes} from "react-router-dom";
import { Button,TextField } from '@material-ui/core';
// import appstyle from "./style";
function App() {
  const age=20;
  return (
    <div className="App wrapper">
    <BrowserRouter>
    <Header/> 
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path='/shivang' element={<Shivang age={age}/>}/>
          <Route path='/books' element={<Books/>}/>
        </Routes>
      
      <h1><NavLink to="/books">Books</NavLink></h1>
      <Button className="button" variant="contained" color="primary" size="midium">Shivang</Button><br></br>
      <TextField id="outlined-basic" label="Name" variant="outlined" classes={appStyle.textboxStyle}/>
    <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;

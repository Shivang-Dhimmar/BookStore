
import './App.css';
import {Header} from './Header';
import {Footer} from './Footer';
import {Home} from './Home';
import {Shivang} from './Shivang';
import {Books} from './Books';
import {Count} from './Count';
import {Login} from './Login';
import {BrowserRouter,NavLink,Route,Routes} from "react-router-dom";
import { createTheme, ThemeProvider } from '@material-ui/core';
import { blue, green } from "@material-ui/core/colors";
import {Register} from './Register';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import appstyle from "./style";
function App() {
  const age=20;
  const theme=createTheme(
    {
      palette:{
        primary:blue,
        secondary:green,
      },
      spacing:4,
    }
  );
  return (
    <div className="App wrapper">
    <ToastContainer />
    <BrowserRouter>
    <ThemeProvider theme={theme}>                    

    <Header/> 
      <NavLink to="/books" className='links'>Books</NavLink>
      <NavLink to="/count" className='links'>Count</NavLink>
      <NavLink to='/register' classeName='links'>Register</NavLink>
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path='/shivang' element={<Shivang age={age}/>}/>
          <Route path='/books' element={<Books/>}/>
          <Route path='/count' element={<Count/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      
      
      
      {/* <TextField id="outlined-basic" label="Name" variant="outlined" classes={appStyle.textboxStyle}/> */}
    <Footer/>
    </ThemeProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;

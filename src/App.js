
import './App.css';
import {Header} from './Header';
import {Footer} from './Footer';
import {BrowserRouter} from "react-router-dom";
import { createTheme, ThemeProvider } from '@material-ui/core';
import { blue, green } from "@material-ui/core/colors";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {AuthWrapper} from "./context";
import {NavigationLinks} from './NavigationLinks';

// import appstyle from "./style";
function App() {
  
  
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
    <AuthWrapper>
    <ThemeProvider theme={theme}>                    
    
    <Header/> 
      {/* <NavLink to="/books" className='links'>Books</NavLink>
      <NavLink to="/count" className='links'>Count</NavLink>
      <NavLink to='/register' classeName='links'>Register</NavLink> */}
      <NavigationLinks/>
      
      {/* <TextField id="outlined-basic" label="Name" variant="outlined" classes={appStyle.textboxStyle}/> */}
    <Footer/>
    </ThemeProvider>
    </AuthWrapper>
    </BrowserRouter>
    </div>
  );
}

export default App;

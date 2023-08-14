import {RoutePaths} from './utils/enum';
import {Booklisting} from './Booklisting';
import {EditBook} from './EditBook';
import {Register} from './Register';
import {Home} from './Home';
import {Shivang} from './Shivang';
import {Books} from './Books';
import {Count} from './Count';
import {Login} from './Login';
import {useAuthContext} from './context';
import {Navigate,Route,Routes} from "react-router-dom";

function NavigationLinks(){
    const userContext=useAuthContext();
    const age=20;
    return(
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path='/shivang' element={<Shivang age={age}/>}/>
          {/* <Route path='/books' element={<Books/>}/> */}
          <Route path='/count' element={<Count/>}/>
          <Route path={RoutePaths.Register} element={!userContext.userValues.id ?<Register/> : <Navigate to={RoutePaths.BookListing}/> }/>
          <Route path={RoutePaths.Login} element={!userContext.userValues.id ?<Login/> : <Navigate to={RoutePaths.BookListing}/>}/>
          <Route path={RoutePaths.BookListing} element={<Booklisting/>}/>
          <Route path={RoutePaths.EditBook} element={userContext.userValues.id ?<EditBook/> : <Navigate to={RoutePaths.Login}/> }/>
          <Route path={RoutePaths.AddBook} element={userContext.userValues.id ?<EditBook/> : <Navigate to={RoutePaths.Login}/>} />
          <Route path={RoutePaths.Book} element={userContext.userValues.id ?<Books/> : <Navigate to={RoutePaths.Login}/>} />
        </Routes>
      
    );
}
export {NavigationLinks};
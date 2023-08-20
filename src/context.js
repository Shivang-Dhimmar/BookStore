import { createContext,useState,useContext,useEffect } from "react";
import Shared from "./utils/shared";
import {RoutePaths} from './utils/enum';
import {useNavigate, useLocation} from "react-router-dom";
import {toast} from "react-toastify";


const initialUserValue={
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    roleId: 0,
    role: "",
    password: "",
};
// let count=0;
const initialUserState={
    userValues : initialUserValue,
    hasLogedIn: false,
    setHasLogedIn:()=>{},
    setUserValues : ()=>{},
    signOut : ()=>{},
};
const UserContext=createContext(initialUserState);

export const AuthWrapper=({children})=>{
    const [userValues, _setUserValues] = useState(initialUserValue);
    const [hasLogedIn, setHasLogedIn] = useState(false);
    const navigate=useNavigate();
    const { pathname } = useLocation();

    const setUser = (userdata) => {
        console.log(userdata);
        localStorage.setItem(Shared.LocalStorageKeys.USER, JSON.stringify(userdata));
        _setUserValues(userdata);
        // setHasLogedIn(true);
    };
    const signOut = () => {
        _setUserValues(initialUserValue);
        localStorage.removeItem(Shared.LocalStorageKeys.USER);
        navigate(`${RoutePaths.Login}`);
        setHasLogedIn(false);
    };

    //UseEffects
    useEffect(() => {
        const storedUserValue =JSON.parse(localStorage.getItem(Shared.LocalStorageKeys.USER)) ||
          initialUserValue;
          // console.log(pathname===RoutePaths.Register);
          // console.log(pathname);
        // if the item doesn't exist, return null
        if (!storedUserValue.id && ((pathname!== RoutePaths.Register) && (pathname!== RoutePaths.Login) && (pathname!== RoutePaths.BookListing))) {
          
          navigate(`${RoutePaths.Login}`);
        }
        else{
          setHasLogedIn(true);
          _setUserValues(storedUserValue);
        }
        console.log(storedUserValue);
      }, []);

      useEffect(() => {
        // console.log(pathname===RoutePaths.Register);
        console.log(userValues);
        console.log(pathname);
        if ((pathname === RoutePaths.Login ||pathname === RoutePaths.Register ) && userValues.id) {
          navigate(RoutePaths.BookListing);
        }
        // else if (((pathname !== RoutePaths.Login) || (pathname !== RoutePaths.Register)) && (!userValues.id)) {
        //   navigate(RoutePaths.Login);
        // }
        // if (!userValues.id) {
        //   return;
        // }

        // console.log(userValues.id,pathname);
        // console.log(count);
        // count=count+1;

        // const access = Shared.hasAccess(pathname, userValues);
        // if (!access && pathname!==RoutePaths.Cart) {
        //   console.log(pathname);
        //   toast.warning("Sorry, you are not authorized to access this page");
        //   navigate(RoutePaths.BookListing);
        //   return;
        // }
      }, [pathname, userValues]);
        
    let value = {
        userValues,
        hasLogedIn,
        setHasLogedIn,
        setUser,
        signOut,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useAuthContext = () => {
    return useContext(UserContext);
  };
import { createContext,useState,useContext,useEffect } from "react";
import Shared from "./utils/shared";
import {RoutePaths} from './utils/enum';
import {useNavigate, useLocation, Route} from "react-router-dom";


const intialUserValue={
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    roleId: 0,
    role: "",
    password: "",
};

const initialUserState={
    userValues : intialUserValue,
    hasLogedIn: false,
    setHasLogedIn:()=>{},
    setUserValues : ()=>{},
    signOut : ()=>{},
};
const UserContext=createContext(initialUserState);

export const AuthWrapper=({children})=>{
    const [userValues, _setUserValues] = useState(intialUserValue);
    const [hasLogedIn, setHasLogedIn] = useState(false);
    const navigate=useNavigate();
    const { pathname } = useLocation();

    const setUser = (userdata) => {
        console.log(userdata);
        localStorage.setItem(Shared.LocalStorageKeys.USER, JSON.stringify(userdata));
        _setUserValues(userdata);
    };
    const signOut = () => {
        _setUserValues(intialUserValue);
        localStorage.removeItem(Shared.LocalStorageKeys.USER);
        navigate(`${RoutePaths.Login}`);
        setHasLogedIn(false);
    };

    //UseEffects
    useEffect(() => {
        const storedUserValue =JSON.parse(localStorage.getItem(Shared.LocalStorageKeys.USER)) ||
          intialUserValue;
        // if the item doesn't exist, return null
        if (!storedUserValue.id) {
          navigate(`${RoutePaths.Login}`);
        }
        else{
          setHasLogedIn(true);
        }
        _setUserValues(storedUserValue);
        console.log(userValues);
      }, []);

      useEffect(() => {
        if ((pathname === RoutePaths.Login ||pathname === RoutePaths.Register ) && userValues.id) {
          navigate(RoutePaths.Book);
        }
        else if (((pathname !== RoutePaths.Login) || (pathname !== RoutePaths.Register)) && (!userValues.id)) {
          navigate(`${RoutePaths.Login}`);
        }
        // if (!user.id) {
        //   return;
        // }
        // const access = Shared.hasAccess(pathname, user);
        // if (!access) {
        //   toast.warning("Sorry, you are not authorized to access this page");
        //   navigate(RoutePaths.BookListing);
        //   return;
        // }
        // setAppInitialize(true);
      }, [navigate,pathname, userValues]);
        
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
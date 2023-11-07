import { createContext,useState,useContext,useEffect } from "react";

import {Loader} from "./Loader";

const initialUserState={
    
    needLoader: false,
    setLoader:()=>{},
};
const LoaderContext=createContext(initialUserState);

export const LoaderWrapper=({children})=>{
    const [needLoader,setLoader] = useState(false);
    

    

    
    useEffect(() => {
        if(needLoader){
            alert(true);
            <Loader/>
        }
        
    }, [needLoader]);

        
    let value = {
        needLoader,
        setLoader
    };

    return <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>;
}

export const useLoaderContext = () => {
    return useContext(LoaderContext);
};
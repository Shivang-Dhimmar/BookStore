
import React, { createContext, useContext, useEffect, useState } from "react";
import {getCart} from "./../myService/cartService";
import { useAuthContext } from "./../context";
import {toast} from "react-toastify";

const initialCartDetails = {
  cartData: [],
  updateCart: () => {},
  emptyCart: () => {},
};

const cartContext = createContext(initialCartDetails);

export const CartWrapper = ({ children }) => {
  const authContext = useAuthContext();
  const [cartData, setCartData] = useState([]);

  const emptyCart = () => {
    setCartData([]);
  };

  const updateCart = async (updatedCartList) => {
    // while(!authContext.user.id){
    //     console.log("Id not available.");
    // }
    try{
    
        if (updatedCartList) {
        setCartData(updatedCartList);
        } 
        else if (authContext.userValues.id) {
            // alert("1");
            const response=await getCart(authContext.userValues.id);
            // alert(2);
            console.log(authContext.userValues.id);
            if(response.key==="SUCCESS"){
                setCartData(response.result);
                console.log(cartData);
            }
            else{
                toast.error("There is Something Wrong");
            }
        }
    }
    catch(error){
        toast.error(error);
    }
  };

  useEffect(() => {
    updateCart();
  }, [authContext.userValues.id]);

  const value = {
    cartData,
    emptyCart,
    updateCart,
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};

export const useCartContext = () => {
  return useContext(cartContext);
};

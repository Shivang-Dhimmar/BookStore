import {toast} from "react-toastify";
const placeOrder=async(req)=>{
    try{
        const response=await fetch("http://localhost:5000/api/order",{
            method:"POST",
            headers:{
                "Content-Type":"Application/json",
                "Accept":"Application/json",
            },
            body:JSON.stringify(req)
        });
        const response2=await response.json();
        return response2;
    }
    catch(error){
        toast.error(error,{theme:"colored"});
    }
}

export {placeOrder};
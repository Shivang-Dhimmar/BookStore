
import {toast} from "react-toastify";

const getAllCategory=async()=>{
    try{
        const response=await fetch("http://localhost:5000/api/category/all",{
        headers:{
            "Content-Type":"Application/json",
            "Accept":"Application/json",
        },
        });
        const response2=await response.json();
        return response2;
    }
    catch(error){
        toast.error(error);
    }
    
};

export {getAllCategory}
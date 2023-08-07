
import {toast} from "react-toastify";
const global_search=async(req)=>{
    try{  
        let URL="http://localhost:5000/api/book/search?keyword=".concat(req);
        const response=await fetch(URL,{
            headers:{
                "Content-Type":"Application/json",
                "Accept":"Application/json",
            },
        });
        const data=await response.json();
        return data;
        // const  status=data.key;
        // console.log(status);
        // console.log(data);
        
        // else if(data.code===409){
        //     toast.error("User Already Exists");
        // }
        
    }
    catch(error){
        toast.error(error);
    }   
}

export {global_search};
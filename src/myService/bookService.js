
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

const getPagenatedBookList=async()=>{
    try{

        let response=await  fetch("http://localhost:5000/api/book?pageSize=2&pageIndex=1",{
            headers:{
                "Content-Type":"Application/json",
                "Accept":"Application/json",
            },
        });
        response=await response.json();
        return response;
    }
    catch(e){
        toast.error(e);
    }
}

const addBook=async(req)=>{
    try{
        const response=await fetch("http://localhost:5000/api/book",{
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
        toast.error(error);
    }
}
const getBookByID=async(id)=>{
    try{

        const response=await fetch(`http://localhost:5000/api/book/byId?id=${id}`,{
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
}
export {getBookByID};
export {global_search};
export {getPagenatedBookList};
export {addBook};
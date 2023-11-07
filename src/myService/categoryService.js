
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
        toast.error(error,{theme:"colored"});
    }
    
};


const getPagenatedCategory=async(filter)=>{

    try{
        let URL="";
        if(filter.keyword){
            URL=`http://localhost:5000/api/category?pageSize=${filter.pageSize}&pageIndex=${filter.pageIndex}&keyword=${filter.keyword}`;
        }
        else{
            URL=`http://localhost:5000/api/category?pageSize=${filter.pageSize}&pageIndex=${filter.pageIndex}`;
        }
        let response=await  fetch(`${URL}`,{
            headers:{
                "Content-Type":"Application/json",
                "Accept":"Application/json",
            },
        });
        response=await response.json();
        return response;
    }
    catch(e){
        toast.error(e,{theme:"colored"});
    }
}

const deleteCategory=async(id)=>{
    try{

        const response=await fetch(`http://localhost:5000/api/category?id=${id}`,{
            headers:{
                "Content-Type":"Application/json",
                "Accept":"Application/json",
            },
            method:"DELETE"
        });
        const response2=await response.json();
        return response2;
    }
    catch(error){
        toast.error(error,{theme:"colored"});
    }
}
const getCategoryByID=async(id)=>{
    try{

        const response=await fetch(`http://localhost:5000/api/category/byId?id=${id}`,{
            headers:{
                "Content-Type":"Application/json",
                "Accept":"Application/json",
            },
        });
        const response2=await response.json();
        return response2;
    }
    catch(error){
        toast.error(error,{theme:"colored"});
    }
}

const AddCategory=async(req)=>{
    try{
        const response=await fetch("http://localhost:5000/api/category",{
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

const updateCategory=async(req)=>{
    try{
        const response=await fetch("http://localhost:5000/api/category",{
            method:"put",
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


export {getAllCategory};
export {getPagenatedCategory};
export {deleteCategory};
export {getCategoryByID};
export {AddCategory};
export {updateCategory};
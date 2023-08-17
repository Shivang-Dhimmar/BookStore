import {toast} from "react-toastify";
const getCart=async(id)=>{
    try{

        const response=await fetch(`http://localhost:5000/api/cart?userId=${id}`,{
            headers:{
                "Content-Type":"Application/json",
                "Accept":"Application/json",
            },
        });
        const response2=await response.json();
        // console.log(response2);
        return response2;
    }
    catch(error){
        toast.error(error);
    }
}


const addItem=async(req)=>{
    try{

        const response=await fetch("http://localhost:5000/api/cart",{
            headers:{
                "Content-Type":"Application/json",
                "Accept":"Application/json",
            },
            method:"POST",
            body:JSON.stringify(req)
        });
        const response2=await response.json();
        return response2;
    }
    catch(error){
        toast.error(error);
    }
}

const updateItem=async(req)=>{
    try{
        const response=await fetch("http://localhost:5000/api/cart",{
            headers:{
                "Content-Type":"Application/json",
                "Accept":"Application/json",
            },
            method:"PUT",
            body:JSON.stringify(req)
        });
        const response2=await response.json();
        return response2;
    }
    catch(error){
        toast.error(error);
    }
}

const deleteItem=async(id)=>{
    try{
        const response=await fetch(`http://localhost:5000/api/cart?id=${id}`,{
            headers:{
                "Content-Type":"Application/json",
                "Accept":"Application/json",
            },
            method:"DELETE",
        });
        const response2=await response.json();
        return response2;
    }
    catch(error){
        toast.error(error);
    }
}

export {getCart};
export {addItem};
export {updateItem};
export {deleteItem};
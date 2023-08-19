import {toast} from "react-toastify";
const updateUser=async(req)=>{
    try{

        const response=await fetch("http://localhost:5000/api/user",{
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


const getPagenatedUsers=async(filter)=>{

    try{
        let URL="";
        if(filter.keyword){
            URL=`http://localhost:5000/api/user?pageSize=${filter.pageSize}&pageIndex=${filter.pageIndex}&keyword=${filter.keyword}`;
        }
        else{
            URL=`http://localhost:5000/api/user?pageSize=${filter.pageSize}&pageIndex=${filter.pageIndex}`;
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
        toast.error(e);
    }
}


const deleteUser=async(id)=>{
    try{

        const response=await fetch(`http://localhost:5000/api/user?id=${id}`,{
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
        toast.error(error);
    }
}


const getRolls=async()=>{
    try{

        const response=await fetch("http://localhost:5000/api/user/all/roles",{
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

const getUserByID=async(id)=>{
    try{

        const response=await fetch(`http://localhost:5000/api/user/byId?id=${id}`,{
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

export {updateUser};
export {getPagenatedUsers};
export {deleteUser};
export {getRolls};
export {getUserByID};

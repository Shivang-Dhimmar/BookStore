import {toast} from "react-toastify";



const create=async(req)=>{
    try{  
        const response=await fetch("http://localhost:5000/api/user",{
            method:"POST",
            headers:{
                "Content-Type":"Application/json",
                "Accept":"Application/json",
            },
            body:JSON.stringify(req)
        });
        const data=await response.json();
        // const  status=data.key;
        // console.log(status);
        // console.log(data);
        if(data.key==="SUCCESS"){
            toast.success("Registered Successfully");
            return data.key;
        }
        else if(data.code===409){
            toast.error("User Already Exists");
        }
        else{
            toast.error("There is something wrong");
        }
    }
    catch(error){
        toast.error(error);
    }
    
}

const login=async(req)=>{
    try{
        const response2=await fetch("http://localhost:5000/api/user/login",{
            method:"POST",
            headers:{
                "Content-Type":"Application/json",
                "Accept":"Application/json",
            },
            body:JSON.stringify(req)
        });
        const data2=await response2.json();
        if(data2.key==="SUCCESS"){
            toast.success("Logedin Successfully");
        }
        else{
            toast.error("There is something wrong");
        }
    }
    catch(error){
        toast.error(error);
    }
}

const authService={
    create,
    login
}

export {authService};

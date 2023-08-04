import {toast} from "react-toastify";

const create=async(req)=>{
    fetch("http://localhost:5000/api/user",{
        method:"POST",
        headers:{
            "Content-Type":"Application/json",
            "Accept":"Application/json",
        },
        body:JSON.stringify(req)
    }).then((res)=>{
        res=res.json();
        return res;
    }).catch((error)=>{
        toast.error(error);
    })
}

const login=async(req)=>{
    fetch("http://localhost:5000/api/user/login",{
        method:"POST",
        headers:{
            "Content-Type":"Application/json",
            "Accept":"Application/json",
        },
        body:JSON.stringify(req)
    }).then((res)=>{
        res=res.json();
        return res;
    }).catch((error)=>{
        toast.error(error);
    })
}

const authService={
    create,
    login
}

export {authService};

import classes from './Booklisting.module.css';
import {useEffect,useState} from 'react';
import {getPagenatedBookList} from './myService/bookService';
import {toast} from "react-toastify";

function Booklisting(){
    const [booklist,setBooklist]=useState([]);
    const [bookresponse,setBookresponse]=useState({
        pageIndex:0,
        pageSize:10,
        totalPages:1,
        items:[],
        totalItems:0
    });
    const setbookrecord=async()=>{
        const response=await getPagenatedBookList();
        return response;
    }
    // useEffect(()=>{
    //     try{
    //         let response=setbookrecord();
    //         console.log(response);
    //         if(response.key==="SUCCESS"){
    //             setBookresponse(response.result);
    //             setBooklist(response.result.items);
    //         }
    //         else{
    //             toast.error("There is Something Wrong");
    //         }
    //     }
    //     catch(e){
    //         toast.error(e);
    //     }
    // },[])
    return(
        <div className={classes.wrapper}>
            <div>
                <h1 className={classes.heading}>Book Listing</h1>
            </div>
            <div className={classes.searchLine}>
                <div>
                    Total - {bookresponse.totalItems} items
                </div>
                <div>
                
                </div>
                <div>
                
                </div>
            </div>
        </div>
    )
}
export {Booklisting};
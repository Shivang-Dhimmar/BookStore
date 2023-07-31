import React from "react";
import classes from "./Shivang.module.css"; 
function Shivang(props){
    return(
        <React.Fragment>
        <h1 className={classes.h1Style}>This is Shivang Component</h1>
        <h2>His Age is {props.age}</h2>
        </React.Fragment>
       
    );
}



export {Shivang};

import { Button } from '@material-ui/core';
import React,{useState} from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import {ButtonStyle} from './ButtonStyle';
function Count(){
    const [count,setCount]=useState(0);
    const buttonclasses=ButtonStyle();
    return(
        <>
        <p><b>{count}</b></p>
        <Button color='primary' className={buttonclasses.button} variant="contained" startIcon={<ArrowUpwardIcon/>} size="midium" onClick={()=>setCount(count+1)}>Increment</Button>
        <Button color='secondary' className={buttonclasses.button}  variant="contained" startIcon={<ArrowDownwardIcon/>} size="midium" onClick={()=>setCount(count-1)}>Decrement</Button>
        </>
    );
}
export {Count};
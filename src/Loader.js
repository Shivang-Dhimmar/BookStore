import classes from './Loader.module.css'
import loader from './assets/images/loader.gif';
function Loader(props){
    if(props.visible){
        const loader=document.getElementById("loader");
        loader.classList.add("visible");
    }
    else{
        const loader=document.getElementById("loader");
        loader.classList.remove("visible");
    }
    return( 
        <img src={loader} alt="loader" id="loader" className={classes.loader}/>
    );
}
export {Loader};
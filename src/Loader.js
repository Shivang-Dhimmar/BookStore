import classes from './Loader.module.css'
import loader from './assets/images/loader.gif';
function Loader(){
    return( 
        <img src={loader} alt="loader" id="loader" className={classes.loader}/>
    );
}
export {Loader};
import classes from './Register.module.css';
function ShowErrorMessage(props2){
    return(
        <div className={classes.error}>
        {props2.click&& props2.error}
        </div>
    );
}

export {ShowErrorMessage};
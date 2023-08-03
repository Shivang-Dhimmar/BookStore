import classes from './Register.module.css';
function ErrorMessage(props){
    return(
        <>
        <p className={classes.error}>
        {props.error ? props.error : ""}
        </p>
        </>
    );
}

export {ErrorMessage};
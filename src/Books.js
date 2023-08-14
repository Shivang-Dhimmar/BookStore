import classes from './Books.module.css';
import {Button,TextField} from '@material-ui/core';
import {useNavigate} from "react-router-dom";
import {RoutePaths} from './utils/enum';

function Books(){
    const navigate=useNavigate();
    return(
        <div className={classes.wrapper}>
            <div className={classes.headingWrapper}>
                <h1 className={classes.heading}>Book Page</h1>
            </div>
            <div className={classes.search}>
                <div className={classes.bookSearch}>
                    <TextField className={classes.box} variant="outlined" name='bookSerach' placeholder='search...'  />
                </div>
                <div className={classes.searchButton}>
                    <Button  className={classes.btn} type='button' color='primary' variant="contained"  size="medium" onClick={()=>navigate(RoutePaths.AddBook)}>Add Book</Button>
                </div>

            </div>
        </div>
    );
}
export {Books};
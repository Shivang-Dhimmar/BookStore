
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField,Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import {ShowErrorMessage} from './ShowErrorMessage';
import classes from './Register.module.css';
import {authService} from './myService/authService';
import {toast} from "react-toastify";
import {useAuthContext} from "./context";
import {RoutePaths} from './utils/enum';
import {useNavigate} from "react-router-dom";

function Login(){
    const initialValue={
        email:"",
        password:""
    }
    const navigate=useNavigate();
    const validationSchema=Yup.object().shape({
        email:Yup.string().required('Email is required').email("Enter valid email"),
        password:Yup.string().required("Password is required"),
    })
    const userContext=useAuthContext();

    const onSubmit =async (data) => {
        try{
            const response=await authService.login(data);
            if(response.key==="SUCCESS"){
                toast.success("Logedin Successfully",{theme:"colored"});
                delete response.result._id;
                delete response.result.__v;
                userContext.setUser(response.result);
                navigate(RoutePaths.BookListing);
                userContext.setHasLogedIn(true);
                // alert(userContext.userValues.id);
            }
            else if(response.key==="UNAUTHORIZED"){
                toast.error("Wrong Credentials",{theme:"colored"});
            }
            else{
                toast.error("There is Something Wronng",{theme:"colored"});
            }
            
        }
        catch(error){
            toast.error(error,{theme:"colored"});
        };  
    };
    

    return(
        <div className={classes.loginformcontainer}>
            <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit}>
            {
                ({values,touched,errors,handleBlur,handleChange,handleSubmit})=>{

                return(
                    <form onSubmit={handleSubmit}>
                        <h2 className={classes.loginpagehead}>Login or Create an Account</h2>
                        <div className={classes.lonincontainer}>
                            <div className={classes.logincolumn}>
                                <p className={classes.loginheading1}>New Customer</p>
                                <hr className={classes.loginline1}/>
                                <p>
                                    Registration is free and easy
                                    <ul>
                                        <li>Faster Checkcut</li>
                                        <li>Save multiple shipping addresses</li>
                                        <li>View and track orders and more</li>
                                    </ul>
                                </p>
                                <NavLink to='/register'><Button color='primary' variant="contained"  size="midium">Create an Account</Button></NavLink> 
                            </div>
                            <div className={classes.logincolumn}>
                                <p className={classes.loginheading1}>Registered Customer</p>
                                <hr className={classes.loginline1}/>
                                <p>If you have an account with us,please log in</p>
                                <div className={classes.loginfield}>
                                    <TextField label="Email*" variant="outlined" type='text' name='email' className={classes.loginfield2} onChange={handleChange} onBlur={handleBlur}/>
                                    <ShowErrorMessage error={errors.email} click={touched.email}/>
                                </div>
                                <div className={classes.loginfield}>
                                    <TextField label="Password*" variant="outlined" type='password' name='password' className={classes.loginfield2} onChange={handleChange} onBlur={handleBlur} />
                                    <ShowErrorMessage error={errors.password} click={touched.password}/>
                                </div>
                                <Button color='primary' variant="contained"  size="medium" type="submit">Submit</Button>
                            </div>
                        </div>
                    </form>
                );
                }
            }
            </Formik>
        </div>
    );
}

export {Login};
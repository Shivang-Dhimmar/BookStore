
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField,Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import {ShowErrorMessage} from './ShowErrorMessage';
import classes from './Register.module.css';
import {authService} from './myService/authService';
import {toast} from "react-toastify";

function Login(){
    const initialValue={
        email:"",
        password:""
    }
    const validationSchema=Yup.object().shape({
        email:Yup.string().required('Email is required').email("Enter valid email"),
        password:Yup.string().required("Password is required").min(5,"password must be atleast 5 character long").max(12,"password must be atmost 12 charactes long"),
    })

    const onSubmit = (data) => {
        try{
            authService.login(data);
        }
        catch(error){
            toast.error(error);
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
                                    <ShowErrorMessage error={errors.email} touch={touched.email}/>
                                </div>
                                <div className={classes.loginfield}>
                                    <TextField label="Password*" variant="outlined" type='password' name='password' className={classes.loginfield2} onChange={handleChange} onBlur={handleBlur} />
                                    <ShowErrorMessage error={errors.password} touch={touched.password}/>
                                </div>
                                <Button color='primary' variant="contained"  size="midium" type="submit">Submit</Button>
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
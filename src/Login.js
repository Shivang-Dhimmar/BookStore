
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField,Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import {ErrorMessage} from './ErrorMessage';
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
        authService.login(data).then((res)=>{
            console.log("hi");
            if(res.key==="SUCCESS"){
                toast.success("Successfully login");
                console.log("hiinner");
                
            }  
        }).catch((error)=>{
            toast.error(error);
        });
       
    };
    

    return(
        <>
            <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit}>
            {
                ({values,touched,errors,handleChange,handleSubmit})=>{

                return(
                    <form onSubmit={handleSubmit}>
                        <h2>Login or Create an Account</h2>
                        <div className={classes.container}>
                            <div>
                                <p className={classes.heading1}>New Customer</p>
                                <hr className={classes.line1}/>
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
                            <div>
                                <p className={classes.heading1}>Registered Customer</p>
                                <hr className={classes.line1}/>
                                <p>If you have an account with us,please log in</p>
                                <div>
                                    <TextField label="Email*" variant="outlined" type='text' name='email' onChange={handleChange} />
                                    <ErrorMessage error={errors.email} touch={touched.email}/>
                                </div>
                                <div>
                                    <TextField label="Password*" variant="outlined" type='password' name='password' onChange={handleChange} />
                                    <ErrorMessage error={errors.password} touch={touched.password}/>
                                </div>
                                <Button color='primary' variant="contained"  size="midium" type="submit">Submit</Button>
                            </div>
                        </div>
                    </form>
                );
                }
            }
            </Formik>
        </>
    );
}

export {Login};

import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField,FormControl,InputLabel,MenuItem,Select,Button } from '@material-ui/core';
import {ShowErrorMessage} from './ShowErrorMessage';
import classes from './Register.module.css';
import {authService} from './myService/authService';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


function Register(){
    const navigate=useNavigate();
    const initialValue={
        firstName:"",
        lastName:"",
        email:"",
        roleId:0,
        password:"",
        conpassword:""
    }
    const validationSchema=Yup.object().shape({
        firstName:Yup.string().required("First Name is required").matches(/^[aA-zZ\s]+$/, "Enter valid first name"),
        lastName:Yup.string().required("Last Name is required").matches(/^[aA-zZ\s]+$/, "Enter valid last name"),
        email:Yup.string().required('Email is required').email("Enter valid email"),
        roleId:Yup.number().required('Role is required'),
        password:Yup.string().required("Password is required").min(5,"password must be atleast 5 character long").max(12,"password must be atmost 12 charactes long"),
        conpassword:Yup.string().required("Confirm Password is required").oneOf([Yup.ref("password"),null],"password and confirm password must be match")
    })

    const onSubmit =async (data) => {
        delete data.conpassword;
        try{
            const key=await authService.create(data);
            console.log(key);
            if(key==="SUCCESS"){
                navigate("./../login");
            }
        }
        catch(error){
            toast.error("There is something wrong");
        }
        // console.log(res);
        // if(res.key==="SUCCESS"){
        //     toast.success("Registered Successfully")
        //     navigate("/login");
        // }
        // else{
        //     toast.error("Something Wrong");
        // }
    };
    

    return(
        <div className={classes.formWrapper}>
            <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit}>
            {
                ({values,touched,errors,handleBlur,handleChange,handleSubmit})=>{

                return(
                    

                    <form onSubmit={handleSubmit}>
                        <h2 className={classes.heading}>Personal Information</h2>
                        <hr className={classes.loginline}/>
                        <p className={classes.heading}>Please enter the following details to create your account</p>
                        <div className={classes.row}>
                            <div className={classes.fieldWrapper}>
                                <TextField className={classes.field} label="First Name*" variant="outlined" type='text' name='firstName' onBlur={handleBlur} onChange={handleChange} />
                                <ShowErrorMessage name='firstName' error={errors.firstName} click={touched.firstName}/>
                            </div>
                            <div className={classes.fieldWrapper}>
                                <TextField className={classes.field} label="Last Name*" variant="outlined" type='text' name='lastName' onBlur={handleBlur} onChange={handleChange} />
                                <ShowErrorMessage error={errors.lastName} click={touched.lastName}/>
                            </div>
                        </div>
                        <div className={classes.row}>
                            <div className={classes.fieldWrapper}>
                                <TextField className={classes.field} label="Email*" variant="outlined" type='text' name='email' onBlur={handleBlur} onChange={handleChange} />
                                <ShowErrorMessage error={errors.email} click={touched.email}/>
                            </div>
                            <div className={classes.fieldWrapper}>
                            <FormControl className={classes.field} variant="outlined" onBlur={handleBlur}>
                                <InputLabel id="demo-simple-select-outlined-label">Roles*</InputLabel>
                                <Select
                                labelId="demo-simple-select-outlined-label"
                                name="roleId"
                                onChange={handleChange}
                                label="Roles*"
                                width={15}
                                >
                                <MenuItem value={2}>Buyer</MenuItem>
                                <MenuItem value={3}>Seller</MenuItem>
                                </Select>
                            </FormControl>
                                <ShowErrorMessage error={errors.roleId} click={touched.roleId}/>
                            </div>
                        </div>
                        <h2 className={classes.heading}>Login Information</h2>
                        <hr className={classes.loginline}/>
                        <div className={classes.row}>
                            <div className={classes.fieldWrapper}>
                                <TextField className={classes.field} label="Password*" variant="outlined" type='password' name='password' onBlur={handleBlur} onChange={handleChange} />
                                <ShowErrorMessage  error={errors.password} click={touched.password}/>
                            </div>
                            <div className={classes.fieldWrapper}>
                                <TextField className={classes.field} label="Confirm Password*" variant="outlined" type='password' name='conpassword' onBlur={handleBlur} onChange={handleChange} />
                                <ShowErrorMessage error={errors.conpassword} click={touched.conpassword}/>
                            </div>
                        </div>
                        <Button color='primary' variant="contained"  size="medium" type="submit">Submit</Button>
                    </form>
                );
                }
            }
            </Formik>
        </div>
    );
}

export {Register};
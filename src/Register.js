
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField,FormControl,InputLabel,MenuItem,Select,Button } from '@material-ui/core';
import {ErrorMessage} from './ErrorMessage';
import classes from './Register.module.css';
import authService from './service/auth.service';
import { toast } from "react-toastify";
function Register(){
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
        password:Yup.string().required("Password is required").min(8,"password must be atleast 8 character long").max(12,"password must be atmost 12 charactes long"),
        conpassword:Yup.string().required("Confirm Password is required").oneOf([Yup.ref("password"),null],"password and confirm password must be match")
    })

    const onSubmit = (data) => {
        delete data.conpassword;
        authService.create(data).then((res) => {
        //   navigate("/login");
          toast.success("Successfully registered");
        });
        // alert("Registered");
    };
    

    return(
        <>
            <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={onSubmit}>
            {
                ({values,touched,errors,handleChange,handleSubmit})=>{

                return(
                    <form onSubmit={handleSubmit}>
                        <h2 className={classes.heading}>Personal Information</h2>
                        <hr className={classes.line}/>
                        <p className={classes.heading}>Please enter the following details to create your account</p>
                        <div className={classes.row}>
                            <div>
                                <TextField label="First Name*" variant="outlined" type='text' name='firstName' onChange={handleChange} />
                                <ErrorMessage error={errors.firstName} touch={touched.firstName}/>
                            </div>
                            <div>
                                <TextField label="Last Name*" variant="outlined" type='text' name='lastName' onChange={handleChange} />
                                <ErrorMessage error={errors.lastName} touch={touched.lastName}/>
                            </div>
                        </div>
                        <div className={classes.row}>
                            <div>
                                <TextField label="Email*" variant="outlined" type='text' name='email' onChange={handleChange} />
                                <ErrorMessage error={errors.email} touch={touched.email}/>
                            </div>
                            <div>
                            <FormControl variant="outlined">
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
                                <ErrorMessage error={errors.roleId} touch={touched.roleId}/>
                            </div>
                        </div>
                        <h2 className={classes.heading}>Login Information</h2>
                        <hr className={classes.line}/>
                        <div className={classes.row}>
                            <div>
                                <TextField label="Password*" variant="outlined" type='password' name='password' onChange={handleChange} />
                                <ErrorMessage error={errors.password} touch={touched.password}/>
                            </div>
                            <div>
                                <TextField label="Confirm Password*" variant="outlined" type='password' name='conpassword' onChange={handleChange} />
                                <ErrorMessage error={errors.conpassword} touch={touched.conpassword}/>
                            </div>
                        </div>
                        <Button color='primary' variant="contained"  size="midium" type="submit">Submit</Button>
                    </form>
                );
                }
            }
            </Formik>
        </>
    );
}

export {Register};

import classes from './EditBook.module.css';
import {useNavigate} from "react-router-dom";
import { Formik } from "formik";
import { useState} from "react";
import * as Yup from "yup";
import { TextField,Button } from '@material-ui/core';
import {ShowErrorMessage} from './ShowErrorMessage';
import shared from './utils/shared';
import {updateUser} from './myService/userService';
import {toast} from "react-toastify";
import {RoutePaths} from './utils/enum';
import {useAuthContext} from './context';

function UpdateUser(){
  const redColor = "#ff0000";
    const userContext=useAuthContext();
    const userValue=userContext.userValues;
    const navigate=useNavigate();
    const initialValueState = {
        email: userValue.email,
        firstName: userValue.firstName,
        lastName: userValue.lastName,
        newPassword: "",
        confirmPassword: "",
    };
    const [updatePassword, setUpdatePassword] = useState(false);
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email address format").required("Email is required"),
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        newPassword:Yup.string().min(5,"password must be atleast 5 character long").max(12,"password must be atmost 12 charactes long"),
        confirmPassword: updatePassword ? Yup.string().required("Must required").oneOf([Yup.ref("newPassword")], "Passwords is not match"): Yup.string().oneOf([Yup.ref("newPassword")], "Passwords is not match"),
    });

    const onSubmit = async (values) => {
        try{
            
            const password = values.newPassword ? values.newPassword : userValue.password;
            delete values.confirmPassword;
            delete values.newPassword;
            
            const data = Object.assign(userValue, { ...values, password });
            // delete data._id;
            // delete data.__v;
            const res = await updateUser(data);
            if (res.key==="SUCCESS") {
                userContext.setUser(res);
                toast.success(shared.messages.UPDATED_SUCCESS,{theme:"colored"});
                navigate("/");
            }
            else if(res.code===403){
                toast.error("You can't update admin credential.",{theme:"colored"});
            }
            else{
                toast.error("There is Something wrong",{theme:"colored"});
            }
        }
        catch(error){
            toast.error(error,{theme:"colored"});
        }
      };
    
    

    return(
        <div className={classes.wrapper}>
            <h1 className={classes.heading}>Update Profile</h1>
            <Formik
                initialValues={initialValueState}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validator={() => ({})}
            >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
            }) => (
            <form onSubmit={handleSubmit} className={classes.form}>
              <div className={classes.firstRowWrapper}>
                <div className={classes.firstname}>
                  <TextField
                    id="first name"
                    name="firstName"
                    label="First Name *"
                    className={classes.fields}
                    variant="outlined"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <ShowErrorMessage
                    error={errors.firstName}
                    click={touched.firstName}
                  />
                </div>

                <div className={classes.lastname}>
                  <TextField
                    id="last name"
                    name="lastName"
                    className={classes.fields}
                    label="Last Name *"
                    variant="outlined"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <ShowErrorMessage
                    error={errors.lastName}
                    click={touched.lastName}
                  />
                </div>
              </div>

                <div className={classes.firstRowWrapper}>
                  <div className="email">
                    <TextField
                        id="email"
                        name="email"
                        className={classes.fields}
                        label="Email *"
                        variant="outlined"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                    />
                    <ShowErrorMessage
                        error={errors.email}
                        click={touched.email}
                    />
                  </div>
                
                  <div className="new password">
                    <TextField
                        id="new password"
                        name="newPassword"
                        label="New Password"
                        className={classes.fields}
                        variant="outlined"
                        value={values.newPassword}
                        onChange={(e) => {
                            e.target.value !== ""
                            ? setUpdatePassword(true)
                            : setUpdatePassword(false);
                            handleChange(e);
                        }}
                        onBlur={handleBlur}
                    />
                    <ShowErrorMessage
                        error={errors.newPassword}
                        click={touched.newPassword}
                    />
                  </div>
                </div>
                <div className={classes.confirmPassword}>
                    <TextField
                      id="confirm password"
                      name="confirmPassword"
                      label="Confirm Password"
                      className={classes.fields}
                      variant="outlined"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  <ShowErrorMessage
                        error={errors.confirmPassword}
                        click={touched.confirmPassword}
                  />
                </div>
              <div className={classes.buttonWrapper}>
                <Button
                  className={classes.save}
                  variant="contained"
                  type="submit"
                  style={{ marginRight:'4vw'}}
                  color="secondary"
                  // disableElevation
                >
                  Save
                </Button>
                <Button
                  className={classes.cancel}
                  variant="contained"
                  type="button"
                  style={{ backgroundColor: redColor,color:'white'}}
                  // disableElevation
                  onClick={() => {
                    navigate(RoutePaths.User);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </Formik>   
            
        </div>
    );
}

export {UpdateUser};
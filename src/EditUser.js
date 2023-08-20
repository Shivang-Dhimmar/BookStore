
import classes from './EditBook.module.css';
import {useNavigate,useParams} from "react-router-dom";
import { Formik } from "formik";
import { useState,useEffect} from "react";
import * as Yup from "yup";
import shared from './utils/shared';
import { TextField,Button,FormControl,InputLabel,Select,MenuItem } from '@material-ui/core';
import {ShowErrorMessage} from './ShowErrorMessage';
import {updateUser,getRolls,getUserByID} from './myService/userService';
import {toast} from "react-toastify";
import {RoutePaths} from './utils/enum';
import {useAuthContext} from './context';


function EditUser(){
    const userContext=useAuthContext();
    const navigate=useNavigate();
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState({});
    const initialValues = {
        id: 0,
        email: "",
        lastName: "",
        firstName: "",
        roleId: 3,
    };
    const [initialValueState, setInitialValueState] = useState(initialValues);
    const { id } = useParams();
    
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email address format").required("Email is required"),
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        roleId: Yup.number().required("Role is required"),
    });


    useEffect(() => {
        getAllRoles();
    }, []);

    useEffect(() => {
        if (id) {
          getUserById();
        }
    }, [id]);

    useEffect(() => {
        if (user && roles.length) {
          const roleId = roles.find((role) => role.name === user?.role)?.id;
          setInitialValueState({
            id: user.id,
            email: user.email,
            lastName: user.lastName,
            firstName: user.firstName,
            roleId,
            password: user.password,
          });
        }
    }, [user, roles]);

    const getUserById =async () => {
        try{

            const res=await getUserByID(Number(id)) ;
            if (res.key==="SUCCESS") {
                setUser(res.result);
            }
            else{
                toast.error("There is something wrong");
            }
        }
        catch(error){
            toast.error(error);
        }
      };

    const getAllRoles=async()=>{
        try{
            const res=await getRolls();
            if(res.key==="SUCCESS"){
                setRoles(res.result);
            }else{
                toast.error("There is Something Wrong");
            }

        }
        catch(error){
            toast.error(error);
        }
    }
    const onSubmit = (values) => {
        const updatedValue = {
          ...values,
          role: roles.find((r) => r.id === values.roleId).name,
        };
        updateUser(updatedValue)
          .then((res) => {
            if (res.key==="SUCCESS") {
              toast.success(shared.messages.UPDATED_SUCCESS);
              navigate(RoutePaths.User);
            }
          })
          .catch((e) => toast.error(shared.messages.UPDATED_FAIL));
      };
    
    

    return(
        <div className={classes.wrapper}>
            <h1 className={classes.heading}>Edit User</h1>
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
                  {values.id !== userContext.userValues.id && (
                  <div className="new password">
                    <FormControl
                        className="dropdown-wrapper"
                        variant="outlined"
                        disabled={values.id === userContext.userValues.id}
                      >
                        <InputLabel htmlFor="select">Roles</InputLabel>
                        <Select
                          name="roleId"
                          id={"roleId"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={classes.fields}
                          disabled={values.id === userContext.userValues.id}
                          value={values.roleId}
                        >
                          {roles.length > 0 &&
                            roles.map((role) => (
                              <MenuItem value={role.id} key={"name" + role.id}>
                                {role.name}
                              </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    <ShowErrorMessage
                        error={errors.roleId}
                        click={touched.roleId}
                    />
                  </div>
                  )}
                </div>
              <div className={classes.buttonWrapper}>
                <Button
                  className={classes.save}
                  variant="contained"
                  type="submit"
                  color="secondary"
                  // disableElevation
                >
                  Save
                </Button>
                <Button
                  className={classes.cancel}
                  variant="contained"
                  type="button"
                  color="error"
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

export {EditUser};
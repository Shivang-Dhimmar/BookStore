import classes from './EditBook.module.css';
import {useNavigate,useParams} from "react-router-dom";
import { Formik } from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import { TextField,Button } from '@material-ui/core';
import {ShowErrorMessage} from './ShowErrorMessage';
import {getCategoryByID,AddCategory,updateCategory} from './myService/categoryService';
import {toast} from "react-toastify";
import {RoutePaths} from './utils/enum';
function EditCategory(){
  const redColor = "#ff0000";
    const initialValues = {
        name: "",
    };
    const navigate=useNavigate();
    const { id } = useParams();
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Category Name is required"),
    });

    const [initialValueState, setInitialValueState] = useState(initialValues);
    
    useEffect(()=>{
      if(id){
        getCategoryByID2();
      }
    },[id]);
    const getCategoryByID2=async()=>{
      try{
        const bookDetails=await getCategoryByID(id);
        if(bookDetails.key==="SUCCESS"){
            const bookresponse=bookDetails.result;
            setInitialValueState({
                id: bookresponse.id,
                name: bookresponse.name,
                
            });
        }
        else{
            toast.error("There is Somethng wrong while fetching category details.",{theme:"colored"})
        }
    }
      catch(error){
        toast.error(error,{theme:"colored"});
      }
    };
    
    const onSubmit = async (values) => {
      try{
        if(!initialValueState.id){

          const response=await AddCategory(values);
          if(response.key==="SUCCESS"){
            toast.success("Category added Successfully.",{theme:"colored"});
            navigate(RoutePaths.Category);
          }
          else if(response.code===400){
            toast.error("Bad Request",{theme:"colored"});
          }
          else{
            toast.error("Threre is something wrong",{theme:"colored"});
          }
        }
        else{
          const response=await updateCategory(values);
          if(response.key==="SUCCESS"){
            toast.success("Category updated Successfully.",{theme:"colored"});
            navigate(RoutePaths.Category);
          }
          else if(response.code===400){
            toast.error("Bad Request",{theme:"colored"});
          }
          else{
            toast.error("Threre is something wrong",{theme:"colored"});
          }
        }
      }
      catch(error){
        toast.error(error,{theme:"colored"});
      }    
    };

    return(
        <div className={classes.wrapper}>
            <h1 className={classes.heading}>{id?"Edit":"Add"} Category</h1>
            <Formik
                initialValues={initialValueState}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={onSubmit}
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
                <div className={classes.categoryname}>
                  <TextField
                    id="category name"
                    name="name"
                    label="Category Name *"
                    className={classes.fields}
                    variant="outlined"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <ShowErrorMessage
                    error={errors.name}
                    click={touched.name}
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
                    navigate(RoutePaths.Category);
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

export {EditCategory};
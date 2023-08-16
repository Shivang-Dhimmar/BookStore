
import classes from './EditBook.module.css';
import {useNavigate,useParams} from "react-router-dom";
import { Formik } from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import { TextField,FormControl,InputLabel,MenuItem,Select,Button,Input } from '@material-ui/core';
import {ShowErrorMessage} from './ShowErrorMessage';
import {getAllCategory} from './myService/categoryService';
import {addBook,getBookByID,updateBook} from './myService/bookService';
import {toast} from "react-toastify";
import {RoutePaths} from './utils/enum';
function EditBook(){
    const initialValues = {
        name: "",
        price: 0,
        categoryId: 0,
        description: "",
        base64image: "",
    };
    const navigate=useNavigate();
    const { id } = useParams();
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Book Name is required"),
        description: Yup.string().required("Description is required"),
        categoryId: Yup.number().required("Category is required"),
        price: Yup.number().required("Price is required"),
        base64image: Yup.string().required("Image is required"),
    });

    const [initialValueState, setInitialValueState] = useState(initialValues);
    const [categories, setCategories] = useState([]);
    const setcategory=async()=>{
      try{
        const response=await getAllCategory();
        if(response.key==="SUCCESS"){
          setCategories(response.result);
        }
        else{
          toast.error("There is Something wrong");
        }
      }
      catch(error){
        toast.error(error);
      }

    };
    useEffect(()=>{
      if(id){
        getBookByID2();
      }
      setcategory();
    },[id]);
    const getBookByID2=async()=>{
      try{
        const bookDetails=await getBookByID(id);
        const bookresponse=bookDetails.result;
        setInitialValueState({
          id: bookresponse.id,
          name: bookresponse.name,
          price: bookresponse.price,
          categoryId: bookresponse.categoryId,
          description: bookresponse.description,
          base64image: bookresponse.base64image,
        });
      }
      catch(error){
        toast.error(error);
      }
    };
    const onSelectFile = (e, setFieldValue, setFieldError) => {
      const files = e.target.files;
      if (files?.length) {
        const selectedFile = e.target.files[0];
        const fileNameArray = selectedFile.name.split(".");
        const extension = fileNameArray.pop();
        if (["png", "jpg", "jpeg"].includes(extension?.toLowerCase())) {
          if (selectedFile.size > 200000) {
            toast.error("File size must be less then 200KB");
            return;
          }

          const reader = new FileReader();
          reader.readAsDataURL(selectedFile);
          reader.onload = function () {
            setFieldValue("base64image", reader.result);
          };
          
          reader.onerror = function (error) {
            throw error;
          };
        } else {
          toast.error("only jpg,jpeg and png files are allowed");
        }
      } else {
        setFieldValue("base64image", "");
      }
    };
    const onSubmit = async (values) => {
      try{
        if(!initialValueState.id){

          const response=await addBook(values);
          if(response.key==="SUCCESS"){
            toast.success("Book added Successfully.");
            navigate(RoutePaths.Book);
          }
          else if(response.code===400){
            toast.error("Bad Request");
          }
          else{
            toast.error("Threre is something wrong");
          }
        }
        else{
          const response=await updateBook(values);
          if(response.key==="SUCCESS"){
            toast.success("Book updated Successfully.");
            navigate(RoutePaths.Book);
          }
          else if(response.code===400){
            toast.error("Bad Request");
          }
          else{
            toast.error("Threre is something wrong");
          }
        }
      }
      catch(error){
        toast.error(error);
      }    
    };

    return(
        <div className={classes.wrapper}>
            <h1 className={classes.heading}>{id?"Edit":"Add"} Book</h1>
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
                setValues,
                setFieldError,
                setFieldValue,
            }) => (
            <form onSubmit={handleSubmit} className={classes.form}>
              <div className={classes.firstRowWrapper}>
                <div className={classes.bookname}>
                  <TextField
                    id="book name"
                    name="name"
                    label="Book Name *"
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

                <div className={classes.bookPrice}>
                  <TextField
                    type={"number"}
                    id="price"
                    name="price"
                    className={classes.fields}
                    label="Book Price (RS)*"
                    variant="outlined"
                    value={values.price}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <ShowErrorMessage
                    error={errors.price}
                    click={touched.price}
                  />
                </div>
              </div>

                <div className={classes.firstRowWrapper}>
                  <div className="category">
                  <FormControl className="" variant="outlined" onBlur={handleBlur}>
                    <InputLabel htmlFor="select">Category *</InputLabel>
                    <Select
                      name={"categoryId"}
                      id={"category"}
                      onChange={handleChange}
                      className={classes.fields}
                      value={values.categoryId}
                    >
                      {categories?.map((category) => (
                        <MenuItem value={category.id} key={"category" + category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <ShowErrorMessage
                    error={errors.categoryId}
                    click={touched.categoryId}
                  />
                  </div>
                
                  <div className={classes.image64}>
                    {!values.base64image && (
                      <>
                        {" "}
                        <label
                          htmlFor="contained-button-file"
                          className={classes.fields}
                        >
                          <Input
                            id="contained-button-file"
                            type="file"
                            style={{display:"none",}}
                            color="primary"
                            onBlur={handleBlur}
                            onChange={(e) => {
                              onSelectFile(e, setFieldValue, setFieldError);
                            }}
                          />
                          <Button
                            variant="contained"
                            component="span"
                            color="primary"
                            className={classes.imageButton}
                          //   className="btn pink-btn"
                          >
                            Upload Image
                          </Button>
                        </label>
                        <ShowErrorMessage
                          error={errors.base64image}
                          click={touched.base64image}
                        />
                      </>
                    )}
                    {values.base64image && (
                      <div className={classes.fields}>
                        <em>
                          <img className={classes.image} src={values.base64image} alt="fileImage" />
                        </em>
                        <b>image{" "}</b>
                        <span
                          onClick={() => {
                            setFieldValue("base64image", "");
                          }}
                        >
                         <b> x</b>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className={classes.description}>
                  <TextField
                    id="description"
                    name="description"
                    label="Description *"
                    className={classes.descriptionField}
                    variant="outlined"
                    value={values.description}
                    multiline
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <ShowErrorMessage
                        error={errors.description}
                        click={touched.description}
                  />
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
                    navigate(RoutePaths.Book);
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

export {EditBook};
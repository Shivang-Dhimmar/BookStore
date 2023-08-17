import classes from './Books.module.css';
import {Button,TextField} from '@material-ui/core';
import {useNavigate} from "react-router-dom";
import {RoutePaths} from './utils/enum';
import { useState,useEffect } from 'react';
import {defaultBookPageFilter,RecordsPerPage} from './constants/Constant';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import {getPagenatedCategory,deleteCategory} from './myService/categoryService';
import {toast} from "react-toastify";
import { red } from "@material-ui/core/colors";
import ConfirmationDialog from "./ConfirmationDialog";

function Category(){
    const navigate=useNavigate();
    const [filters,setFilters]=useState(defaultBookPageFilter);
    const [categoriesResult, setCategoriesResult] = useState({
        pageIndex: 0,
        pageSize: 2,
        totalPages: 1,
        items: [],
        totalItems: 0,
    });
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
          if (filters.keyword === "") delete filters.keyword;
          searchPaginatedCategories({ ...filters });
        }, 1000);
        return () => clearTimeout(timer);
    }, [filters]);

    async function searchPaginatedCategories(filters){
        try{
            const response=await getPagenatedCategory(filters);
            if(response.key==="SUCCESS"){
                setCategoriesResult(response.result);
            }
            else{
                toast.error("There is Something Wrong in fetching paginated list.");
            }
        }
        catch(error){
            toast.error(error);
        }
    }
    const onConfirmDelete = async() => {
        try{
            const response=await deleteCategory(selectedId);
            if(response.key==="SUCCESS"){
                toast.success("Category Deleted Successfully.");
                setOpen(false);
                setFilters({ ...filters, pageIndex: 1 });
            }
            else{
                toast.error("There is Something wrong while deleting category.");
                setOpen(false);
            }
        }
        catch(error){
            toast.error(error);
            setOpen(false);
        } 
      };
    
    return(
        <div className={classes.wrapper}>
            <div className={classes.headingWrapper}>
                <h1 className={classes.heading}>Category</h1>
            </div>
            <div className={classes.search}>
                <div className={classes.categorySearch}>
                    <TextField className={classes.box} variant="outlined" name='categorySerach' placeholder='search...' onChange={(e)=>{
                        setFilters({...filters,keyword:e.target.value,pageIndex:1});
                    }}  />
                </div>
                <div className={classes.searchButton}>
                    <Button  className={classes.btn} type='button' color='primary' variant="contained"  size="medium" onClick={()=>navigate(RoutePaths.AddCategory)}>Add Categiry</Button>
                </div>
            </div>
            <div className={classes.table}>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow className={classes.headingRow}>
                            <TableCell  className={classes.headingRowData}
                                key="name"
                                style={{ minWidth: 100}}
                            >
                                Category Name
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {categoriesResult?.items?.map((category, index) => (
                        <TableRow key={category.id}>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>
                                <Button
                                type="button"
                                className={classes.editCategory}
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    navigate(`/edit-category/${category.id}`);
                                }}
                                >
                                Edit
                                </Button>
                                <Button
                                type="button"
                                className={classes.deleteCategory}
                                variant="contained"
                                color="error"
                                style={{color:red,}}
                                onClick={() => {
                                    setOpen(true);
                                    setSelectedId(category.id ?? 0);
                                }}
                                >
                                Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {!categoriesResult.items.length && (
                        <TableRow className="TableRow">
                            <TableCell colSpan={3} className={classes.noData}>
                                {/* <Typography align="center" className="noDataText"> */}
                                No Categories
                                {/* </Typography> */}
                            </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={RecordsPerPage}
            component="div"
            count={categoriesResult.totalItems}
            rowsPerPage={filters.pageSize || 0}
            page={filters.pageIndex - 1}
            onPageChange={(e, newPage) => {
                setFilters({ ...filters, pageIndex: newPage + 1 });
            }}
            onRowsPerPageChange={(e) => {
                setFilters({
                ...filters,
                pageIndex: 1,
                pageSize: Number(e.target.value),
                });
            }}
            />
            </div>
            <ConfirmationDialog
            open={open}
            onClose={() => setOpen(false)}
            onConfirm={() => onConfirmDelete()}
            title="Delete category"
            description="Are you sure you want to delete this category?"
            />
        </div>
    );
}
export {Category};
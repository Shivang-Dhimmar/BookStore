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
import {getAllCategory} from './myService/categoryService';
import {toast} from "react-toastify";
import {getPagenatedBookList,deleteBook} from './myService/bookService';
import { red } from "@material-ui/core/colors";
import ConfirmationDialog from "./ConfirmationDialog";

function Books(){
    const navigate=useNavigate();
    const [filters,setFilters]=useState(defaultBookPageFilter);
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(0);
    const tableColumns = [
        { id: "name", label: "Book Name", minWidth: 100 },
        { id: "price", label: "Price", minWidth: 100 },
        { id: "category", label: "Category", minWidth: 100 },
    ];

    const [bookResult, setBookResult] = useState({
        pageIndex: 0,
        pageSize: 10,
        totalPages: 1,
        items: [],
        totalItems: 0,
    });

    

    const setcategory=async()=>{
        try{
            const response=await getAllCategory();
            if(response.key==="SUCCESS"){
                setCategories(response.result);
            }
            else{
                toast.error("There is Something Wrong in category fetching.",{theme:"colored"});
            }
        }
        catch(error){
            toast.error(error,{theme:"colored"});
        }
    };
    useEffect(() => {
        setcategory();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
          if (filters.keyword === "") delete filters.keyword;
          searchPaginatedBooks({ ...filters });
        }, 1000);
        return () => clearTimeout(timer);
    }, [filters]);

    async function searchPaginatedBooks(filters){
        try{
            const response=await getPagenatedBookList(filters);
            if(response.key==="SUCCESS"){
                setBookResult(response.result);
            }
            else{
                toast.error("There is Something Wrong in fetching paginated list.",{theme:"colored"});
            }
        }
        catch(error){
            toast.error(error,{theme:"colored"});
        }
    }
    const onConfirmDelete = async() => {
        try{
            const response=await deleteBook(selectedId);
            if(response.key==="SUCCESS"){
                toast.success("Book Deleted Successfully.",{theme:"colored"});
                setOpen(false);
                setFilters({ ...filters, pageIndex: 1 });
            }
            else{
                toast.error("There is Something wrong while deleting book.",{theme:"colored"});
                setOpen(false);
            }
        }
        catch(error){
            toast.error(error,{theme:"colored"});
            setOpen(false);
        } 
      };
      const redColor = "#ff0000";
    return(
        <div className={classes.wrapper}>
            <div className={classes.headingWrapper}>
                <h1 className={classes.heading}>Book Page</h1>
            </div>
            <div className={classes.search}>
                <div className={classes.bookSearch}>
                    <TextField className={classes.box} variant="outlined" name='bookSerach' placeholder='search...' onChange={(e)=>{
                        setFilters({...filters,keyword:e.target.value,pageIndex:1});
                    }}  />
                </div>
                <div className={classes.searchButton}>
                    <Button  className={classes.btn} type='button' color='primary' variant="contained"  size="medium" onClick={()=>navigate(RoutePaths.AddBook)}>Add Book</Button>
                </div>
            </div>
            <div className={classes.table}>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow className={classes.headingRow}>
                            {tableColumns.map((column) => (
                            <TableCell  className={classes.headingRowData}
                                key={column.id}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                            ))}
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {bookResult?.items?.map((book, index) => (
                        <TableRow key={book.id}>
                            <TableCell>{book.name}</TableCell>
                            <TableCell>{book.price}</TableCell>
                            <TableCell>
                                {categories.find((c) => c.id === book.categoryId)?.name}
                            </TableCell>
                            <TableCell>
                                <Button
                                type="button"
                                className={classes.editBook}
                                variant="contained"
                                style={{ marginRight:'4vw'}}
                                color="secondary"
                                onClick={() => {
                                    navigate(`/edit-book/${book.id}`);
                                }}
                                >
                                Edit
                                </Button>
                                <Button
                                type="button"
                                className={classes.deleteBook}
                                variant="contained"
                                color="error"
                                style={{ backgroundColor: redColor,color:'white'}}
                                onClick={() => {
                                    setOpen(true);
                                    setSelectedId(book.id ?? 0);
                                }}
                                >
                                Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {!bookResult.items.length && (
                        <TableRow className="TableRow">
                            <TableCell colSpan={5} className={classes.noData}>
                                {/* <Typography align="center" className="noDataText"> */}
                                No Books
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
            count={bookResult.totalItems}
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
            title="Delete book"
            description="Are you sure you want to delete this book?"
            />
        </div>
    );
}
export {Books};
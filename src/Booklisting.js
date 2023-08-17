import classes from './Booklisting.module.css';
import {useEffect,useState} from 'react';
import {getPagenatedBookList} from './myService/bookService';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {defaultBookPageFilter} from './constants/Constant';
import { TextField,FormControl,InputLabel,MenuItem,Select,Button } from '@material-ui/core';
import { Pagination } from "@material-ui/lab";

function Booklisting(){
    const navigate=useNavigate();
    const [filters,setFilters]=useState(defaultBookPageFilter);
    // const [categories, setCategories] = useState([]);
    const [sortBy, setSortBy] = useState();
    const [bookResult, setBookResult] = useState({
        pageIndex: 0,
        pageSize: 10,
        totalPages: 1,
        items: [],
        totalItems: 0,
    });
    // const setcategory=async()=>{
    //     try{
    //         const response=await getAllCategory();
    //         if(response.key==="SUCCESS"){
    //             setCategories(response.result);
    //         }
    //         else{
    //             toast.error("There is Something Wrong in category fetching.");
    //         }
    //     }
    //     catch(error){
    //         toast.error(error);
    //     }
    // };
    // useEffect(() => {
    //     setcategory();
    // }, []);

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
                toast.error("There is Something Wrong in fetching paginated list.");
            }
        }
        catch(error){
            toast.error(error);
        }
    }
    const sortBooks = (e) => {
        setSortBy(e.target.value);
        const bookList = [...bookResult.items];
    
        bookList.sort((a, b) => {
          if (a.name < b.name) {
            return e.target.value === "a-z" ? -1 : 1;
          }
          if (a.name > b.name) {
            return e.target.value === "a-z" ? 1 : -1;
          }
          return 0;
        });
        setBookResult({ ...bookResult, items: bookList });
      };

    return(
        <div className={classes.wrapper}>
            <div>
                <h1 className={classes.heading}>Book Listing</h1>
            </div>
            <div className={classes.searchLine}>
                <div className={classes.totalbooks}>
                    Total - {bookResult.totalItems} items
                </div>
                <div className={classes.serchBox}>
                    <TextField
                        id="text"
                        className={classes.search}
                        name="text"
                        placeholder="Search..."
                        variant="outlined"
                        onChange={(e) => {
                            setFilters({
                            ...filters,
                            keyword: e.target.value,
                            pageIndex: 1,
                            });
                        }}
                     />
                </div>
                <div className={classes.sortingField}>
                    <FormControl className="dropdown-wrapper" variant="outlined">
                        <InputLabel htmlFor="select">Sort By</InputLabel>
                        <Select
                        className={classes.sorting}
                        // MenuProps={{
                        //     classes: { paper: materialClasses.customSelect },
                        // }}
                        onChange={sortBooks}
                        value={sortBy}
                        >
                            <MenuItem value="a-z">a - z</MenuItem>
                            <MenuItem value="z-a">z - a</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className={classes.booklist}>
            {bookResult?.items.map((book, index) => (
              <div className={classes.Wrapper} key={index}>
                <div className={classes.ImageContainer}>
                  <em>
                    <img
                      src={book.base64image}
                      className={classes.Image}
                      alt="book"
                    />
                  </em>
                  <div className={classes.contentWrapper}>
                    <p className={classes.bookname}>{book.name}</p>
                    <span className="category">{book.category}</span>
                    <p className={classes.description}>{book.description}</p>
                    <p className="price">
                      <b>
                      <span className="discount-price">
                        MRP &#8377; {book.price}
                      </span>
                      </b>
                    </p>
                    <div className={classes.btn}>
                    <Button
                        type="button"
                        className={classes.addtoCart}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                        }}
                    >
                    ADD TO CART
                    </Button>
                    </div> 
                  </div>
                </div>
              </div>
            ))}
            </div>
            <div className={classes.pagination}>
            <Pagination
                count={bookResult.totalPages}
                page={filters.pageIndex}
                onChange={(e, newPage) => {
                setFilters({ ...filters, pageIndex: newPage });
                }}
            />
            </div>
        </div>
    )
}
export {Booklisting};
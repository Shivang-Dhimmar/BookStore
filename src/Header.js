import classes from './Register.module.css';
import logo from './assets/images/site-logo.svg';
import {NavLink} from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import shared from './utils/shared';
import { useMemo,useState } from 'react';
import cartlogo from "./assets/images/cart.png";
import {global_search} from "./myService/bookService";
import {Button,TextField} from '@material-ui/core';
import {toast} from "react-toastify";
import SearchIcon from "@material-ui/icons/Search";

function Header(){
    const [search,setSearch]=useState("");
    const [booklist,setBooklist]=useState([]);
    const [searchResult,setSearchResult]=useState(false);
    const items=useMemo(()=>{
        return shared.NavigationItems;
    },[]);
    function change(e){
        setSearch(e.target.value);
    }
    const globalSearch=async()=>{
        try{
            const response=await global_search(search);
            if(response.key==="SUCCESS"){
                setBooklist(response.result);
                setSearchResult(true);
            }
            else{
                setBooklist([]);
                setSearchResult(true);
            }
        }
        catch(error){
            toast.error("There is something wrong in searching.");
        }
    }
    return(
        <div>
        <div className={classes.headerWrapper}>
            <div className='header-logo-container'>
                <NavLink to="/" title='linked logo'>
                    <img src={logo} alt='logo' className={classes.headerLogo}/>
                </NavLink>
            </div>
            <div className={classes.navWrapper}>
                <List className={classes.navlist}>
                    <ListItem>
                        <NavLink to="./login">Login</NavLink>
                    </ListItem>
                    <ListItem>
                        <NavLink to="./register">Register</NavLink>
                    </ListItem>
                    {
                        items.map((item,index)=>(
                        <ListItem key={index}>
                            <NavLink to={item.route} title={item.name}>{item.name}</NavLink>
                        </ListItem>
                        ))
                    }
                    <ListItem button >
                        <NavLink to="/cart" title='cart-link' className={classes.cart}>
                            <img src={cartlogo} alt='cart-logo' className={classes.cartLogo}/>
                            <p className='cart-text'>Cart</p>
                        </NavLink>
                    </ListItem>
                    
                </List>
            </div>
        </div>
        <div className={classes.globalSearchWrapper}>
            <TextField className={classes.search} variant="outlined" name='serach' placeholder='search' onChange={(e)=>change(e)} />
            <Button className={classes.searchButton} startIcon={<SearchIcon/>} color='primary' variant="contained"  size="medium" onClick={globalSearch}>Search</Button>
        </div>
        <div className={classes.searchResultWrapper}>
            {searchResult && (
                <div className={classes.productListing}>
                    {booklist?.length===0 &&(
                        <p className={classes.noProduct}>No Product Found </p>
                    )} 
                    <List className="fetched-product-list">
                        {booklist?.length>0 && booklist.map((item1,index1)=>{
                            return(
                                <ListItem key={index1}>
                                    <div className={classes.resultSet}>
                                        <div className={classes.leftCol}>
                                            <div>{item1.name}</div>
                                            <div>{item1.description}</div>
                                            <div>{item1.category}</div>
                                        </div>
                                        <div className={classes.rightCol}>
                                            <div>{item1.price}</div>
                                            <div>
                                                <NavLink to="">
                                                    Add to Cart
                                                </NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </ListItem>
                            )
                        })
                        }
                    </List>
                </div>
            )
            }
        </div>
        </div>
    );
}
export {Header};
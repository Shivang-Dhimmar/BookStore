import classes from './Register.module.css';
import logo from './assets/images/site-logo.svg';
import {NavLink} from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import shared from './utils/shared';
import { useMemo,useState,useEffect } from 'react';
import cartlogo from "./assets/images/cart.png";
import {global_search} from "./myService/bookService";
import {Button,TextField} from '@material-ui/core';
import {toast} from "react-toastify";
import SearchIcon from "@material-ui/icons/Search";
import {RoutePaths} from './utils/enum';
import {useAuthContext} from './context';
import {useCartContext} from './Context/CartContext';

function Header(){
    const authContext = useAuthContext();
    const cartContext = useCartContext();
    
    const [search,setSearch]=useState("");
    const [booklist,setBooklist]=useState([]);
    const [searchResult,setSearchResult]=useState(false);
    const [cartList, setCartList] = useState([]);
    const [openSearchResult, setOpenSearchResult] = useState(false);

    const userContext=useAuthContext();
    const items=useMemo(()=>{
        return {
            NavigationItems:shared.NavigationItems,
            hasAccess:shared.hasAccess,
        };
    },[]);
    useEffect(() => {
        // cartContext.updateCart();
        setCartList(cartContext.cartData);
    }, [cartContext.cartData]);
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
            const above=document.getElementById("aboveScreen");
            above.classList.add(classes.aboveScreenVisible);
        }
        catch(error){
            toast.error("There is something wrong in searching.");
        }
    }

    const addToCart = (book) => {
        // alert(authContext.userValues);
        shared.addToCart(book, authContext.userValues.id).then((res) => {
          if (res.error) {
            toast.error(res.message);
          } else {
            toast.success(res.message);
            cartContext.updateCart();
          }
        }).catch((error)=>{toast.error(error);});
      };
    
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
                    {!userContext.hasLogedIn &&(   
                        <ListItem>
                            <NavLink to={RoutePaths.Login}>
                                <Button  color='primary' variant="text"  size="medium" title="login">Login</Button>
                            </NavLink>
                        </ListItem>
                    )
                    }
                    {!userContext.hasLogedIn &&(

                        <ListItem>
                            <NavLink to={RoutePaths.Register}>
                                <Button  color='primary' variant="text"  size="medium" title="register">Register</Button>
                            </NavLink>
                        </ListItem>
                    )
                    }
                    {
                        items.NavigationItems.map((item,index)=>(
                                items.hasAccess(item.route,userContext.userValues)&&(
                                    <ListItem key={index}>
                                        <NavLink to={item.route} title={item.name}>
                                            <Button  color='primary' variant="text"  size="medium" title={item.name}>{item.name}</Button>
                                        </NavLink>
                                    </ListItem>
                                )
                        ))
                    }

                    {userContext.hasLogedIn && (
                        <ListItem>
                            <Button  color='primary' variant="text"  size="medium" onClick={userContext.signOut}>LogOut</Button>
                        </ListItem>
                    )
                    }
                    <ListItem button >
                        <NavLink to="/cart" title='cart-link' className={classes.cart}>
                            <img src={cartlogo} alt='cart-logo' className={classes.cartLogo}/>
                            <p>{cartContext.cartData.length}</p>
                            <p className='cart-text'>Cart</p>
                        </NavLink>
                    </ListItem>
                    
                </List>
            </div>
        </div>
        <div className={classes.aboveScreen} id="aboveScreen" onClick={() => {
            setSearchResult(false);
            const above=document.getElementById("aboveScreen");
            above.classList.remove(classes.aboveScreenVisible);

          }}>
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
                                            <div className={classes.name}>{item1.name}</div>
                                            <div>{item1.description}</div>
                                            <div>{item1.category}</div>
                                        </div>
                                        <div className={classes.rightCol}>
                                            <div> MRP &#8377;{item1.price}</div>
                                            <div>
                                                <Button
                                                    type="button"
                                                    className={classes.addtoCart}
                                                    color="primary"
                                                    onClick={() => addToCart(item1)}
                                                >
                                                ADD TO CART
                                                </Button>
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
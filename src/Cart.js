import classes from './Cart.module.css';
import {useAuthContext} from './context';
import {useCartContext} from './Context/CartContext';
import {useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";
import {  Button, Link } from "@material-ui/core";
import {toast} from "react-toastify";
import {updateItem,deleteItem,getCart} from './myService/cartService';
import { placeOrder } from './myService/orderService';

const Cart=()=>{
    const authContext = useAuthContext();
    const cartContext = useCartContext();
    const navigate = useNavigate();
  
    const [cartList, setCartList] = useState([]);
    const [itemsInCart, setItemsInCart] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const getTotalPrice = (itemList) => {
        let totalPrice = 0;
        let itemPrice=0;
        itemList.forEach((item) => {
            itemPrice = item.quantity * parseInt(item.book.price);
            totalPrice = totalPrice + itemPrice;
        });
        setTotalPrice(totalPrice);
    };

    useEffect(() => {
        // cartContext.updateCart();
        setCartList(cartContext.cartData);
        setItemsInCart(cartContext.cartData.length);
        getTotalPrice(cartContext.cartData);
        console.log(cartContext.cartData);
    }, [cartContext.cartData]);
    

    const updateQuantity = async (cartItem, inc) => {
        const currentCount = cartItem.quantity;
        const quantity = inc ? currentCount + 1 : currentCount - 1;
        if (quantity === 0) {
          toast.error("Item quantity should not be zero. You can remove item Instead.");
          return;
        }
    
        try {
          const res = await updateItem({
            id: cartItem.id,
            userId: cartItem.userId,
            bookId: cartItem.book.id,
            quantity,
          });
          if (res.key==="SUCCESS") {
            toast.success("Item Updated Successfully.");
            const updatedCartList = cartList.map((item) =>
              item.id === cartItem.id ? { ...item, quantity } : item
            );
            cartContext.updateCart(updatedCartList);
            const updatedPrice =
              totalPrice +
              (inc
                ? parseInt(cartItem.book.price)
                : -parseInt(cartItem.book.price));
            setTotalPrice(updatedPrice);
          }
          else{
            toast.error("There is something wrong");
          }
        } catch (error) {
          toast.error(error);
        }
      };

      const removeItem = async (id) => {
        try {
          const res = await deleteItem(id);
          if (res.key==="SUCCESS") {
            cartContext.updateCart();
          }
          else{
            toast.error("There is Something wrong");
          }
        } catch (error) {
          toast.error(error);
        }
      };

      const placeOrderCall = async () => {
          try{
                if (authContext.userValues.id) {
                    const response = await getCart(authContext.userValues.id);
                    if(response.key==="SUCCESS"){
                        const userCart=response.result;
                        if (userCart.length) {
                            
                            let cartIds = userCart.map((element) => element.id);
                            const newOrder = {
                                userId: authContext.userValues.id,
                                cartIds,
                            };
                            const res = await placeOrder(newOrder);
                            if (res.key==="SUCCESS") {
                                toast.success("Order Placed Successfully");
                                cartContext.updateCart();
                                navigate("/");
                                
                            }
                            else{
                                toast.error("There is Something Wrong");
                            }
                        }
                        else {
                            toast.error("Your cart is empty");
                        }
                    }
                    else{
                        toast.error("There is something wrong");
                    }
                } 
            }
            catch (error) {
              toast.error(`Order cannot be placed ${error}`);
            }  
      };

    return(
        <div>
            <h1 className={classes.heading}> Cart Page</h1>
            <div className={classes.mainContent}>
                <div className={classes.firstline}>
                    <div className={classes.totalitems}>
                        My Shopping Bag ({itemsInCart} Items)
                    </div>
                    <div className={classes.totalPrice}>
                        Total price: {totalPrice}
                    </div>
                </div>
                {cartList.map((cartItem) => {
                        return (
                        <div className={classes.cartItem} key={cartItem.id}>
                            <div className="cart-item-img">
                                <Link>
                                    <img src={cartItem.book.base64image} alt="book" className={classes.image}/>
                                </Link>
                            </div>
                            <div className={classes.middleColum}>
                                    <div className={classes.name}>
                                        <p className={classes.bookname}>{cartItem.book.name}</p>
                                    </div>
                                    <div>
                                        <Link>Cart item name</Link>
                                    </div>
                                    <div>
                                        <Button
                                            className={classes.plus}
                                            color="primary"
                                            variant="contained"
                                            onClick={() => updateQuantity(cartItem, true)}
                                        >
                                            +
                                        </Button>
                                        <span className="number-count">{cartItem.quantity}</span>
                                        <Button
                                            className={classes.minus}
                                            color="primary"
                                            variant="contained"
                                            onClick={() => updateQuantity(cartItem, false)}
                                        >
                                            -
                                        </Button>
                                    </div>
                            </div>
                            <div className={classes.rightColum}>
                                <div>
                                    <span className="current-price">
                                        MRP &#8377; {cartItem.book.price}
                                    </span>
                                </div>
                                <div>
                                    <Link onClick={() => removeItem(cartItem.id)}>Remove</Link>
                                </div>

                            </div>
                            
                            </div>
                        );
                    })}
            </div>
            <div className={classes.buttonWrapper}>
                <Button className={classes.button} color="primary" variant="contained" onClick={()=>placeOrderCall()}>
                    Place order
                </Button>
            </div>
        </div>
    );
}
export {Cart};
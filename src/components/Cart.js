import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { removeItemFromCart, reduceQuantity, addProductToCart } from '../app/cartSlice';
import { useNavigate, Link } from 'react-router-dom';


function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(null)
    const items = useSelector((state) => state.cart.cartItems);
    const count = useSelector((state) => state.cart.count);
    const user = useSelector((state) => state.user.user);
    let total = 0;

    useEffect(() => {
        if (items.length) {
            setCartItems(items);
        }

    }, [items, count]);

    if (cartItems && count) {
        return (
            <div className='d-flex p-2 min-vh-100 flex-wrap border justify-content-center  border'>
                <div className='d-flex flex-column' style={{ width: '75%' }}>
                    <h4 className='p-2'>Your cart</h4>
                    <div>
                        {cartItems.map((item) => {
                            total += (item.price * item.count);

                            return (
                            <div key={item.id} className='d-flex m-1 flex-wrap align-items-center justify-content-around border rounded-2'>
                                <img src={item.thumbnail} alt={item.title} className='m-2 img-fluid rounded-2'
                                    style={{ width: '12rem', height: '12rem' }} />
                                <div className='m-2 d-flex flex-column flex-wrap' style={{ width: '7rem' }}>
                                    <h4 role='button' onClick={() => navigate(`/products/${item.id}`)}>{item.title}</h4>
                                    <small className='text-secondary'>{item.brand}</small>
                                </div>
                                <div className='m-2' >

                                    <p className='badge badge-danger'>{Math.round(item.discountPercentage)}% off</p>
                                    <h2>$ {item.price}</h2>
                                    <p className='text-secondary'>M.R.P <s>${Math.round((item.price * 100) / (100 - item.discountPercentage))} </s></p>
                                    <p>{item.stock ? <span className='text-success'>In stock</span> :
                                        <span className='text-danger'>Out of stock</span>}</p>
                                </div>
                                <div className='d-flex flex-column align-items-center justify-content-center m-2'
                                >
                                    <p>Quantity</p>
                                    <div className='d-flex align-items-center'>
                                        <button className='badge badge-secondary text-center rounded-1'
                                            onClick={() => dispatch(reduceQuantity(item.id))} style={{ width: '3rem', height: '3rem' }}><h4>-</h4></button>
                                        <input type='number' id={item.id} className='text-center' style={{ width: '3rem', height: '2rem' }} value={item.count} readOnly />
                                        <button className='badge badge-secondary text-center rounded-1'
                                            onClick={() => {
                                                if (item.count < item.stock) {
                                                    dispatch(addProductToCart(item))
                                                }

                                            }}
                                            style={{ width: '3rem', height: '3rem' }}><h4>+</h4></button>
                                    </div>

                                </div>
                                <button className='btn btn-primary rounded-0 m-2'
                                    onClick={() => dispatch(removeItemFromCart(item.id))}>Remove item</button>
                            </div>)
                        })}
                    </div>
                    <div className='p-3'>
                        <hr />
                        <h3 className=' text-right'>Subtotal({count} items) : $ {total}</h3>
                    </div>
                </div>
                <div className='m-1'>
                    <div className='p-3 d-flex flex-wrap flex-column justify-content-between border' style={{ height: "10rem" }}>
                        <h4 className=' text-center mb-2'>Subtotal({count} items) : $ {total}</h4>
                        <button className='btn btn-success'>Proceed to Payment</button>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return <div className='vh-100 d-flex flex-wrap flex-column m-5 align-items-center'>
            <h1>Your cart is empty...</h1>
            <p>{user.length ?'':'Sign in and '}Go to <Link to={'/'}>Home page</Link> to add products</p>
            
        </div>
    }
}

export default Cart
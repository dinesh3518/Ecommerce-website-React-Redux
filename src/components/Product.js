import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addProductToCart } from '../app/cartSlice';
import LoginForm from './LoginForm';
import { addComments } from '../app/productSlice';
import { nanoid } from '@reduxjs/toolkit';
import ImageMagnifier from './ImageMagnifier';
import { Dna } from 'react-loader-spinner'
import Modal from 'react-bootstrap/Modal'

function Product() {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [image, setImage] = useState('');
    const [commentText, setCommentText] = useState('');
    const [product, setProduct] = useState(null);
    const [pop, setPop] = useState(false);
    const dispatch = useDispatch();


    const user = useSelector(state => state.user.user);
    const comments = useSelector(state => state.product.comments);

    useEffect(() => {
        //fetch product from the API using product id
        fetch(`https://dummyjson.com/products/${parseInt(id)}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setIsLoading(false);
            });
    }, [id]);

    const handleSubmit = () => {
        if (user.length) {
            dispatch(addProductToCart(product));
        }
        else {
            setPop(true);
        }
    }
    const handleComment = () => {
        if (user.length) {
            if (commentText) {
                const comment = [{
                    id: nanoid(),
                    body: commentText,
                    user: {
                        id: user[0].id,
                        username: user[0].username
                    }
                }]
                dispatch(addComments(comment));
                setCommentText('')
            }

        }
        else {
            setPop(true);
        }
    }

    return (
        <>
            <Modal
                show={isLoading}
                centered
                backdrop="static"
                keyboard={false}

                className="d-flex justify-content-center"
            >
                <Dna
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />
            </Modal>
            <div >
                {product && (
                    <div className='d-flex flex-wrap mt-4 justify-content-center'>
                        <div className='d-flex h-100vh'>
                            <div>
                                <ul className='list-group m-1'>
                                    {product.images.map((item) => (
                                        <li key={item} className='list-group-item p-1 rounded-2'>
                                            <button onClick={() => setImage(item)}>
                                                <img src={item} alt='...' className='img-fluid' style={{ width: '5rem', height: '5rem' }} />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='container-fluid'>
                                {/* <img src={image ? image : product.thumbnail} alt='...' className='m-1 img-fluid border rounded'
                                style={{ width: '30rem', height: '26rem', boxShadow: "3px 3px 2px 4px #60524a" }} /> */}
                                {image ? <ImageMagnifier props={image} /> : <ImageMagnifier props={product.thumbnail} />}
                            </div>
                        </div>

                        <div className='w-50 m-2 d-flex flex-column'>
                            <h3>{product.title}</h3>
                            <small className='text-secondary'>{product.brand}</small>
                            <Rating className='mt-2 mb-3 d-flex flex-wrap' style={{}} name='half-rating-read' defaultValue={product.rating} precision={0.1} readOnly />
                            <p className='text-success'>Extra ${Math.round((product.price * 100) / (100 - product.discountPercentage)) - product.price} off</p>
                            <h2>$ {product.price}</h2>
                            <p>
                                <s>${Math.round((product.price * 100) / (100 - product.discountPercentage))} </s>
                                <span className='badge badge-danger ml-2'>{Math.round(product.discountPercentage)}% off</span>
                            </p>
                            <p>{product.description}</p>
                            <p className='text-danger'>Hurry only {product.stock} left !!</p>
                            <div className='m-3'>
                                <button className='btn btn-warning' onClick={handleSubmit}>
                                    <h5 className='col'>
                                        <i className='fas fa-shopping-cart' style={{ fontSize: '1rem', color: '#8c8d8e' }}></i>
                                        {'  '}
                                        Add to cart
                                    </h5>
                                </button>
                            </div>
                        </div>


                        <div style={{ position: 'absolute' }}>{pop && <LoginForm setPop={setPop} />}</div>
                    </div>
                )}

                <div className=' rounded-1 m-5 d-flex flex-wrap flex-column'>
                    <hr /> <h4 className='p-4'>Comments</h4><hr />
                    <div className='d-flex flex-wrap flex-column'>
                        {comments && comments.map(comment => (
                            <div key={comment.id} className='m-2 p-2 d-flex flex-column'>
                                <h6><u>{comment.user.username}</u></h6>
                                <p className='m-1'>{comment.body}</p>
                            </div>))}
                        <div className='m-2 d-flex flex-wrap flex-column'>
                            <input
                                type="text"
                                className='form-control'
                                name="comment"
                                placeholder='Leave your comment here..'
                                value={commentText}
                                style={{ height: '5rem' }}
                                onChange={(e) => setCommentText(e.target.value)}
                                required />
                            <button className='btn btn-secondary m-1' style={{ maxWidth: '10rem' }}
                                onClick={handleComment}>Comment</button>
                        </div>
                    </div>

                </div>


            </div>
        </>

    );
}

export default Product;

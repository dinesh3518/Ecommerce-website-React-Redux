import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { categoryProducts } from '../app/productSlice'
import { useNavigate } from 'react-router-dom';
function LeftMenu() {

    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch product categories from the API
        fetch('https://dummyjson.com/products/categories')
            .then((response) => response.json())
            .then((data) => setCategories(data));
    }, []);

    // Fetch products from the category
    function handleCategory(category) {
        fetch(`https://dummyjson.com/products/category/${category}`)
            .then((response) => response.json())
            .then((data) => dispatch(categoryProducts(data.products)));
        navigate(`/search?category=${category}`)
    }
    return (
        <div className=''>
            <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                <i className="fa fa-bars" style={{ color: '#ffffff' }}><br /><small>Menu</small></i>
            </button>
            <div className="offcanvas offcanvas-start" style={{ width: '20rem' }} data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div className="offcanvas-header border">
                    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Shop by Category</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-flex flex-column">
                    <button className='text-capitalize btn'
                        onClick={() => {
                            dispatch(categoryProducts([]));
                            navigate('/')
                        }}>
                        All
                    </button>
                    {categories && categories.map((category) => (

                        <button key={category} className='text-capitalize btn'
                            onClick={() => handleCategory(category)}>
                            {category}
                        </button>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default LeftMenu
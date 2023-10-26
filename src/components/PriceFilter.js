import React from 'react'
import { useDispatch } from 'react-redux';
import { filterProducts } from '../app/productSlice';
import { useState } from 'react';

function PriceFilter() {
    const dispatch = useDispatch();
    const [activeState,setActiveState] = useState('');

    function handleSubmit(sortby){
        if(sortby==='lowToHigh'){
            dispatch(filterProducts(sortby));
            setActiveState('L');
        }
        else{
            dispatch(filterProducts(sortby));
            setActiveState('H');
        }
    }

    return (
        <div>
            <div className="dropdown m-3">
                <h6 className="btd btn-secondary dropdown-toggle rounded-2 p-2" role='button' data-bs-toggle="dropdown" aria-expanded="false">
                    Filter
                </h6>
                <ul className="dropdown-menu dropdown-menu-dark">
                    <li><p className={`dropdown-item ${activeState==='L' ?'active':''}`} role='button' onClick={() => handleSubmit('lowToHigh')}>Low to High</p></li>
                    <li><p className={`dropdown-item ${activeState==='H' ?'active':''}`} role='button' onClick={() => handleSubmit('highToLow')}>High to Low</p></li>
                </ul>
            </div>
        </div>
    );
}

export default PriceFilter
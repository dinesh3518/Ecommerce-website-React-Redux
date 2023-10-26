
import { useDispatch } from 'react-redux';
import '../assets/cart.css'
import LeftMenu from './LeftMenu';
import { useState } from 'react';
import { categoryProducts } from '../app/productSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import { emptyCart } from '../app/cartSlice';
import { logout } from '../app/userSlice';

export default function Header() {
    const [searchText, setSearchtext] = useState('');
    const [pop, setPop] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const count = useSelector((state) => state.cart.count);
    const user = useSelector(state => state.user.user)

    function searchHandle(e) {
        e.preventDefault();
        if(searchText.length){
            fetch(`https://dummyjson.com/products/search?q=${searchText}`)
            .then(res => res.json())
            .then(data => {
                dispatch(categoryProducts(data.products));
                navigate(`/search?q=${searchText}`);
            });
        }
       
        
    }

    const handleLogout = () => {

        dispatch(logout(user[0].token));
        dispatch(emptyCart(user[0].username));
        navigate('/');
    }

    return (
        <nav className="navbar navbar-light sticky-md-top bg-dark d-flex border rounded"
            style={{ boxShadow: "0px 3px 3px 3px #60524a" }}>

            <div className="navbar-header " style={{ width: '' }} role='button'
                onClick={() => {
                    dispatch(categoryProducts([]));
                    navigate('/');
                }}>
                <h3 className=' m-2' style={{color:'#9bcf0b', fontFamily: '"Audiowide", sans-serif',textShadow:'2px 2px white' }}>Do-MART</h3>

            </div>

            <LeftMenu />
            { /*search box */}
            <form className="d-flex ml-1 mr-1" style={{ width: '23rem' }}>
                <input
                    className="form-control rounded-0"
                    type="search"
                    name='search'
                    autoComplete="on"
                    value={searchText}
                    placeholder="Search products..."
                    onChange={(e) => setSearchtext(e.target.value)}
                />
                <button className="btn btn-primary rounded-0" onClick={searchHandle}>
                    <i className="fa fa-search" style={{ fontSize: "22px" }}></i>
                </button>
            </form>
            { /*user logo dropdown menu */}
            <div >
                <div className="dropdown">
                    <button className="btn m-2 dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        {user[0] ? <img src={user[0].image} className='img-fluid rounded-circle'
                            style={{ height: '2rem', width: '2rem' }} alt='...' /> :
                            <i className="far fa-user-circle" style={{ fontSize: '28px', color: 'white' }}></i>
                        }
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {user[0] ? <><li><p className="text-center" >Hello, {user[0].firstName}</p></li>
                            <li><p className="dropdown-item text-center" role='button' onClick={handleLogout}>Logout</p></li> </> :
                            <li><p className="dropdown-item" role='button' onClick={() => setPop(true)}>Login</p></li>
                        }
                    </ul>
                </div>
            </div>
            { /*cart logo and count */}
            <button className='btn d-flex justify-content-end' style={{ width: '' }} onClick={() => navigate('cart')}>
                <div className="cart">
                    <span className="count">{count}</span>
                    <i className='fas fa-shopping-cart' style={{ fontSize: '28px', color: '#e3e1e0' }}></i>
                </div>
            </button>
            <div style={{ position: 'absolute' }}>{pop && <LoginForm setPop={setPop} />}</div>
        </nav>
    );
}



import React from 'react';
import Header from './components/Header';
import Carousel from './components/Carousel';
import Advt from './components/Advt';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import Product from './components/Product';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Cart from './components/Cart';
import Error from './components/Error';
import ContactUs from './components/ContactUs';
// import SocialLogin from './components/SocialLogin';


function App() {
  return (
    <div className='container-fluid'>
      {/* <SocialLogin/> */}

      <Router>

        <Routes>
          <Route path='/' element={<><Header /><Outlet /><Footer /></>} >
            <Route index element={<><Carousel /><Advt /><ProductList /></>} />
            <Route exact path='products/:id' element={<Product />} />
            <Route exact path='cart' element={<Cart />} />
            <Route exact path='contactus' element={<ContactUs />} />
            <Route exact path='search' element={<ProductList />} />
          </Route>
          <Route exact path='*' element={<Error />} />
        </Routes>

      </Router>
    </div>
  )
}

export default App;
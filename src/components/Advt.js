import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Ad1 from '../assets/images/Ad1.JPG'
import Ad2 from '../assets/images/Ad2.JPG'
import { Dna } from 'react-loader-spinner'
import Modal from 'react-bootstrap/Modal'

function Advt() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://dummyjson.com/products/category/laptops?limit=5')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className='d-flex flex-column flex-wrap justify-content-md-center m-1'>
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
      <div className='d-flex flex-wrap justify-content-around'>
        {products && products.map(product => (
          <motion.div key={product.id} className='d-flex flex-wrap m-2 flex-column' role='button'
            onClick={() => navigate(`products/${product.id}`)}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <img src={product.thumbnail} className='rounded-circle' style={{ width: '8rem', height: '8rem' }} alt='...' />
            <p className='badge badge-danger'>Upto {Math.round(product.discountPercentage)} % off</p>
          </motion.div>
        ))}
      </div>
      <div className='d-flex justify-content-center flex-wrap'>
        <img src={Ad1} alt='...' className='rounded-2 m-2 img-fluid' role='button' />
        <img src={Ad2} alt='...' className='rounded-2 m-2 img-fluid' role='button' />
      </div>

    </div>
  )
}

export default Advt
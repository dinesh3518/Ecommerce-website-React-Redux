import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { motion } from 'framer-motion';

function ProductCard({ product }) {

  const [isHover, setIsHover] = useState(false)
  const navigate = useNavigate();
  return (


    <motion.div className="col-sm-4 p-2 m-3 rounded-2"
      style={{ boxShadow: "3px 3px 3px 6px #60524a", width: '18rem', height: "24rem", backgroundColor: '' }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
    >
      <div className='d-flex flex-column flex-wrap' role="button" tabIndex={0} onClick={() => navigate(`/products/${product.id}`)}
        style={{ cursor: 'pointer' }}>
        <img
          src={product.thumbnail}
          style={{ height: '13rem' }}
          className="card-img-top rounded-2 p-1"
          alt={product.title}
        />
        <div className="pl-0 col text-truncate" style={{ color: isHover ? '#13a5eb' : '' }}>
          <h5>{product.title}</h5>
          <small className='text-secondary'>{product.brand}</small>
        </div>

        <Rating className='mt-2 mb-3 text-success' name='half-rating-read' defaultValue={product.rating} precision={0.1} readOnly />
        <h4 className="text-center">$ {product.price}</h4>
        <p className='d-flex justify-content-between'><small className={product.stock ? 'text-success' : 'text-danger'}>{product.stock ? 'In stock' : 'Out of stock'}</small>
          <span className='badge badge-danger'>{Math.round(product.discountPercentage)}% off</span></p>
      </div>

    </motion.div>
  );
}
export default ProductCard;
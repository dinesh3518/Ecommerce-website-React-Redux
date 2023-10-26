
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import PriceFilter from "./PriceFilter";
// import {Grid } from 'react-loader-spinner'
// import Modal from 'react-bootstrap/Modal'

export default function ProductList() {
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('q') ? searchParams.get('q') : searchParams.get('category');

  const productStore = useSelector((state) => state.product);
  const products = productStore.searchResults.length ? productStore.searchResults : productStore.products;




  return (
    <div className='row d-flex justify-content-center flex-wrap'>
      {/* <Modal
        show={(!products.length)}
        centered
        backdrop="static"
        keyboard={false}

        className="d-flex justify-content-center"
      >
        <Grid
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </Modal> */}

      {searchText && (
        <div className="d-flex flex-wrap justify-content-between">
          <h3 className="m-3">{products.length} results for "{searchText}"</h3>
          <PriceFilter />
        </div>
      )}
      {products.map((product) => <ProductCard product={product} key={product.id} />
      )}
    </div>

  );

}
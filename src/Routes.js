import { Route, Routes } from 'react-router-dom';
import Checkout from './containers/Checkout';
import Products from './containers/products/Products';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Products />} />
      <Route path="/checkout" strict element={<Checkout />} />
      {/* <Route element={NotFound} /> */}
    </Routes>
  );
};

export default AllRoutes;

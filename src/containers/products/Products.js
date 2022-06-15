import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';
import '../../stylesheets/products.css';

const Products = () => {
  const products = useSelector(state => state.products);

  let displayProducts = null;
  if (Object.keys(products.error).length) {
    displayProducts = <div>There was an error loading products</div>;
  }

  if (products.data.length && !products.isLoading) {
    displayProducts = [];
    for (let product of products.data) {
      displayProducts.push(<ProductCard key={`${product.id}+${product.name}`} product={product} />);
    }
  }

  return (
    <Grid id="product-page" container justifyContent="center" direction="row" spacing={2}>
      {displayProducts}
    </Grid>
  );
};

export default Products;

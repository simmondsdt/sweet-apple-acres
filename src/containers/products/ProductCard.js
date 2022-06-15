import { useDispatch } from 'react-redux';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material';
import { addItemToCart } from '../../store/order';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const addToCard = () => dispatch(addItemToCart(product));

  return (
    <Grid item xs={12} sm={6} md={3} xl={2}>
      <Card>
        <CardMedia className="product-image" component="img" image={product?.image} alt={product.name} />
        <CardContent>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={10}>
              <Typography gutterBottom variant="h6" component="div">
                {product.name}
              </Typography>
            </Grid>
            <Grid container item xs={2} justifyContent="flex-end">
              ${product.price.toFixed(2)}
            </Grid>
          </Grid>

          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Rating name="product-rating" readOnly value={product.rating} precision={0.1} />
            </Grid>
            <Grid item>
              <Typography variant="body2" color="text.secondary">
                ({product.rating})
              </Typography>
            </Grid>
          </Grid>

          <Typography className="product-description" variant="body2" color="text.secondary">
            {product.description}
          </Typography>

          <CardActions>
            <Button fullWidth variant="contained" disabled={!product.isAvailable} onClick={addToCard}>
              {product.isAvailable ? 'Add to Cart' : 'Sold Out!'}
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductCard;

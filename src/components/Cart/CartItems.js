import { useSelector } from 'react-redux';
import { Grid, Typography } from '@mui/material';
import CartItem from './CartItem';

const CartItems = ({ view }) => {
  const { order, products } = useSelector(state => state);

  let displayCartItems = [];
  if (order.cart.length) {
    for (let [index, item] of order.cart.entries()) {
      if (item.quantity !== 0) {
        const product = products.data.find(p => p.id === item.productId);
        displayCartItems.push(<CartItem key={index} item={item} product={product} view={view} />);
      }
    }
  }

  const displayTotal = <Typography variant="h6">${order.totalPrice.toFixed(2)}</Typography>;

  if (view === 'total') {
    return displayTotal;
  } else {
    return (
      <Grid container direction="column" alignItems="center">
        {displayCartItems}
        <br />

        <Grid container direction="row">
          <Grid item xs={8}>
            <Typography variant="h6">Sub-Total:</Typography>
          </Grid>
          <Grid container item xs={4} justifyContent="flex-end">
            {displayTotal}
          </Grid>
        </Grid>
      </Grid>
    );
  }
};

export default CartItems;

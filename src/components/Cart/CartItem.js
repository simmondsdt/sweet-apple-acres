import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Typography,
} from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import Loading from '../../components/Loading';
import { addItemToCart, removeItemFromCart } from '../../store/order';

const CartItem = ({ item, product, view }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = type => {
    setOpen(false);
    type === 'yes' && dispatch(removeItemFromCart({ ...product, actionType: 'clearItem' }));
  };

  const btnSize = view === 'checkout' ? 1 : 4;

  return !item.cart && !product ? (
    <Loading />
  ) : (
    <>
      <Card sx={{ display: 'flex', width: '100%' }} variant="outlined">
        <CardMedia component="img" sx={{ width: 150 }} image={product.image} alt={product.name} />
        <CardContent sx={{ width: '100%' }}>
          <Grid container direction="column">
            <Grid container direction="row" alignItems="center">
              <Grid item xs={10}>
                <Typography component="div" variant="h6">
                  {product.name}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="caption">x {item.quantity}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>${product.price.toFixed(2)}</Typography>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="center">
              <Grid item xs={btnSize}>
                <Button variant="outlined" size="small" onClick={() => dispatch(removeItemFromCart(product))}>
                  <Remove />
                </Button>
              </Grid>
              <Grid item xs={btnSize}>
                <Button variant="outlined" size="small" onClick={() => dispatch(addItemToCart(product))}>
                  <Add />
                </Button>
              </Grid>
              <Grid item xs={btnSize}>
                <Button variant="outlined" size="small" onClick={handleOpen}>
                  <Delete color="error" />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete all the <b>{product.name}</b> from your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('no')}>No</Button>
          <Button onClick={() => handleClose('yes')} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CartItem;

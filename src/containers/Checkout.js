import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, TextField, Typography } from '@mui/material';
import CartItems from '../components/Cart/CartItems';
import { submitOrder, updateDeliveryInfo } from '../store/order';
import '../stylesheets/checkout.css';

const Checkout = () => {
  const deliveryInfo = useSelector(state => state.order.deliveryInfo);
  const dispatch = useDispatch();

  const disabled = !deliveryInfo.name.length || !deliveryInfo.address.length;

  return (
    <Grid id="checkout-container" container justifyContent="center" alignItems="center" direction="row">
      <Grid item xs={10}>
        <Accordion expanded={true}>
          <AccordionSummary>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={12} sm={9}>
                <Typography variant="h6">Items in your Cart</Typography>
              </Grid>
              <Grid item container justifyContent="flex-end" xs={12} sm={3}>
                <Link className="link" to="/">
                  <Button variant="contained">Add More Items to Cart</Button>
                </Link>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <CartItems view="checkout" />
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={true}>
          <AccordionSummary>
            <Typography variant="h6">Personal Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Name"
                  variant="standard"
                  required={true}
                  value={deliveryInfo.name}
                  onChange={e => dispatch(updateDeliveryInfo({ field: 'name', value: e.target.value }))}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Delivery Address"
                  variant="standard"
                  required={true}
                  value={deliveryInfo.address}
                  onChange={e => dispatch(updateDeliveryInfo({ field: 'address', value: e.target.value }))}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={true}>
          <AccordionSummary>
            <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
              <Grid container item xs={12} sm={3} direction="row" justifyContent="center" alignItems="center">
                <Typography variant="h6">Order Total:</Typography> <CartItems view="total" />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button variant="contained" onClick={() => dispatch(submitOrder())} disabled={disabled}>
                  Place Order
                </Button>
              </Grid>
            </Grid>
          </AccordionSummary>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default Checkout;

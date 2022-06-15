import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, Button, Menu } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import CartItems from './CartItems';

const Cart = () => {
  const { order } = useSelector(state => state);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Button id="cart" color="inherit" onClick={handleMenu}>
        <Badge badgeContent={order.totalItems} color="primary">
          <ShoppingCart />
        </Badge>
      </Button>
      <Menu
        id="cart-menu"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PopoverClasses={{ width: 750 }}
      >
        <CartItems />
        <Link className="link" to="checkout">
          <Button fullWidth variant="contained" onClick={handleClose}>
            Checkout
          </Button>
        </Link>
      </Menu>
    </>
  );
};

export default Cart;

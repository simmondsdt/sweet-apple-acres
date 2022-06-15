import { Link } from 'react-router-dom';
import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import Cart from '../components/Cart/Cart.js';
import '../stylesheets/navbar.css';

const Navbar = () => {
  return (
    <AppBar id="navbar" position="sticky">
      <Toolbar>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={8}>
            <Typography variant="h4">
              <Link className="link" to="/">
                Sweet Apple Acres
              </Link>
            </Typography>
          </Grid>

          <Grid container item xs={4} justifyContent="flex-end" alignItems="center">
            <Cart />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

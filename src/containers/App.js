import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import Routes from '../Routes';
import Navbar from './Navbar';
import { getProducts } from '../store/products';
import '../stylesheets/app.css';

const toastLimit = 3;

const App = () => {
  const { toasts } = useToasterStore();
  const dispatch = useDispatch();

  useEffect(() => {
    const getAppData = () => dispatch(getProducts());
    getAppData();
  }, []);

  useEffect(() => {
    toasts
      .filter(t => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= toastLimit) // Is toast index over limit?
      .forEach(t => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return (
    <div id="App">
      <Navbar />
      <Toaster position="top-center" />
      <Routes />
    </div>
  );
};

export default App;

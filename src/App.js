import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import './App.css';
import Cart from './components/Cart';
import Details from './components/Details';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Orders from './components/Orders';
import UserContext from './context/UserContext';
import { CartTypes, useCartReducer } from './reducers/cartReducer';

function App() {
  const [cart, dispatch] = useCartReducer();
  const [items, setItems] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const addToCart = useCallback(
    (itemId) => dispatch({ type: CartTypes.ADD, itemId }),
    [dispatch],
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/items');
        setItems(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    axios.get('/api/auth/current-user')
      .then((result) => setUserDetails(result.data))
      .catch(console.error);
  }, []);

  const userContextValue = useMemo(
    () => ({ userDetails, setUserDetails }),
    [userDetails, setUserDetails],
  );

  return (
    <Router>
      <UserContext.Provider value={userContextValue}>
        <Header cart={cart} />
        {items.length === 0
          ? <div>Loading...</div>
          : (
            <Routes>
              <Route
                path="/cart"
                element={<Cart cart={cart} dispatch={dispatch} items={items} />}
              />
              <Route
                path="/details/:id"
                element={<Details addToCart={addToCart} items={items} />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/orders" element={<Orders items={items} />} />
              <Route path="/" element={<Home items={items} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
      </UserContext.Provider>
    </Router>
  );
}

export default App;

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CartIcon from '../images/cart.svg';
import UserDetails from './UserDetails';
import './Header.css';

function Header({ cart }) {
  const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <header>
      <h1><Link to="/">Coffee Shop</Link></h1>
      <UserDetails />
      <Link
        className="cart"
        to="/cart"
      >
        <img src={CartIcon} alt="Cart" />
        <div className="badge">{cartQuantity}</div>
      </Link>
    </header>
  );
}

Header.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
};

export default Header;

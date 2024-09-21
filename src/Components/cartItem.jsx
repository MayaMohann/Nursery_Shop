import PropTypes from 'prop-types'; // Import PropTypes
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice'; // Import the actions and reducer
import './cartItem.css';

const CartItem = ({ cartItems, onContinueShopping }) => {
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const cost = parseFloat(item.cost.replace('$', '')); // Remove the $ sign and parse as number
      return total + cost * item.quantity;
    }, 0);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(); // Call the parent method passed down as a prop
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 })); // Using 'id' for a unique key
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 })); // Using 'id'
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ id: item.id })); // Use 'id' instead of 'name' for unique identification
  };

  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace('$', '')); // Remove the $ sign and parse as number
    return cost * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item).toFixed(2)}
              </div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount"></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

// Define propTypes for CartItem
CartItem.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Assuming id is a string
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      cost: PropTypes.string.isRequired, // Cost is a string with $ symbol
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired, // cartItems is required and should be an array
  onContinueShopping: PropTypes.func.isRequired, // Validate that onContinueShopping is required and is a function
};

export default CartItem;

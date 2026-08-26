import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
    const dispatch = useDispatch();

    // Get cart items from Redux
    const cart = useSelector((state) => state.cart.items);

    // Calculate the total amount of all items
    const calculateTotalAmount = () => {
        let total = 0;

        cart.forEach((item) => {
            const price = parseFloat(item.cost.substring(1));
            total += price * item.quantity;
        });

        return total;
    };

    // Calculate subtotal for one item
    const calculateTotalCost = (item) => {
        const price = parseFloat(item.cost.substring(1));
        return price * item.quantity;
    };

    // Continue shopping
    const handleContinueShopping = (e) => {
        onContinueShopping(e);
    };

    // Checkout
    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

    // Increase quantity
    const handleIncrement = (item) => {
        dispatch(
            updateQuantity({
                name: item.name,
                quantity: item.quantity + 1
            })
        );
    };

    // Decrease quantity
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(
                updateQuantity({
                    name: item.name,
                    quantity: item.quantity - 1
                })
            );
        } else {
            dispatch(removeItem(item.name));
        }
    };

    // Remove item completely
    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    // Calculate total number of products
    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <div className="cart-container">

            <h1>Shopping Cart</h1>

            {cart.length === 0 ? (
                <div className="empty-cart">
                    <h2>Your cart is empty</h2>

                    <button
                        className="continue-shopping"
                        onClick={handleContinueShopping}
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <>

                    <div className="cart-summary">
                        <h2>
                            Total Items: {totalItems}
                        </h2>

                        <h2>
                            Total: ${calculateTotalAmount().toFixed(2)}
                        </h2>
                    </div>

                    <div className="cart-items">

                        {cart.map((item) => (

                            <div
                                className="cart-item"
                                key={item.name}
                            >

                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="cart-item-image"
                                />

                                <div className="cart-item-details">

                                    <h2>
                                        {item.name}
                                    </h2>

                                    <p>
                                        Price: {item.cost}
                                    </p>

                                    <p>
                                        Subtotal: $
                                        {calculateTotalCost(item).toFixed(2)}
                                    </p>

                                    <div className="quantity-controls">

                                        <button
                                            onClick={() =>
                                                handleDecrement(item)
                                            }
                                        >
                                            -
                                        </button>

                                        <span>
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                handleIncrement(item)
                                            }
                                        >
                                            +
                                        </button>

                                    </div>

                                    <button
                                        className="remove-button"
                                        onClick={() =>
                                            handleRemove(item)
                                        }
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                    <div className="cart-total">

                        <h2>
                            Total: $
                            {calculateTotalAmount().toFixed(2)}
                        </h2>

                        <div className="cart-buttons">

                            <button
                                className="continue-shopping"
                                onClick={handleContinueShopping}
                            >
                                Continue Shopping
                            </button>

                            <button
                                className="checkout-button"
                                onClick={handleCheckoutShopping}
                            >
                                Checkout
                            </button>

                        </div>

                    </div>

                </>
            )}

        </div>
    );
}

export default CartItem;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Orders.css';
import PropTypes from 'prop-types';

function Orders({ items }) {
    const [orders, setOrders] = useState([]);
    const loadOrders = () => {
        axios
            .get('/api/orders')
            .then((result) => setOrders(result.data))
            .catch(console.error);
    };
    useEffect(loadOrders, []);

    const deleteOrder = (order) => {
        axios
            .delete(`api/orders/${order.id}`)
            .then(loadOrders)
            .catch(console.error);
    };

    return (
        <div className="orders-component">
            <h2>Existing Orders</h2>
            {orders.length === 0 ? (
                <div>No Orders</div>
            ) : (
                orders.map((order) => (
                    <div className="order" key={order.id}>
                        <p>{order.name}</p>
                        {order.phone ? <p>{order.phone}</p> : null}
                        <p>{order.zipCode}</p>
                        <p>Items:</p>
                        <ul>
                            {order.items.map((item) => (
                                <li key={item.id}>
                                    {item.quantity} -{' '}
                                    {items.find((i) => i.id === item.id).title}
                                </li>
                            ))}
                        </ul>
                        <button
                            type="button"
                            onClick={() => deleteOrder(order)}
                        >
                            Delete Order
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

Orders.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        }),
    ).isRequired,
};

export default Orders;

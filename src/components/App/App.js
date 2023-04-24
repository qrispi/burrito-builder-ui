import React from 'react';
import './App.css';
import {getOrders, postOrder, deleteOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';
import { useState, useEffect } from 'react';

function App () {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const promise = getOrders();
    promise.then(data => setOrders(data.orders));
  }, []);

  const addOrder = (newOrder) => {
    const promise = postOrder(newOrder);
    promise.then(response => setOrders([...orders, response]));
  }

  const completeOrder = (id) => {
    deleteOrder(id);
    const promise = getOrders();
    promise.then(data => setOrders(data.orders));
  }

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm addOrder={addOrder}/>
      </header>
      <Orders orders={orders} completeOrder={completeOrder}/>
    </main>
  );
}

export default App;

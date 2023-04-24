import React from 'react';
import './App.css';
import {getOrders, postOrder} from '../../apiCalls';
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
    promise.then(data => console.log(data));
  }

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm addOrder={addOrder}/>
      </header>

      <Orders orders={orders}/>
    </main>
  );
}


export default App;

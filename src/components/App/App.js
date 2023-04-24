import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';
import { useState, useEffect } from 'react';

function App () {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const promise = getOrders();
    promise.then(data => setOrders(data.orders));
  }, []);

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm />
      </header>

      {/* <Orders orders={this.state.orders}/> */}
    </main>
  );
}


export default App;

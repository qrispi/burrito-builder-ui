import React, { Component } from 'react';
import { useState } from 'react';

function OrderForm () {

  const [orderForm, setOrderForm] = useState({
    name: '',
    ingredients: []
  })


  const handleSubmit = e => {
    e.preventDefault();
    clearInputs();
  }

  const clearInputs = () => {
    setOrderForm({name: '', ingredients: []});
  }
  const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
  const ingredientButtons = possibleIngredients.map(ingredient => {
    return (
      // onClick={e => handleIngredientChange(e)}
      <button key={ingredient} name={ingredient} >
        {ingredient}
      </button>
    )
  });

  return (
    <form>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={orderForm.name}
        // onChange={e => handleNameChange(e)}
      />

      { ingredientButtons }

      <p>Order: { orderForm.ingredients.join(', ') || 'Nothing selected' }</p>

      <button onClick={e => handleSubmit(e)}>
        Submit Order
      </button>
    </form>
  )
}

export default OrderForm;

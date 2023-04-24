import React from 'react';
import { useState } from 'react';

function OrderForm ({addOrder}) {

  const [formInputs, setFormInputs] = useState({
    name: '',
    ingredients: []
  });


  const handleSubmit = e => {
    if(formInputs.name) {
      e.preventDefault();
    }
    if(formInputs.name && formInputs.ingredients.length > 0) {
      console.log("ORDER SUBMITTED")
      addOrder(formInputs);
      clearInputs();
    }
  }

  const clearInputs = () => {
    setFormInputs({name: '', ingredients: []});
  }

  const handleNameChange = e => {
    setFormInputs({...formInputs, name: e.target.value});
  }

  const handleIngredientChange = e => {
    e.preventDefault();
    setFormInputs({...formInputs, ingredients: [...formInputs.ingredients, e.target.name]});
  }

  const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
  const ingredientButtons = possibleIngredients.map(ingredient => {
    return (
      <button key={ingredient} name={ingredient} onClick={e => handleIngredientChange(e)}>
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
        value={formInputs.name}
        onChange={e => handleNameChange(e)}
        required
      />

      { ingredientButtons }

      <p>Order: { formInputs.ingredients.join(', ') || 'Nothing selected' }</p>

      <button onClick={e => handleSubmit(e)}>
        Submit Order
      </button>

      <button onClick={(e) => {
        e.preventDefault();
        console.log(formInputs)}}>
        Check State
      </button>
    </form>
  )
}

export default OrderForm;

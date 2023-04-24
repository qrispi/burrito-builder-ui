import React from 'react';
import { useState } from 'react';

function OrderForm () {

  const [formInputs, setFormInputs] = useState({
    name: '',
    ingredients: []
  })


  const handleSubmit = e => {
    e.preventDefault();
    clearInputs();
  }

  const clearInputs = () => {
    setFormInputs({name: '', ingredients: []});
  }

  const updateInputs = e => {
    setFormInputs({...formInputs, [e.target.name]: e.target.value})
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
        value={formInputs.name}
        // onChange={e => handleNameChange(e)}
      />

      { ingredientButtons }

      <p>Order: { formInputs.ingredients.join(', ') || 'Nothing selected' }</p>

      <button onClick={e => handleSubmit(e)}>
        Submit Order
      </button>
    </form>
  )
}

export default OrderForm;

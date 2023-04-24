import React from 'react';
import { useState } from 'react';

function OrderForm () {

  const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
  const [formInputs, setFormInputs] = useState({
    name: '',
    ingredients: []
  });

  const [disabled, setDisabled] = useState(
    possibleIngredients.reduce((acc, ingred) => {
      acc[ingred] = false
      return acc
    }, {})
  )


  const handleSubmit = e => {
    e.preventDefault();
    clearInputs();
  }

  const clearInputs = () => {
    setFormInputs({name: '', ingredients: []});
  }

  const handleNameChange = e => {
    e.preventDefault();
    setFormInputs({...formInputs, name: e.target.value});
  }

  const handleIngredientChange = e => {
    e.preventDefault();
    setFormInputs({...formInputs, ingredients: [...formInputs.ingredients, e.target.name]});
    setDisabled({...disabled, [e.target.name]: true})
  }

  const ingredientButtons = possibleIngredients.map(ingredient => {
    return (
      <button key={ingredient} name={ingredient} onClick={e => handleIngredientChange(e)} disabled={disabled[ingredient]}>
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
      />

      { ingredientButtons }

      <p>Order: { formInputs.ingredients.join(', ') || 'Nothing selected' }</p>

      <button onClick={e => handleSubmit(e)}>
        Submit Order
      </button>

      <button onClick={(e) => {
        e.preventDefault();
        console.log(formInputs)
        console.log(disabled)
        }}>
        Check State
      </button>
    </form>
  )
}

export default OrderForm;

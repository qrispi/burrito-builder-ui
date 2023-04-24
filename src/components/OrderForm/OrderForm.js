import React from 'react';
import { useState } from 'react';

function OrderForm ({addOrder}) {
  
  const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
  
  const [disabled, setDisabled] = useState(
    possibleIngredients.reduce((acc, ingred) => {
      acc[ingred] = false;
      return acc;
    }, {})
  );

  const [formInputs, setFormInputs] = useState({
    name: '',
    ingredients: []
  });

  const [noneSelectedMsg, setNoneSelectedMsg] = useState('');

  const handleSubmit = e => {
    if(formInputs.name) {
      e.preventDefault();
    }
    if(formInputs.ingredients.length === 0) {
      setNoneSelectedMsg('Please select at least one ingredient before submitting');
      setTimeout(() => clearMsg(), 3000);
    }
    if(formInputs.name && formInputs.ingredients.length > 0) {
      addOrder(formInputs);
      clearInputs();
    }
  }

  const clearInputs = () => {
    setFormInputs({name: '', ingredients: []});
    setNoneSelectedMsg('');
    setDisabled( 
      possibleIngredients.reduce((acc, ingred) => {
      acc[ingred] = false;
      return acc;
    }, {}));
  }

  const clearMsg = () => {
    setNoneSelectedMsg('');
  }

  const handleNameChange = e => {
    setFormInputs({...formInputs, name: e.target.value});
  }

  const handleIngredientChange = e => {
    e.preventDefault();
    setFormInputs({...formInputs, ingredients: [...formInputs.ingredients, e.target.name]});
    setDisabled({...disabled, [e.target.name]: true});
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
        required
      />

      { ingredientButtons }

      <p>Order: { formInputs.ingredients.join(', ') || 'Nothing selected' }</p>

      <p className='none-selected-msg'>{noneSelectedMsg}</p>

      <button onClick={e => handleSubmit(e)}>
        Submit Order
      </button>
    </form>
  )
}

export default OrderForm;
